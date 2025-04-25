"use client";

import * as React from 'react';
import { Input } from './input';
import { cn } from '@/lib/utils';

type InputOTPSlotProps = React.ComponentProps<typeof Input> & {
  isFocused: boolean;
}

const InputOTPSlot = React.forwardRef<HTMLInputElement, InputOTPSlotProps>(
  ({ className, isFocused, ...props }, ref) => {
    return (
      <Input
        className={cn(
          'w-12 h-16 md:w-14 md:h-20 rounded-xl border-2 border-primary text-2xl md:text-3xl font-semibold text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
          isFocused && 'ring-2 ring-primary',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
InputOTPSlot.displayName = 'InputOTPSlot';

type InputOTPGroupProps = React.ComponentPropsWithoutRef<typeof React.Fragment> & {
  className?: string;
};

const InputOTPGroup: React.FC<InputOTPGroupProps> = ({ className, children }) => {
  return (
    <div className={cn('flex', className)}>
      {children}
    </div>
  );
};
InputOTPGroup.displayName = 'InputOTPGroup';

interface InputOTPProps {
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  render: (props: { slots: InputOTPSlotProps[] }) => React.ReactNode;
}

const InputOTP: React.FC<InputOTPProps> = ({ value, onChange, maxLength, render }) => {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if ((/^[0-9]*$/).test(val) && val.length <= 1) {
      const newValue = value.substring(0, index) + val + value.substring(index + 1);
      onChange(newValue);

      if (val.length === 1 && index < maxLength - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      e.preventDefault();
    }
  };

  const handleKeyDown = (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && value[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const slots: InputOTPSlotProps[] = React.useMemo(() => {
    return Array(maxLength)
      .fill(null)
      .map((_, index) => ({
        value: value[index] || '',
        onChange: handleChange(index),
        onKeyDown: handleKeyDown(index),
        maxLength: 1,
        ref: (el: HTMLInputElement | null) => (inputRefs.current[index] = el),
        isFocused: false,
      }));
  }, [value, maxLength]);

  return render({ slots });
};

export { InputOTP, InputOTPGroup, InputOTPSlot };

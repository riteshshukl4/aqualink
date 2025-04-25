"use client";

import * as React from "react"
import { cn } from "@/lib/utils"

export interface WaterDropIconProps extends React.SVGProps<SVGSVGElement> {}

const WaterDropIcon: React.FC<WaterDropIconProps> = ({
  className,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="M12 2.69l.56 5.59A10 10 0 1 0 5.42 12.89l5.58-.57z" />
    </svg>
  );
};

export { WaterDropIcon };

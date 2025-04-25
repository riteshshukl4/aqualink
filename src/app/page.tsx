'use client';

import Link from 'next/link';
import {useEffect, useRef} from 'react';
import {motion, useAnimation} from 'framer-motion';
import {useInView} from 'react-intersection-observer';
import {Button} from '@/components/ui/button';

const variants = {
  visible: {opacity: 1, y: 0, transition: {duration: 0.7}},
  hidden: {opacity: 0, y: 50},
};

const Feature = ({title, description, index}: {title: string; description: string; index: number}) => {
  const ref = useRef(null);
  const {inView} = useInView({
    threshold: 0.5,
  });
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start('visible');
    } else {
      animation.start('hidden');
    }
  }, [animation, inView]);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={animation}
      className="p-6 mt-6 text-left border w-full rounded-xl hover:shadow-lg transition-shadow duration-300"
    >
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-xl">{description}</p>
    </motion.div>
  );
};

const Header = () => (
  <header className="bg-background py-6 shadow-md">
    <div className="container mx-auto px-4 flex items-center justify-between">
      <Link href="/" className="text-3xl font-bold text-primary">
        AquaLink
      </Link>
      <nav>
        <Link href="/login" className="text-lg hover:text-primary transition-colors duration-200">
          <Button variant="secondary">Login</Button>
        </Link>
      </nav>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-background py-4 border-t">
    <div className="container mx-auto px-4 text-center">
      <p className="text-sm">
        Powered by AquaLink - A Smart Water Tanker Platform
      </p>
    </div>
  </footer>
);

const HeroSection = () => {
  const ref = useRef(null);
  const {inView} = useInView({
    threshold: 0.3,
  });
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start('visible');
    } else {
      animation.start('hidden');
    }
  }, [animation, inView]);
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <motion.h1
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={animation}
          className="text-6xl font-bold text-primary mb-4"
        >
          Welcome to AquaLink
        </motion.h1>
        <motion.p
          variants={variants}
          initial="hidden"
          animate={animation}
          className="mt-3 text-2xl text-foreground opacity-80"
        >
          A smart water tanker request, delivery, and monitoring platform.
        </motion.p>
        <motion.div
          variants={variants}
          initial="hidden"
          animate={animation}
          className="mt-8 flex items-center justify-center"
        >
          <Link href="/login">
            <Button size="lg">Get Started</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const {inView} = useInView({
    threshold: 0.3,
  });
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start('visible');
    } else {
      animation.start('hidden');
    }
  }, [animation, inView]);
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.h2
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={animation}
          className="text-4xl font-bold text-foreground mb-8 text-center"
        >
          About AquaLink
        </motion.h2>
        <motion.p
          variants={variants}
          initial="hidden"
          animate={animation}
          className="text-lg text-foreground opacity-80 mb-6"
        >
          AquaLink is designed to streamline the process of requesting, delivering, and
          monitoring water tankers. This platform caters to Residents, Tanker Drivers, and
          Admins, providing role-specific interfaces and functionalities.
        </motion.p>
        <motion.ul
          variants={variants}
          initial="hidden"
          animate={animation}
          className="list-disc list-inside text-lg text-foreground opacity-80"
        >
          <li>
            **User Roles**: Residents, Tanker Drivers, and Admins with distinct access levels.
          </li>
          <li>
            **Request Submission**: Residents can submit water tanker requests with details like
            address, water amount, and urgency.
          </li>
          <li>
            **Driver Task List**: Tanker drivers can view and manage their assigned delivery tasks.
          </li>
          <li>
            **Admin Dashboard**: Admins can monitor all platform activities, track deliveries, and
            manage users.
          </li>
        </motion.ul>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-foreground mb-8 text-center">Key Features</h2>
        <div className="flex flex-wrap items-center justify-around sm:w-full">
          <Feature
            title="Easy Request Submission"
            description="Residents can quickly submit water tanker requests with all necessary details."
            index={0}
          />
          <Feature
            title="Task Management for Drivers"
            description="Tanker drivers can efficiently manage their assigned delivery tasks."
            index={1}
          />
          <Feature
            title="Admin Monitoring Dashboard"
            description="Admins have access to a comprehensive dashboard to monitor platform activities."
            index={2}
          />
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}

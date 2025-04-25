'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { WaterDropIcon } from '@/components/ui/water-drop-icon';
import { 
  Check, 
  ChevronRight, 
  ClipboardList, 
  Droplet, 
  ExternalLink, 
  Info, 
  LineChart, 
  Mail, 
  MapPin, 
  Phone
} from 'lucide-react';
import Link from 'next/link';

// Animation variants for scrolling elements
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

// Animation variants for staggered children
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Component for animated sections
const AnimatedSection = ({ 
  children, 
  className, 
  delay = 0,
  threshold = 0.3
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
  threshold?: number;
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInUp}
      className={className}
      custom={delay}
    >
      {children}
    </motion.div>
  );
};

// Feature card component
const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description,
  delay = 0
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  delay?: number;
}) => {
  return (
    <motion.div
      variants={fadeInUp}
      custom={delay}
      className="group h-full"
    >
      <Card className="h-full border transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-5">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className="text-muted-foreground">
            {description}
          </p>
          <div className="mt-4 pt-4 border-t border-border">
            <Link href="#" className="text-primary font-medium inline-flex items-center hover:underline">
              Learn more
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Header component
const Header = () => {
  // Animation for the header
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      }
    }
  };
  
  return (
    <motion.header 
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm py-4 border-b border-border shadow-sm"
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
          <WaterDropIcon className="h-8 w-8 text-primary" />
          <span className="bg-clip-text bg-gradient-to-r from-primary to-blue-600 text-transparent">AquaLink</span>
        </Link>
        <nav className="flex items-center gap-5">
          <motion.a 
            href="#features" 
            className="hidden sm:inline-block text-muted-foreground hover:text-foreground transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Features
          </motion.a>
          <motion.a 
            href="#about" 
            className="hidden sm:inline-block text-muted-foreground hover:text-foreground transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            About
          </motion.a>
          <Link href="/login">
            <Button variant="outline" className="mr-2">Login</Button>
          </Link>
          <Link href="/login">
            <Button className="shadow-sm hover:shadow-primary/20 transition-shadow">Get Started</Button>
          </Link>
        </nav>
      </div>
    </motion.header>
  );
};

// Footer component
const Footer = () => (
  <footer className="bg-black text-white pt-12 pb-6">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <WaterDropIcon className="h-6 w-6" />
            AquaLink
          </h3>
          <p className="text-white/70 mb-4">
            A smart water tanker request, delivery, and monitoring platform.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="text-white/70 hover:text-white transition-colors duration-300 inline-flex items-center hover:translate-x-1 transform transition-transform"><ChevronRight className="h-4 w-4 mr-1" />About Us</Link></li>
            <li><Link href="#" className="text-white/70 hover:text-white transition-colors duration-300 inline-flex items-center hover:translate-x-1 transform transition-transform"><ChevronRight className="h-4 w-4 mr-1" />Careers</Link></li>
            <li><Link href="#" className="text-white/70 hover:text-white transition-colors duration-300 inline-flex items-center hover:translate-x-1 transform transition-transform"><ChevronRight className="h-4 w-4 mr-1" />Privacy Policy</Link></li>
            <li><Link href="#" className="text-white/70 hover:text-white transition-colors duration-300 inline-flex items-center hover:translate-x-1 transform transition-transform"><ChevronRight className="h-4 w-4 mr-1" />Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Resources</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="text-white/70 hover:text-white transition-colors duration-300 inline-flex items-center hover:translate-x-1 transform transition-transform"><ChevronRight className="h-4 w-4 mr-1" />Blog</Link></li>
            <li><Link href="#" className="text-white/70 hover:text-white transition-colors duration-300 inline-flex items-center hover:translate-x-1 transform transition-transform"><ChevronRight className="h-4 w-4 mr-1" />Help Center</Link></li>
            <li><Link href="#" className="text-white/70 hover:text-white transition-colors duration-300 inline-flex items-center hover:translate-x-1 transform transition-transform"><ChevronRight className="h-4 w-4 mr-1" />Contact</Link></li>
            <li><Link href="#" className="text-white/70 hover:text-white transition-colors duration-300 inline-flex items-center hover:translate-x-1 transform transition-transform"><ChevronRight className="h-4 w-4 mr-1" />FAQs</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <MapPin className="h-5 w-5 mr-2 mt-0.5 text-white/70" />
              <span className="text-white/70">
                123 Water Street<br />
                Cityville, ST 12345
              </span>
            </li>
            <li className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-white/70" />
              <a href="mailto:info@aqualink.com" className="text-white/70 hover:text-white transition-colors duration-300">info@aqualink.com</a>
            </li>
            <li className="flex items-center">
              <Phone className="h-5 w-5 mr-2 text-white/70" />
              <a href="tel:+1234567890" className="text-white/70 hover:text-white transition-colors duration-300">+1 (234) 567-890</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 pt-6 text-center">
        <p className="text-sm text-white/60">
          &copy; {new Date().getFullYear()} AquaLink. All rights reserved. Powered by AquaLink - A Smart Water Tanker Platform
        </p>
      </div>
    </div>
  </footer>
);

// Main Home Page Component
export default function Home() {
  // Setup smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId as string);
        if (targetElement) {
          window.scrollTo({
            top: (targetElement as HTMLElement).offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-20 pb-24 sm:py-24 water-ripple-bg hero-gradient">
          <div className="container mx-auto px-4 text-center relative">
            {/* Animated water droplet background elements */}
            <motion.div 
              className="absolute top-20 left-10 hidden md:block opacity-30"
              animate={{ 
                y: [0, 15, 0], 
                opacity: [0.2, 0.4, 0.2] 
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <WaterDropIcon className="h-16 w-16 text-primary" />
            </motion.div>
            
            <motion.div 
              className="absolute bottom-20 right-10 hidden md:block opacity-30"
              animate={{ 
                y: [0, -15, 0], 
                opacity: [0.3, 0.5, 0.3] 
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                repeatType: "loop",
                delay: 1
              }}
            >
              <WaterDropIcon className="h-12 w-12 text-primary" />
            </motion.div>
            
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                  Welcome to <span className="text-primary bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 text-transparent">AquaLink</span>
                </h1>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <p className="text-xl md:text-2xl text-muted-foreground mt-3 mb-8">
                  A smart water tanker request, delivery, and monitoring platform.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-4"
              >
                <Link href="/login">
                  <Button size="lg" className="group btn-water-ripple shadow-lg hover:shadow-primary/20">
                    Get Started
                    <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <Link href="#about">
                  <Button size="lg" variant="outline" className="hover:bg-white/50 hover:border-primary transition-all">
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
              className="mt-16 relative"
            >
              <div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >

                </motion.div>
              </div>
              
              {/* Floating feature badges */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-3  w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)" }}
                  className="glass-effect rounded-full shadow-lg p-3 flex items-center gap-2 text-muted-foreground border border-black/50"
                >
                  <Info className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-white">24/7 Support</span>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)" }}
                  className="glass-effect rounded-full shadow-lg p-3 flex items-center gap-2 text-muted-foreground border border-black/50"
                >
                  <Droplet className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-white">Fast Delivery</span>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)" }}
                  className="glass-effect rounded-full shadow-lg p-3 flex items-center gap-2 text-muted-foreground border border-black/50"
                >
                  <Check className="h-5 w-5  text-primary" />
                  <span className="text-sm font-medium text-white">Verified Quality</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 sm:py-24 water-ripple-bg bg-secondary">
          <div className="container mx-auto px-4 relative">
            {/* Decorative floating water drops */}
            <div className="absolute left-10 top-20 hidden lg:block">
              <WaterDropIcon className="h-10 w-10 text-primary/30 animate-float" />
            </div>
            <div className="absolute right-10 bottom-20 hidden lg:block">
              <WaterDropIcon className="h-14 w-14 text-primary/20 animate-float-delayed" />
            </div>
            
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  About <span className="text-primary">AquaLink</span>
                </h2>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <p className="text-lg text-muted-foreground">
                  Understanding the smart water tanker platform that's changing water delivery
                </p>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden hover-lift border border-white/50">
                <div className="md:flex">
                  <div className="md:shrink-0 h-95 w-100">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                    <img className="w-64 h-100 mt-5 ml-4 md:w-72 rounded-lg object-cover shadow-sm pb-5 md rounded-2xl"
                    src="https://images.pexels.com/photos/4666754/pexels-photo-4666754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" // Replace with the direct image URL
                    alt="Water tanker"
                    />
                    </motion.div>
                  </div>
                  <div className="p-6 md:p-8">
                    <p className="mt-2 text-base text-black">
                      AquaLink is designed to streamline the process of requesting, delivering, and
                      monitoring water tankers. This platform caters to Residents, Tanker Drivers, and
                      Admins, providing role-specific interfaces and functionalities.
                    </p>
                    
                    <motion.ul 
                      className="mt-6 space-y-4"
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.15
                          }
                        }
                      }}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <motion.li 
                        className="flex items-start"
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          show: { opacity: 1, x: 0 }
                        }}
                      >
                        <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                        <span className='text-black'>
                          <strong className="font-semibold">User Roles:</strong> Residents, Tanker Drivers, and Admins with distinct access levels.
                        </span>
                      </motion.li>
                      
                      <motion.li 
                        className="flex items-start"
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          show: { opacity: 1, x: 0 }
                        }}
                      >
                        <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                        <span className='text-black'>
                          <strong className="font-semibold">Request Submission:</strong> Residents can submit water tanker requests with details like address, water amount, and urgency.
                        </span>
                      </motion.li>
                      
                      <motion.li 
                        className="flex items-start"
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          show: { opacity: 1, x: 0 }
                        }}
                      >
                        <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                        <span className='text-black'>
                          <strong className="font-semibold">Driver Task List:</strong> Tanker drivers can view and manage their assigned delivery tasks.
                        </span>
                      </motion.li>
                      
                      <motion.li 
                        className="flex items-start"
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          show: { opacity: 1, x: 0 }
                        }}
                      >
                        <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                        <span className='text-black'>
                          <strong className="font-semibold text-black">Admin Dashboard:</strong> Admins can monitor all platform activities, track deliveries, and manage users.
                        </span>
                      </motion.li>
                    </motion.ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 sm:py-24 bg-black text-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 -mt-10 hidden lg:block">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary/10">
                <circle cx="60" cy="60" r="60" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute bottom-20 left-10 hidden lg:block">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary/5">
                <rect width="80" height="80" rx="20" fill="currentColor" />
              </svg>
            </div>
            
            <div className="text-center mb-12 sm:mb-16 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  <span className="relative inline-block">
                    Key Features
                    <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/30 rounded-full"></span>
                  </span>
                </h2>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <p className="text-lg text-white max-w-2xl mx-auto">
                  Discover the powerful features that make AquaLink the leading water tanker management platform
                </p>
              </motion.div>
            </div>

            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="group h-full"
              >
                <div className="h-full bg-white border border-border rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden">
                  <div className="p-6 flex flex-col h-full">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg w-12 h-12 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <ClipboardList className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-black">Easy Request Submission</h3>
                    <p className="text-muted-foreground flex-grow">
                      Residents can quickly submit water tanker requests with all necessary details. Our intuitive form makes it simple to specify your needs.
                    </p>
                    <div className="mt-4 pt-4 border-t border-border">
                      <Link href="#" className="text-primary font-medium inline-flex items-center hover:underline">
                        Learn more
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="group h-full"
              >
                <div className="h-full bg-white border border-border rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden">
                  <div className="p-6 flex flex-col h-full">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg w-12 h-12 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Droplet className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-black">Task Management for Drivers</h3>
                    <p className="text-muted-foreground flex-grow">
                      Tanker drivers can efficiently manage their assigned delivery tasks with our intuitive driver dashboard and mobile app.
                    </p>
                    <div className="mt-4 pt-4 border-t border-border">
                      <Link href="#" className="text-primary font-medium inline-flex items-center hover:underline">
                        Learn more
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="group h-full"
              >
                <div className="h-full bg-white border border-border rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden">
                  <div className="p-6 flex flex-col h-full">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg w-12 h-12 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <LineChart className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-black">Admin Monitoring Dashboard</h3>
                    <p className="text-muted-foreground flex-grow">
                      Admins have access to a comprehensive dashboard to monitor platform activities, track deliveries, and manage system users.
                    </p>
                    <div className="mt-4 pt-4 border-t border-border">
                      <Link href="#" className="text-primary font-medium inline-flex items-center hover:underline">
                        Learn more
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-16 text-center"
            >
              <Link href="/login">
                <Button size="lg" className="group btn-black shadow-lg hover:shadow-primary/20">
                  Get Started Today
                  <ExternalLink className="h-5 w-5 ml-2 group-hover:rotate-12 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-primary to-blue-600 text-white relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
            <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/10 animate-float"></div>
            <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-white/10 animate-float-delayed"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/5"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Ready to revolutionize water delivery?
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Join thousands of satisfied users who are already benefiting from AquaLink's smart water tanker platform.
              </p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2
                    }
                  }
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 }
                  }}
                >
                  <Link href="/login">
                    <Button size="lg" variant="secondary" className="text-white bg-black hover:text-black hover:bg-white/20 border border-white/30 hover:border-white/50 w-full sm:w-auto">
                      Create Account
                    </Button>
                  </Link>
                </motion.div>
                
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    show: { opacity: 1, x: 0 }
                  }}
                >
                  <Link href="#features">
                    <Button size="lg" variant="outline" className="glassmorphism text-white border-white/30 hover:bg-white/20 hover:border-white/50 w-full sm:w-auto">
                      Learn More
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-black text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <WaterDropIcon className="h-6 w-6" />
                AquaLink
              </h3>
              <p className="text-white/70 mb-4">
                A smart water tanker request, delivery, and monitoring platform.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-white/70 hover:text-white transition-colors duration-300 inline-flex items-center hover:translate-x-1 transform transition-transform"><ChevronRight className="h-4 w-4 mr-1" />About Us</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-white transition-colors duration-300 inline-flex items-center hover:translate-x-1 transform transition-transform"><ChevronRight className="h-4 w-4 mr-1" />Careers</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-white transition-colors duration-300 inline-flex items-center hover:translate-x-1 transform transition-transform"><ChevronRight className="h-4 w-4 mr-1" />Privacy Policy</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-white transition-colors duration-300 inline-flex items-center hover:translate-x-1 transform transition-transform"><ChevronRight className="h-4 w-4 mr-1" />Terms of Service</Link></li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-white/70 hover:text-white transition-colors duration-300 inline-flex items-center hover:translate-x-1 transform transition-transform"><ChevronRight className="h-4 w-4 mr-1" />Blog</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-white transition-colors duration-300 inline-flex items-center hover:translate-x-1 transform transition-transform"><ChevronRight className="h-4 w-4 mr-1" />Help Center</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-white transition-colors duration-300 inline-flex items-center hover:translate-x-1 transform transition-transform"><ChevronRight className="h-4 w-4 mr-1" />Contact</Link></li>
                <li><Link href="#" className="text-white/70 hover:text-white transition-colors duration-300 inline-flex items-center hover:translate-x-1 transform transition-transform"><ChevronRight className="h-4 w-4 mr-1" />FAQs</Link></li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 mt-0.5 text-white/70" />
                  <span className="text-white/70">
                    123 Water Street<br />
                    Cityville, ST 12345
                  </span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-white/70" />
                  <a href="mailto:info@aqualink.com" className="text-white/70 hover:text-white transition-colors duration-300">info@aqualink.com</a>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-white/70" />
                  <a href="tel:+1234567890" className="text-white/70 hover:text-white transition-colors duration-300">+1 (234) 567-890</a>
                </li>
              </ul>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="border-t border-white/10 pt-6 text-center"
          >
            <p className="text-sm text-white/60">
              &copy; {new Date().getFullYear()} AquaLink. All rights reserved. Powered by AquaLink - A Smart Water Tanker Platform
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

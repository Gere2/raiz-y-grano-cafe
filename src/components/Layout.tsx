
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

const Layout = ({ children, fullWidth = false, className = "" }: LayoutProps) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`flex flex-col min-h-screen overflow-hidden ${className}`}>
      <Navbar />
      <main className={`flex-grow ${fullWidth ? 'w-full' : 'container mx-auto px-4 md:px-6'}`}>
        {children}
      </main>
      <Footer />
      
      <motion.button 
        onClick={scrollToTop}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 bg-cafe-light-brown text-white p-3 rounded-full shadow-lg z-40"
        aria-label="Volver arriba"
      >
        <ArrowUp size={20} />
      </motion.button>
    </div>
  );
};

export default Layout;


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
    <div className={`flex flex-col min-h-screen overflow-hidden relative ${className}`}
         style={{
           backgroundImage: "url('/lovable-uploads/09bb9ce7-7c4b-4991-b6c3-b4db9a8df3ed.png')",
           backgroundSize: "cover",
           backgroundAttachment: "fixed",
           backgroundPosition: "center",
           backgroundBlendMode: "soft-light",
           backgroundColor: "#f8f5ed" // Color base claro para mezclar con la imagen
         }}>
      {/* Overlay para mejorar legibilidad */}
      <div className="absolute inset-0 bg-white opacity-85 z-0"></div>
      
      {/* Contenido del sitio en z-10 para estar por encima del fondo */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className={`flex-grow ${fullWidth ? 'w-full' : 'container mx-auto px-4 md:px-6'} pt-16 md:pt-20`}>
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
    </div>
  );
};

export default Layout;

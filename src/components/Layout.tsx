
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

const Layout = ({ children, fullWidth = false, className = "" }: LayoutProps) => {
  return (
    <div className={`flex flex-col min-h-screen overflow-hidden bg-cafe-cream bg-opacity-30 ${className}`}>
      <Navbar />
      <main className={`flex-grow ${fullWidth ? 'w-full' : 'container mx-auto px-4 md:px-6'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

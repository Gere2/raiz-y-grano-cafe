
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
}

const Layout = ({ children, fullWidth = false }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navbar />
      <main className={`flex-grow ${fullWidth ? 'w-full' : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

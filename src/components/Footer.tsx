
import { Coffee, MapPin, Phone, Clock, Mail, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-cafe-dark-brown text-cafe-cream pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <pattern id="coffee-pattern" patternUnits="userSpaceOnUse" width="50" height="50" patternTransform="rotate(45)">
            <Coffee size={20} color="#FFFFFF" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#coffee-pattern)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div 
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <img 
                src="/lovable-uploads/c22750e3-6255-4880-9df0-6576b35fe881.png" 
                alt="Raíz y Grano" 
                className="h-10 w-auto invert" 
              />
              <span className="font-serif text-xl font-bold">Raíz y Grano</span>
            </div>
            <p className="text-center md:text-left mb-5 text-cafe-beige max-w-xs">
              Un espacio donde el café de especialidad artesanal se encuentra con la conciencia sostenible y el sabor que despierta ideas.
            </p>
            <div className="flex space-x-4 mt-2">
              <a 
                href="https://instagram.com" 
                className="text-cafe-cream hover:text-cafe-beige transition-colors bg-white bg-opacity-10 p-2 rounded-full hover:bg-opacity-20" 
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://tiktok.com" 
                className="text-cafe-cream hover:text-cafe-beige transition-colors bg-white bg-opacity-10 p-2 rounded-full hover:bg-opacity-20" 
                aria-label="TikTok"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                  <path d="M15 8a4 4 0 0 0 0 8"></path>
                  <path d="M15 12h-2"></path>
                  <path d="M22 8v8"></path>
                  <path d="M17 12V8h5"></path>
                  <path d="M17 8a5 5 0 0 0-5-5"></path>
                  <path d="M12 3v9"></path>
                </svg>
              </a>
            </div>
          </motion.div>

          <motion.div 
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-serif text-lg mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:md:right-auto after:w-12 after:mx-auto after:md:mx-0 after:h-0.5 after:bg-cafe-light-brown">
              Horarios y Ubicación
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock size={18} className="shrink-0 mt-0.5 text-cafe-beige" />
                <div>
                  <p>Lunes a Viernes: 7:00 - 18:00</p>
                  <p>Sábados y Domingos: Cerrado</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 mt-0.5 text-cafe-beige" />
                <p>Universidad UFV<br />Madrid</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="shrink-0 mt-0.5 text-cafe-beige" />
                <p>+34 696 766 943</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="font-serif text-lg mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:md:right-auto after:w-12 after:mx-auto after:md:mx-0 after:h-0.5 after:bg-cafe-light-brown">
              Enlaces Rápidos
            </h3>
            <div className="grid grid-cols-2 gap-3 w-full">
              <Link to="/" className="hover:text-cafe-light-brown transition-colors">Inicio</Link>
              <Link to="/nosotros" className="hover:text-cafe-light-brown transition-colors">Nosotros</Link>
              <Link to="/carta" className="hover:text-cafe-light-brown transition-colors">Carta</Link>
              <Link to="/galeria" className="hover:text-cafe-light-brown transition-colors">Galería</Link>
              <Link to="/contacto" className="hover:text-cafe-light-brown transition-colors">Contacto</Link>
              <a href="mailto:info@raizygrano.com" className="hover:text-cafe-light-brown transition-colors flex items-center gap-2">
                <Mail size={14} />
                <span>Email</span>
              </a>
            </div>
            
            <div className="mt-6 pt-6 border-t border-cafe-light-brown border-opacity-20 w-full">
              <p className="text-sm text-cafe-beige opacity-80">
                Café sostenible, trazable y cultivado con respeto por la tierra y sus agricultores.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-cafe-light-brown border-opacity-20 mt-12 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-cafe-beige">
              © {currentYear} Raíz y Grano. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/privacidad" className="text-cafe-beige hover:text-white transition-colors">
                Política de Privacidad
              </Link>
              <Link to="/cookies" className="text-cafe-beige hover:text-white transition-colors">
                Cookies
              </Link>
              <Link to="/legal" className="text-cafe-beige hover:text-white transition-colors">
                Aviso Legal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

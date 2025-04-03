
import { Coffee, MapPin, Phone, Clock, Mail, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-cafe-dark-brown text-cafe-cream pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center md:items-start">
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
                className="text-cafe-cream hover:text-cafe-beige transition-colors bg-white bg-opacity-10 p-2 rounded-full" 
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://facebook.com" 
                className="text-cafe-cream hover:text-cafe-beige transition-colors bg-white bg-opacity-10 p-2 rounded-full" 
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-serif text-lg mb-5 relative after:content-[''] after:block after:w-12 after:h-0.5 after:bg-cafe-light-brown after:mt-2">
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
                <p>Entre el edificio H y el CRAI<br />Campus Ferrol</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-serif text-lg mb-5 relative after:content-[''] after:block after:w-12 after:h-0.5 after:bg-cafe-light-brown after:mt-2">
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
          </div>
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


import { Coffee, MapPin, Phone, Clock, Mail, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-cafe-dark-brown text-cafe-cream py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="w-6 h-6" />
              <span className="font-serif text-xl font-bold">Raíz y Grano</span>
            </div>
            <p className="text-center md:text-left mb-4 text-cafe-beige">
              Café de especialidad artesanal con sabor que enciende neuronas.
            </p>
            <div className="flex space-x-4 mt-2">
              <a href="https://instagram.com" className="text-cafe-cream hover:text-cafe-beige transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" className="text-cafe-cream hover:text-cafe-beige transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-serif text-lg mb-4 relative after:content-[''] after:block after:w-12 after:h-0.5 after:bg-cafe-light-brown after:mt-1">
              Horarios
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock size={18} className="shrink-0 mt-0.5" />
                <div>
                  <p>Lunes a Viernes: 8:00 - 20:00</p>
                  <p>Sábados: 9:00 - 21:00</p>
                  <p>Domingos: 9:00 - 14:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-serif text-lg mb-4 relative after:content-[''] after:block after:w-12 after:h-0.5 after:bg-cafe-light-brown after:mt-1">
              Contacto
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 mt-0.5" />
                <p>Entre el edificio H y el CRAI</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="shrink-0 mt-0.5" />
                <p>+34 123 456 789</p>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="shrink-0 mt-0.5" />
                <p>info@raizygrano.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-cafe-light-brown border-opacity-30 mt-10 pt-6 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-cafe-beige">
              © {new Date().getFullYear()} Raíz y Grano. Todos los derechos reservados.
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

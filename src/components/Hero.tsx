
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Coffee, Clock, MapPin } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cafe-cream">
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: "url('/lovable-uploads/09bb9ce7-7c4b-4991-b6c3-b4db9a8df3ed.png')",
          backgroundSize: "cover", 
          backgroundPosition: "center",
          opacity: 0.7
        }}
      ></div>
      
      <div className="absolute inset-0 z-0 bg-cafe-dark-brown opacity-25"></div>
      
      <div className="container mx-auto px-4 z-10 py-20 md:py-32">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="/lovable-uploads/c22750e3-6255-4880-9df0-6576b35fe881.png" 
              alt="Raíz y Grano Logo" 
              className="w-full max-w-xs mx-auto mb-8 filter drop-shadow-lg"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg"
          >
            RAÍZ Y GRANO
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white mb-8 italic font-serif drop-shadow-md"
          >
            Sabor que enciende neuronas
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-12"
          >
            <Link to="/carta" className="cafe-button-primary bg-cafe-light-brown hover:bg-cafe-dark-brown text-white px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105 drop-shadow-lg">
              Ver carta
            </Link>
            <Link to="/contacto" className="cafe-button-secondary border-2 border-white text-white hover:bg-white hover:text-cafe-dark-brown px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105 drop-shadow-lg">
              Cómo llegar
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-white backdrop-blur-sm bg-cafe-dark-brown bg-opacity-30 p-6 rounded-xl"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-cafe-beige mb-4">
                <MapPin className="text-cafe-dark-brown" size={24} />
              </div>
              <h3 className="font-serif font-medium text-lg mb-2">Ubicación con propósito</h3>
              <p className="text-sm opacity-90">Universidad UFV<br />Madrid</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-cafe-beige mb-4">
                <Coffee className="text-cafe-dark-brown" size={24} />
              </div>
              <h3 className="font-serif font-medium text-lg mb-2">Café de especialidad</h3>
              <p className="text-sm opacity-90">Granos seleccionados y tostados<br />artesanalmente</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-cafe-beige mb-4">
                <Clock className="text-cafe-dark-brown" size={24} />
              </div>
              <h3 className="font-serif font-medium text-lg mb-2">Horario</h3>
              <p className="text-sm opacity-90">Lunes a Viernes<br />7:00 - 18:00</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <p className="text-xl italic font-serif text-white drop-shadow-md">
              Mucho más que café: una pausa consciente entre clase y clase.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;

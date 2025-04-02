
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-16 bg-cafe-dark-brown text-cafe-cream relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0 opacity-5" 
        style={{
          backgroundImage: "url('/lovable-uploads/147f83b5-bcab-4380-afbe-a256626eda4f.png')",
          backgroundSize: "cover", 
          backgroundPosition: "center"
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-serif mb-6"
          >
            Descubre nuestro menú, ven a visitarnos
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl font-serif italic mb-8"
          >
            Entre el edificio H y el CRAI
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-cafe-cream rounded-full inline-block text-cafe-dark-brown px-8 py-4 text-lg font-medium transition-transform hover:scale-105"
          >
            <Link to="/contacto" className="flex items-center justify-center gap-2">
              <span>Cómo llegar</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"></path>
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

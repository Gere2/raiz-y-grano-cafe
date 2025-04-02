
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, Coffee, Leaf, MapPin } from "lucide-react";

const Index = () => {
  useEffect(() => {
    document.title = "Raíz y Grano - Café de Especialidad";
  }, []);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const y = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <Layout>
      {/* Sección Hero Inmersiva */}
      <section className="relative min-h-screen w-full overflow-hidden">
        {/* Fondo animado */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cafe-cream bg-opacity-80 backdrop-blur-sm z-10"></div>
          <motion.div
            className="absolute -inset-10 z-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: [0.7, 0.5, 0.7], 
              scale: [1, 1.05, 1],
              rotate: [0, 1, 0]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
            style={{
              backgroundImage: `url('/lovable-uploads/ffa79ff1-d030-4159-bd0b-8e303ab0f366.png')`,
              backgroundSize: "40%",
              backgroundPosition: "center",
              filter: "blur(40px) saturate(150%)"
            }}
          />
        </div>

        {/* Contenido Hero */}
        <div className="container mx-auto relative z-20 h-screen flex flex-col items-center justify-center px-4">
          <motion.div 
            style={{ opacity, scale, y }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Logo animado */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mb-6 relative"
            >
              <motion.img 
                src="/lovable-uploads/ffa79ff1-d030-4159-bd0b-8e303ab0f366.png" 
                alt="Raíz y Grano" 
                className="h-32 md:h-40 mx-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ 
                  boxShadow: ["0 0 0 rgba(166, 124, 82, 0)", "0 0 20px rgba(166, 124, 82, 0.5)", "0 0 0 rgba(166, 124, 82, 0)"] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>

            {/* Título animado */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-5xl md:text-7xl font-serif font-bold text-cafe-dark-brown mb-4 tracking-wider"
            >
              RAÍZ Y GRANO
            </motion.h1>

            {/* Slogan animado */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-xl md:text-2xl text-cafe-dark-brown mb-8 italic font-serif"
            >
              La esencia del café en cada sentido
            </motion.p>

            {/* Botones flotantes */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-16"
            >
              <Link to="/carta" className="relative overflow-hidden group">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-cafe-light-brown to-cafe-dark-brown rounded-full opacity-90"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                />
                <motion.span 
                  className="relative z-10 flex items-center justify-center gap-2 py-3 px-8 text-cafe-cream font-medium"
                  whileHover={{ scale: 1.03 }}
                >
                  <Coffee size={18} />
                  <span>Descubrir nuestra carta</span>
                </motion.span>
              </Link>
              <Link to="/contacto" className="relative overflow-hidden group">
                <motion.div 
                  className="absolute inset-0 bg-cafe-cream border-2 border-cafe-dark-brown rounded-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                />
                <motion.span 
                  className="relative z-10 flex items-center justify-center gap-2 py-3 px-8 text-cafe-dark-brown font-medium"
                  whileHover={{ scale: 1.03 }}
                >
                  <MapPin size={18} />
                  <span>Cómo llegar</span>
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicador */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-cafe-dark-brown opacity-80"
            >
              <span className="text-sm font-medium mb-2">Explora más</span>
              <ChevronDown size={24} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Segunda sección inmersiva */}
      <section className="min-h-screen relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cafe-cream to-cafe-beige opacity-90 z-0"></div>
        
        {/* Elementos decorativos */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 1 }}
          className="absolute left-0 top-1/4 w-64 h-64"
          style={{
            backgroundImage: `url('/lovable-uploads/ffa79ff1-d030-4159-bd0b-8e303ab0f366.png')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            transform: "rotate(-15deg)"
          }}
        />
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 1 }}
          className="absolute right-0 bottom-1/4 w-64 h-64"
          style={{
            backgroundImage: `url('/lovable-uploads/ffa79ff1-d030-4159-bd0b-8e303ab0f366.png')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            transform: "rotate(15deg)"
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16 bg-cafe-light-brown"></div>
              <span className="text-cafe-light-brown font-serif uppercase tracking-widest text-sm">Nuestro propósito</span>
              <div className="h-px w-16 bg-cafe-light-brown"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-cafe-dark-brown mb-8">Revolucionando la experiencia del café</h2>
            <p className="text-xl text-cafe-dark-brown opacity-80 leading-relaxed">
              En un mundo acelerado y digital, <span className="italic">Raíz y Grano</span> representa la pausa consciente, 
              el regreso a lo auténtico y el disfrute de lo artesanal. Más que café, ofrecemos una experiencia sensorial completa.
            </p>
          </motion.div>

          {/* Cards animadas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Leaf className="h-8 w-8 text-cafe-leaf-green" />,
                title: "De la planta a la taza",
                description: "Conocemos cada paso del proceso del café, desde su cultivo hasta su preparación final."
              },
              {
                icon: <Coffee className="h-8 w-8 text-cafe-light-brown" />,
                title: "Métodos especializados",
                description: "Cada método de extracción resalta diferentes notas y matices en nuestros cafés de origen."
              },
              {
                icon: <MapPin className="h-8 w-8 text-cafe-dark-brown" />,
                title: "Ubicación estratégica",
                description: "Entre el edificio H y el CRAI, el lugar perfecto para tu pausa entre clases."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
              >
                <div className="rounded-full bg-cafe-cream w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                  {item.icon}
                </div>
                <h3 className="text-xl font-serif font-semibold text-cafe-dark-brown mb-4 text-center">{item.title}</h3>
                <p className="text-cafe-dark-brown text-center">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <Link to="/nosotros" className="relative inline-block group">
              <span className="relative z-10 flex items-center justify-center gap-2 py-3 px-8 text-cafe-dark-brown font-medium">
                <span>Conoce nuestra historia</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >→</motion.span>
              </span>
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1 bg-cafe-light-brown rounded"
                whileHover={{ height: '100%', borderRadius: '0.5rem' }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

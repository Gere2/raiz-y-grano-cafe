
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, Coffee, Leaf, MapPin, Rocket, Users, ShoppingBag } from "lucide-react";

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

            {/* Slogan animado - ACTUALIZADO */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-xl md:text-2xl text-cafe-dark-brown mb-6 italic font-serif"
            >
              Sabor que enciende neuronas
            </motion.p>

            {/* Descripción - NUEVA */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-lg text-cafe-dark-brown mb-8 max-w-2xl mx-auto"
            >
              Una experiencia de café de especialidad y repostería gourmet dentro del campus universitario, 
              con impacto social, humano y sostenible.
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

      {/* Nuestra Esencia - NUEVA SECCIÓN */}
      <section className="py-20 bg-cafe-beige bg-opacity-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-cafe-dark-brown mb-8 relative inline-block">
              Nuestra Esencia
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-cafe-light-brown"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Rocket className="h-8 w-8 text-cafe-light-brown" />,
                title: "Visión",
                description: "Ser el referente de café de especialidad y repostería artesanal dentro del entorno universitario."
              },
              {
                icon: <Leaf className="h-8 w-8 text-cafe-leaf-green" />,
                title: "Misión",
                description: "Crear un espacio móvil donde disfrutar productos premium que promuevan la sostenibilidad y la conexión humana."
              },
              {
                icon: <Users className="h-8 w-8 text-cafe-dark-brown" />,
                title: "Valores",
                description: "Calidad, frescura, sostenibilidad, cercanía y educación."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl p-8 shadow-md border border-cafe-beige"
              >
                <div className="rounded-full bg-cafe-cream w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                  {item.icon}
                </div>
                <h3 className="text-xl font-serif font-semibold text-cafe-dark-brown mb-4 text-center">{item.title}</h3>
                <p className="text-cafe-dark-brown text-center">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-cafe-light-brown opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
        <motion.div
          className="absolute -right-32 top-20 w-80 h-80 rounded-full bg-cafe-leaf-green opacity-10"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 270, 180, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      </section>

      {/* Qué Ofrecemos - NUEVA SECCIÓN */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-cafe-dark-brown mb-8 relative inline-block">
              Qué Ofrecemos
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-cafe-light-brown"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-cafe-cream bg-opacity-40 rounded-2xl p-8 relative overflow-hidden"
            >
              <motion.div 
                className="absolute top-0 right-0 w-24 h-24 -mr-6 -mt-6 opacity-10"
                style={{
                  backgroundImage: `url('/lovable-uploads/ffa79ff1-d030-4159-bd0b-8e303ab0f366.png')`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat"
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
              
              <h3 className="text-2xl font-serif font-semibold text-cafe-dark-brown mb-6 flex items-center">
                <Coffee className="mr-3 text-cafe-light-brown" size={24} />
                Café de especialidad
              </h3>
              
              <ul className="space-y-4">
                {[
                  "Granos premium de origen único",
                  "Métodos artesanales (espresso, V60, Aeropress, Chemex)",
                  "Bebidas frías y sabores estacionales",
                  "Leches vegetales y siropes artesanales"
                ].map((item, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <span className="text-cafe-light-brown mr-2">•</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-cafe-light-leaf bg-opacity-30 rounded-2xl p-8 relative overflow-hidden"
            >
              <motion.div 
                className="absolute top-0 right-0 w-24 h-24 -mr-6 -mt-6 opacity-10"
                style={{
                  backgroundImage: `url('/lovable-uploads/ffa79ff1-d030-4159-bd0b-8e303ab0f366.png')`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat"
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
              
              <h3 className="text-2xl font-serif font-semibold text-cafe-dark-brown mb-6 flex items-center">
                <ShoppingBag className="mr-3 text-cafe-leaf-green" size={24} />
                Repostería artesanal
              </h3>
              
              <ul className="space-y-4">
                {[
                  "Elaborada por pasteleros locales (Galia Pastelería)",
                  "Opciones veganas, sin gluten, bajas en azúcar",
                  "Recetas que cambian con las estaciones",
                  "Servicios personalizados"
                ].map((item, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <span className="text-cafe-leaf-green mr-2">•</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link to="/carta" className="inline-block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="bg-cafe-dark-brown text-cafe-cream py-3 px-8 rounded-full flex items-center gap-2"
              >
                Ver carta completa
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >→</motion.span>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Nuestro Modelo - NUEVA SECCIÓN */}
      <section className="py-20 bg-gradient-to-b from-cafe-cream to-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-cafe-dark-brown mb-2">
              Nuestro Modelo
            </h2>
            <p className="text-cafe-dark-brown text-lg">
              Food truck con impacto universitario
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-xl mb-6 transform md:rotate-2">
                <div className="bg-cafe-light-brown bg-opacity-60 absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center px-6">
                    <p className="text-2xl font-serif font-medium mb-2">Próximamente</p>
                    <p className="text-sm">Imagen de nuestro food truck</p>
                  </div>
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg max-w-sm mx-auto md:mx-0 md:-mt-16 md:ml-10 relative z-10"
              >
                <h3 className="text-xl font-medium text-cafe-dark-brown mb-3">Ubicación estratégica</h3>
                <p className="text-cafe-dark-brown">
                  Operamos desde un food truck en la UFV (Pozuelo, Madrid), con movilidad dentro 
                  del campus según la demanda.
                </p>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <h3 className="text-2xl font-serif font-semibold text-cafe-dark-brown mb-6">
                Un equipo extraordinario
              </h3>
              
              <ul className="space-y-4">
                {[
                  "Potente equipo: baristas expertos, chef pastelero, marketing y tecnología",
                  "Colaboraciones con proveedores responsables como Amor Perfecto (café) y Oatly (leches vegetales)",
                  "Compromiso con la sostenibilidad y el impacto social",
                  "Tecnología integrada para mejorar la experiencia del cliente"
                ].map((item, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start bg-cafe-cream bg-opacity-30 p-3 rounded-lg"
                  >
                    <span className="text-cafe-dark-brown mr-2 font-bold">•</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <Link to="/nosotros" className="inline-block">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="border-2 border-cafe-dark-brown text-cafe-dark-brown py-2 px-6 rounded-full flex items-center gap-2"
                  >
                    Conocer todo nuestro equipo
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >→</motion.span>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>
    </Layout>
  );
};

export default Index;


import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Coffee, Leaf, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import FeaturedMenu from "@/components/FeaturedMenu";
import HomeCarousel from "@/components/HomeCarousel";

const Index = () => {
  useEffect(() => {
    document.title = "Raíz y Grano | Café de especialidad artesanal";
  }, []);

  return (
    <Layout fullWidth={true} className="bg-cafe-cream">
      <Hero />

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Nuestra Filosofía</h2>
            <p className="text-cafe-dark-brown mt-6">
              En Raíz y Grano creemos que cada taza de café cuenta una historia. Desde el agricultor que cultiva 
              el grano con dedicación hasta el barista que prepara tu bebida con precisión y creatividad, 
              cada paso del proceso está impregnado de pasión y respeto por el producto.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <motion.div 
              className="bg-cafe-cream bg-opacity-30 p-6 rounded-xl text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-cafe-light-brown rounded-full flex items-center justify-center mx-auto mb-5">
                <Coffee size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-serif text-cafe-dark-brown mb-4">Selección Artesanal</h3>
              <p className="text-cafe-dark-brown opacity-80">
                Seleccionamos cuidadosamente granos de las mejores regiones cafeteras, priorizando relaciones 
                directas con agricultores que comparten nuestra pasión por la calidad.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-cafe-cream bg-opacity-30 p-6 rounded-xl text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-16 h-16 bg-cafe-light-brown rounded-full flex items-center justify-center mx-auto mb-5">
                <Leaf size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-serif text-cafe-dark-brown mb-4">Sostenibilidad</h3>
              <p className="text-cafe-dark-brown opacity-80">
                Nos comprometemos a minimizar nuestro impacto ambiental, utilizando empaques biodegradables 
                y apoyando prácticas agrícolas respetuosas con el medio ambiente.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-cafe-cream bg-opacity-30 p-6 rounded-xl text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="w-16 h-16 bg-cafe-light-brown rounded-full flex items-center justify-center mx-auto mb-5">
                <Shield size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-serif text-cafe-dark-brown mb-4">Calidad garantizada</h3>
              <p className="text-cafe-dark-brown opacity-80">
                Nuestro equipo de baristas profesionales está en constante formación para garantizar 
                que cada preparación resalte los mejores atributos de nuestros cafés de especialidad.
              </p>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <Link to="/nosotros" className="cafe-button-secondary inline-flex items-center">
              Conoce más sobre nosotros
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-cafe-beige bg-opacity-30 relative overflow-hidden"
      >
        <div 
          className="absolute inset-0 z-0 opacity-5" 
          style={{
            backgroundImage: "url('/lovable-uploads/147f83b5-bcab-4380-afbe-a256626eda4f.png')",
            backgroundSize: "400px", 
            backgroundRepeat: "repeat"
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-serif mb-6 text-cafe-dark-brown relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-0.5 after:bg-cafe-light-brown">
                  Un café que cuenta una historia
                </h2>
                <p className="text-cafe-dark-brown mb-6">
                  En nuestra cafetería, cada taza es un viaje sensorial que comienza en las montañas donde se cultiva el grano
                  y culmina en tu paladar. Trabajamos directamente con agricultores comprometidos con el cultivo sostenible
                  y los métodos tradicionales de cosecha.
                </p>
                <p className="text-cafe-dark-brown mb-6">
                  Nuestros baristas son artesanos apasionados que dominan diversos métodos de preparación, 
                  desde el clásico espresso italiano hasta las técnicas más innovadoras como Aeropress o Cold Brew, 
                  extrayendo lo mejor de cada grano.
                </p>
                <div className="mt-8">
                  <Link to="/carta" className="cafe-button-primary">
                    Descubre nuestros cafés
                  </Link>
                </div>
              </motion.div>
            </div>
            
            <div className="order-1 lg:order-2 h-[400px] md:h-[500px]">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full h-full rounded-xl overflow-hidden shadow-xl"
              >
                <HomeCarousel />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      <FeaturedMenu />

      <section className="py-20 bg-cafe-dark-brown text-cafe-cream">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-8 relative pb-4 inline-block after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-0.5 after:bg-cafe-light-brown">
              Mucho más que café
            </h2>
            <p className="text-xl md:text-2xl italic font-serif mb-10">
              "Un espacio donde la calidad, lo artesanal y la pasión por el café se unen para crear una experiencia única"
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contacto" className="cafe-button-primary bg-cafe-light-brown hover:bg-opacity-90">
                Ven a visitarnos
              </Link>
              <Link to="/nosotros" className="cafe-button-secondary border-cafe-cream text-cafe-cream hover:bg-cafe-cream hover:text-cafe-dark-brown">
                Conoce nuestra historia
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

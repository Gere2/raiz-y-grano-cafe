
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Coffee, Leaf, Users, Award, Truck, Heart } from 'lucide-react';

const About = () => {
  useEffect(() => {
    document.title = "Nosotros | Raíz y Grano";
  }, []);

  const staggerAnimate = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
      }
    })
  };

  return (
    <Layout>
      <div className="pt-20 md:pt-24">
        <motion.section 
          className="py-12 md:py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl font-serif text-cafe-dark-brown mb-6">Nuestra Historia</h1>
                <div className="w-24 h-1 bg-cafe-light-brown mx-auto mb-8"></div>
                <p className="text-lg text-cafe-dark-brown">
                  Descubre la pasión y los valores que impulsan cada taza de café en Raíz y Grano.
                </p>
              </motion.div>

              <div className="prose prose-lg max-w-none text-cafe-dark-brown prose-headings:font-serif prose-headings:text-cafe-dark-brown">
                <motion.div
                  className="bg-white rounded-xl p-8 shadow-md mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-full md:w-1/3 flex-shrink-0">
                      <img 
                        src="/lovable-uploads/f53365f0-b667-4808-a863-b2fb6e913df5.png" 
                        alt="Preparando café" 
                        className="w-full rounded-lg shadow-lg"
                      />
                    </div>
                    <div className="w-full md:w-2/3">
                      <h2 className="text-2xl font-serif text-cafe-dark-brown mb-4">Los orígenes</h2>
                      <p>
                        Raíz y Grano nació en 2023 de un sueño compartido: crear un espacio donde los estudiantes y profesores 
                        del campus pudieran disfrutar de un café excepcional que respetara tanto a los productores como al 
                        medio ambiente.
                      </p>
                      <p>
                        Lo que comenzó como un pequeño food truck de café, rápidamente se convirtió en un proyecto 
                        que va más allá de servir bebidas. Nuestra misión es cultivar una cultura de apreciación 
                        por el café de especialidad, educando sobre su origen y apoyando prácticas sostenibles.
                      </p>
                      <p>
                        Hoy, Raíz y Grano es un punto de encuentro para la comunidad universitaria, donde las 
                        conversaciones fluyen tan libremente como nuestro café recién preparado.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mb-16"
                >
                  <h2 className="text-3xl font-serif text-center text-cafe-dark-brown mb-10">Nuestros Valores</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { 
                        icon: <Coffee className="text-cafe-light-brown" size={28} />, 
                        title: "Calidad sin compromiso", 
                        description: "Seleccionamos solo los mejores granos de café, monitoreamos cuidadosamente el proceso de tostado y entrenamos continuamente a nuestros baristas." 
                      },
                      { 
                        icon: <Leaf className="text-cafe-light-brown" size={28} />, 
                        title: "Sostenibilidad", 
                        description: "Utilizamos empaques biodegradables, promovemos prácticas agrícolas sostenibles y minimizamos los desperdicios en cada parte de nuestro negocio." 
                      },
                      { 
                        icon: <Users className="text-cafe-light-brown" size={28} />, 
                        title: "Comunidad", 
                        description: "Creamos un espacio acogedor donde todos son bienvenidos, apoyamos iniciativas locales y fomentamos conexiones genuinas." 
                      }
                    ].map((value, i) => (
                      <motion.div 
                        key={value.title} 
                        custom={i}
                        variants={staggerAnimate}
                        initial="hidden"
                        animate="visible"
                        className="bg-cafe-cream bg-opacity-40 p-6 rounded-lg"
                      >
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                          {value.icon}
                        </div>
                        <h3 className="text-xl font-serif mb-3">{value.title}</h3>
                        <p className="text-cafe-dark-brown opacity-80">{value.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-cafe-beige bg-opacity-30 p-8 rounded-xl mb-16 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-cafe-beige opacity-20"></div>
                  <div className="absolute bottom-0 right-0 w-full h-24 bg-gradient-to-t from-cafe-beige opacity-20"></div>
                  
                  <h2 className="text-2xl font-serif text-cafe-dark-brown mb-6 text-center">Del Campo a la Taza</h2>
                  
                  <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
                    <div className="w-full md:w-1/2">
                      <img 
                        src="/lovable-uploads/70f57454-a1cc-4f06-8701-b76528b28713.png" 
                        alt="Café sobre libro" 
                        className="rounded-lg shadow-lg w-full"
                      />
                    </div>
                    <div className="w-full md:w-1/2">
                      <p className="mb-4">
                        Creemos que cada taza de café tiene una historia que merece ser contada. Por eso, trabajamos 
                        directamente con pequeños productores en países como Colombia, Etiopía y Guatemala, 
                        garantizando precios justos y relaciones comerciales sostenibles.
                      </p>
                      <p className="mb-4">
                        Nuestro café se tuesta semanalmente en pequeños lotes para garantizar la frescura y preservar 
                        el perfil único de cada origen. Los métodos de preparación son seleccionados cuidadosamente 
                        para resaltar las mejores características de cada grano.
                      </p>
                      <p>
                        Esta trazabilidad y transparencia en cada etapa del proceso no solo nos permite 
                        ofrecerte un café excepcional, sino también honrar el arduo trabajo de todos los involucrados 
                        en el viaje del café, desde la semilla hasta tu taza.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="mb-16"
                >
                  <h2 className="text-3xl font-serif text-center text-cafe-dark-brown mb-8">Nuestros Compromisos</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { 
                        icon: <Award className="text-cafe-dark-brown" size={24} />, 
                        title: "Excelencia", 
                        description: "Buscamos la perfección en cada taza, desde la selección del grano hasta el servicio." 
                      },
                      { 
                        icon: <Truck className="text-cafe-dark-brown" size={24} />, 
                        title: "Trazabilidad", 
                        description: "Conocemos la procedencia de cada producto y compartimos esa información contigo." 
                      },
                      { 
                        icon: <Heart className="text-cafe-dark-brown" size={24} />, 
                        title: "Pasión", 
                        description: "Amamos lo que hacemos y esa pasión se refleja en cada detalle de nuestra cafetería." 
                      },
                      { 
                        icon: <Users className="text-cafe-dark-brown" size={24} />, 
                        title: "Educación", 
                        description: "Compartimos nuestro conocimiento sobre café con talleres y sesiones de cata." 
                      },
                    ].map((commitment, i) => (
                      <motion.div 
                        key={commitment.title}
                        custom={i}
                        variants={staggerAnimate}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex gap-4 items-start p-5 bg-white rounded-lg shadow-sm"
                      >
                        <div className="w-10 h-10 bg-cafe-beige rounded-full flex items-center justify-center flex-shrink-0">
                          {commitment.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-serif mb-2">{commitment.title}</h3>
                          <p className="text-cafe-dark-brown opacity-80">{commitment.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white p-8 rounded-xl shadow-md text-center"
                >
                  <h2 className="text-2xl font-serif text-cafe-dark-brown mb-6">Únete a Nuestra Comunidad</h2>
                  <p className="mb-6">
                    En Raíz y Grano, creemos que el café tiene el poder de unir a las personas. Te invitamos 
                    a formar parte de nuestra historia, a disfrutar de nuestras creaciones y a compartir 
                    tu experiencia con otros amantes del buen café.
                  </p>
                  <button className="cafe-button-primary">Síguenos en Instagram</button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
};

export default About;

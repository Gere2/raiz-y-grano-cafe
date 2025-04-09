
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "Nosotros | Raíz y Grano";
  }, []);

  return (
    <Layout>
      <div className="pt-24 md:pt-28">
        <div className="container mx-auto px-4 py-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif text-center mb-12 text-cafe-dark-brown"
          >
            Nuestra Historia
          </motion.h1>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg mx-auto text-cafe-dark-brown"
            >
              <p className="text-xl leading-relaxed mb-6">
                Raíz y Grano nació en 2018 como un proyecto apasionado de dos amigos baristas que compartían el sueño de ofrecer café de especialidad en un ambiente universitario. Lo que comenzó como una pequeña cafetería móvil, hoy se ha convertido en un espacio consolidado donde el café de calidad y la experiencia del cliente son nuestra prioridad.
              </p>

              <h2 className="text-2xl font-serif mt-10 mb-4 text-cafe-dark-brown">Nuestra Filosofía</h2>
              <p className="mb-6">
                Creemos que cada taza de café cuenta una historia: la del productor que cultivó los granos, la del tostador que desarrolló su perfil de sabor, y la del barista que prepara la bebida final. Nos esforzamos por honrar cada etapa de este proceso, asegurando que nuestros clientes disfruten de una experiencia sensorial completa.
              </p>
              <p className="mb-10">
                Trabajamos exclusivamente con cafés de temporada, tostados en pequeños lotes para garantizar su frescura. Nuestros métodos de preparación están diseñados para resaltar las características únicas de cada origen, permitiéndote descubrir la diversidad de sabores que el café puede ofrecer.
              </p>

              <div className="bg-cafe-beige bg-opacity-30 p-6 rounded-lg mb-10">
                <h3 className="text-xl font-serif mb-3 text-cafe-dark-brown">Compromiso con la Sostenibilidad</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-cafe-light-brown mt-1">✓</span>
                    <span>Trabajamos con productores que implementan prácticas agrícolas sostenibles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cafe-light-brown mt-1">✓</span>
                    <span>Utilizamos envases compostables y materiales reciclables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cafe-light-brown mt-1">✓</span>
                    <span>Reprocesamos los residuos de café como abono para plantas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cafe-light-brown mt-1">✓</span>
                    <span>Incentivamos el uso de tazas reutilizables con descuentos especiales</span>
                  </li>
                </ul>
              </div>

              <h2 className="text-2xl font-serif mt-10 mb-4 text-cafe-dark-brown">Nuestro Equipo</h2>
              <p className="mb-6">
                Detrás de Raíz y Grano hay un equipo de profesionales apasionados por el café. Nuestros baristas están en constante formación, participando en catas, competiciones y cursos especializados para perfeccionar sus habilidades y conocimientos.
              </p>
              <p>
                Te invitamos a conocernos, a conversar con nosotros sobre café y a formar parte de nuestra comunidad. En Raíz y Grano no solo servimos café; creamos momentos y conexiones que perduran más allá de la taza.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-serif mb-4 text-cafe-dark-brown">Misión</h3>
                <p className="text-cafe-dark-brown">
                  Ofrecer una experiencia de café excepcional que eduque, inspire y cree comunidad, manteniendo siempre un compromiso con la calidad, la sostenibilidad y el comercio justo.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-serif mb-4 text-cafe-dark-brown">Visión</h3>
                <p className="text-cafe-dark-brown">
                  Ser reconocidos como un referente en la cultura del café de especialidad, contribuyendo activamente a la formación de consumidores conscientes y al bienestar de toda la cadena productiva.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;


import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section className="py-20 bg-cafe-beige bg-opacity-30">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Nuestra Historia
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-serif mb-4 text-cafe-dark-brown">Raíces que nutren</h3>
            <p className="mb-6 text-cafe-dark-brown">
              Raíz y Grano nació de la pasión por el café de especialidad y la necesidad de crear un espacio acogedor para estudiantes y profesores. Nuestra cafetería es el resultado de años de experiencia y formación en el mundo del café.
            </p>
            <p className="mb-6 text-cafe-dark-brown">
              Trabajamos directamente con productores que comparten nuestros valores de sostenibilidad y comercio justo, asegurando que cada taza de café tenga un impacto positivo en toda la cadena de producción.
            </p>
            <p className="text-cafe-dark-brown">
              Nuestro objetivo es ofrecer no solo un producto de calidad, sino también una experiencia que invite a disfrutar del momento, a conectar con los demás y a valorar lo artesanal.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-lg overflow-hidden shadow-xl"
          >
            <div className="aspect-w-4 aspect-h-3 bg-cafe-light-brown flex items-center justify-center h-80">
              <div className="text-white text-center p-8">
                <p className="text-xl font-serif">Imagen representativa del equipo o el local</p>
                <p className="mt-4 italic">Esta imagen sería reemplazada por una foto real de la cafetería o del equipo</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg p-6 shadow-md"
          >
            <div className="w-14 h-14 bg-cafe-light-brown rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M2 9V5c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v4"></path>
                <path d="M2 13v6c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2v-6"></path>
                <path d="M5 5v14"></path>
                <path d="M19 5v14"></path>
                <path d="M9 5v0"></path>
                <path d="M9 19v0"></path>
                <path d="M15 5v0"></path>
                <path d="M15 19v0"></path>
              </svg>
            </div>
            <h3 className="font-serif text-xl text-center mb-3 text-cafe-dark-brown">Café de origen</h3>
            <p className="text-center text-cafe-dark-brown">
              Seleccionamos cuidadosamente granos de café de fincas específicas, respetando la temporada y las características únicas de cada región.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-lg p-6 shadow-md"
          >
            <div className="w-14 h-14 bg-cafe-light-brown rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
            </div>
            <h3 className="font-serif text-xl text-center mb-3 text-cafe-dark-brown">Trazabilidad completa</h3>
            <p className="text-center text-cafe-dark-brown">
              Conocemos el origen exacto de nuestro café, quién lo cultiva y cómo se procesa, garantizando transparencia en toda la cadena de suministro.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-lg p-6 shadow-md"
          >
            <div className="w-14 h-14 bg-cafe-light-brown rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M7 10v12"></path>
                <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
              </svg>
            </div>
            <h3 className="font-serif text-xl text-center mb-3 text-cafe-dark-brown">Experiencia sensorial</h3>
            <p className="text-center text-cafe-dark-brown">
              Cada taza es una invitación a descubrir sabores complejos y aromas únicos que despiertan los sentidos y encienden conversaciones.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;


import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "María García",
    role: "Estudiante de Medicina",
    text: "Raíz y Grano se ha convertido en mi lugar favorito para estudiar. El ambiente es perfecto y su café de especialidad me ayuda a mantenerme concentrada durante largas sesiones de estudio.",
  },
  {
    name: "Carlos Rodríguez",
    role: "Profesor de Literatura",
    text: "Un oasis entre clases. El sabor de su café es incomparable y el personal siempre tiene una sonrisa. Me encanta poder disfrutar de productos artesanales de tan alta calidad.",
  },
  {
    name: "Laura Fernández",
    role: "Estudiante de Arquitectura",
    text: "Los desayunos son increíbles y el espacio está diseñado con un gusto exquisito. Es el lugar perfecto para reunirse con compañeros a trabajar en proyectos o simplemente para desconectar.",
  },
];

const Testimonials = () => {
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
          Lo que dicen nuestros clientes
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-md"
            >
              <div className="mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-cafe-light-brown">
                  <path d="M10 11H6C5.46957 11 4.96086 10.7893 4.58579 10.4142C4.21071 10.0391 4 9.53043 4 9V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H8C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 11H16C15.4696 11 14.9609 10.7893 14.5858 10.4142C14.2107 10.0391 14 9.53043 14 9V7C14 6.46957 14.2107 5.96086 14.5858 5.58579C14.9609 5.21071 15.4696 5 16 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-cafe-dark-brown mb-6 italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-cafe-beige flex items-center justify-center mr-3">
                  <span className="text-cafe-dark-brown font-medium">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-cafe-dark-brown">{testimonial.name}</h4>
                  <p className="text-sm text-cafe-dark-brown opacity-70">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

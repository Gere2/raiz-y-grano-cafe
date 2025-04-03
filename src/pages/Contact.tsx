
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { MapPin, Phone, Clock, Mail, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Contacto | Raíz y Grano";
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // En una implementación real, aquí se enviaría el formulario a un servicio
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    
    // Reset the submitted state after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <Layout>
      <div className="pt-24 md:pt-28">
        <div className="container mx-auto px-4 py-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif text-center mb-4 text-cafe-dark-brown"
          >
            Contacto
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-cafe-dark-brown mb-12 max-w-2xl mx-auto"
          >
            ¿Tienes alguna pregunta o sugerencia? ¡Nos encantaría escucharte! Puedes contactarnos a través del formulario o utilizando la información que aparece a continuación.
          </motion.p>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8 h-full">
                <h2 className="text-2xl font-serif mb-6 text-cafe-dark-brown">Información de Contacto</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-cafe-beige flex items-center justify-center shrink-0">
                      <MapPin size={20} className="text-cafe-dark-brown" />
                    </div>
                    <div>
                      <h3 className="font-medium text-cafe-dark-brown mb-1">Ubicación</h3>
                      <p className="text-cafe-dark-brown">Entre el edificio H y el CRAI</p>
                      <p className="text-cafe-dark-brown">Campus Universitario</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-cafe-beige flex items-center justify-center shrink-0">
                      <Phone size={20} className="text-cafe-dark-brown" />
                    </div>
                    <div>
                      <h3 className="font-medium text-cafe-dark-brown mb-1">Teléfono</h3>
                      <p className="text-cafe-dark-brown">+34 123 456 789</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-cafe-beige flex items-center justify-center shrink-0">
                      <Mail size={20} className="text-cafe-dark-brown" />
                    </div>
                    <div>
                      <h3 className="font-medium text-cafe-dark-brown mb-1">Email</h3>
                      <p className="text-cafe-dark-brown">info@raizygrano.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-cafe-beige flex items-center justify-center shrink-0">
                      <Clock size={20} className="text-cafe-dark-brown" />
                    </div>
                    <div>
                      <h3 className="font-medium text-cafe-dark-brown mb-1">Horario</h3>
                      <p className="text-cafe-dark-brown">Lunes a Viernes: 8:00 - 20:00</p>
                      <p className="text-cafe-dark-brown">Sábados: 9:00 - 21:00</p>
                      <p className="text-cafe-dark-brown">Domingos: 9:00 - 14:00</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-medium text-cafe-dark-brown mb-3">¿Cómo llegar?</h3>
                  <div className="aspect-video bg-cafe-beige rounded-lg flex items-center justify-center">
                    <p className="text-cafe-dark-brown p-4 text-center">
                      Aquí se integraría un mapa de Google Maps mostrando la ubicación exacta de la cafetería
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <h2 className="text-2xl font-serif mb-6 text-cafe-dark-brown">Envíanos un mensaje</h2>
                
                {submitted ? (
                  <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6">
                    <p className="font-medium">¡Mensaje enviado correctamente!</p>
                    <p>Nos pondremos en contacto contigo lo antes posible.</p>
                  </div>
                ) : null}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-cafe-dark-brown mb-1">Nombre</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-cafe-beige rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-light-brown"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-cafe-dark-brown mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-cafe-beige rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-light-brown"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-cafe-dark-brown mb-1">Asunto</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-cafe-beige rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-light-brown"
                      required
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="consulta">Consulta general</option>
                      <option value="reserva">Reserva</option>
                      <option value="sugerencia">Sugerencia</option>
                      <option value="colaboracion">Propuesta de colaboración</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-cafe-dark-brown mb-1">Mensaje</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-2 border border-cafe-beige rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-light-brown"
                      required
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="flex items-center justify-center gap-2 bg-cafe-dark-brown text-cafe-cream py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors"
                  >
                    <span>Enviar mensaje</span>
                    <Send size={16} />
                  </button>
                </form>

                <p className="mt-6 text-sm text-cafe-dark-brown opacity-70">
                  * Al enviar este formulario, aceptas nuestra política de privacidad y el tratamiento de tus datos para responder a tu solicitud.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;

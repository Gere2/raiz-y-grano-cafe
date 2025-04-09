
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  useEffect(() => {
    document.title = "Contacto | Raíz y Grano";
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset form status after 5 seconds
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
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
                <h1 className="text-4xl md:text-5xl font-serif text-cafe-dark-brown mb-6">Contacto</h1>
                <div className="w-24 h-1 bg-cafe-light-brown mx-auto mb-8"></div>
                <p className="text-lg text-cafe-dark-brown">
                  Estamos encantados de escucharte. No dudes en ponerte en contacto con nosotros.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="bg-white rounded-xl p-6 shadow-md h-full">
                    <h2 className="text-2xl font-serif text-cafe-dark-brown mb-6 pb-3 border-b border-cafe-beige">
                      Información de Contacto
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-cafe-beige bg-opacity-30 rounded-full flex items-center justify-center flex-shrink-0">
                          <MapPin className="text-cafe-light-brown" size={20} />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-1">Ubicación</h3>
                          <p className="text-cafe-dark-brown opacity-80">
                            Entre el edificio H y el CRAI<br />
                            Campus Ferrol
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-cafe-beige bg-opacity-30 rounded-full flex items-center justify-center flex-shrink-0">
                          <Clock className="text-cafe-light-brown" size={20} />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-1">Horario</h3>
                          <p className="text-cafe-dark-brown opacity-80">
                            Lunes a Viernes: 7:00 - 18:00<br />
                            Sábados y Domingos: Cerrado
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-cafe-beige bg-opacity-30 rounded-full flex items-center justify-center flex-shrink-0">
                          <Phone className="text-cafe-light-brown" size={20} />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-1">Teléfono</h3>
                          <p className="text-cafe-dark-brown opacity-80">
                            +34 612 345 678
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-cafe-beige bg-opacity-30 rounded-full flex items-center justify-center flex-shrink-0">
                          <Mail className="text-cafe-light-brown" size={20} />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-1">Email</h3>
                          <p className="text-cafe-dark-brown opacity-80">
                            info@raizygrano.com
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-cafe-beige">
                      <h3 className="text-lg font-medium mb-4">Síguenos en redes sociales</h3>
                      <div className="flex space-x-4">
                        <a 
                          href="https://instagram.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-cafe-beige bg-opacity-30 hover:bg-opacity-50 p-3 rounded-full text-cafe-light-brown transition-colors"
                          aria-label="Instagram"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                        </a>
                        <a 
                          href="https://facebook.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-cafe-beige bg-opacity-30 hover:bg-opacity-50 p-3 rounded-full text-cafe-light-brown transition-colors"
                          aria-label="Facebook"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-2xl font-serif text-cafe-dark-brown mb-6 pb-3 border-b border-cafe-beige">
                      Envíanos un Mensaje
                    </h2>
                    
                    {formStatus === 'success' ? (
                      <motion.div 
                        className="py-8 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="flex justify-center mb-4">
                          <CheckCircle className="text-green-600" size={48} />
                        </div>
                        <h3 className="text-xl font-medium text-cafe-dark-brown mb-2">¡Mensaje Enviado!</h3>
                        <p className="text-cafe-dark-brown opacity-80 mb-6">
                          Gracias por ponerte en contacto con nosotros. Te responderemos lo antes posible.
                        </p>
                        <button 
                          onClick={() => setFormStatus('idle')}
                          className="cafe-button-secondary text-sm"
                        >
                          Enviar otro mensaje
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <label htmlFor="name" className="block text-cafe-dark-brown mb-2 font-medium">
                            Nombre completo*
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-cafe-beige rounded-lg focus:ring-2 focus:ring-cafe-light-brown focus:outline-none transition-colors"
                            placeholder="Tu nombre"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-cafe-dark-brown mb-2 font-medium">
                            Email*
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-cafe-beige rounded-lg focus:ring-2 focus:ring-cafe-light-brown focus:outline-none transition-colors"
                            placeholder="tucorreo@ejemplo.com"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="subject" className="block text-cafe-dark-brown mb-2 font-medium">
                            Asunto*
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-cafe-beige rounded-lg focus:ring-2 focus:ring-cafe-light-brown focus:outline-none transition-colors"
                          >
                            <option value="">Selecciona una opción</option>
                            <option value="consulta">Consulta general</option>
                            <option value="catering">Servicios de catering</option>
                            <option value="reserva">Reserva de espacio</option>
                            <option value="otro">Otro</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-cafe-dark-brown mb-2 font-medium">
                            Mensaje*
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full px-4 py-2 border border-cafe-beige rounded-lg focus:ring-2 focus:ring-cafe-light-brown focus:outline-none transition-colors"
                            placeholder="Escribe tu mensaje aquí..."
                          ></textarea>
                        </div>
                        
                        <div className="text-right">
                          <button
                            type="submit"
                            disabled={formStatus === 'submitting'}
                            className="cafe-button-primary inline-flex items-center"
                          >
                            {formStatus === 'submitting' ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Enviando...
                              </>
                            ) : (
                              <>
                                <Send className="mr-2" size={16} />
                                Enviar Mensaje
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-white rounded-xl overflow-hidden shadow-md"
              >
                <h2 className="text-2xl font-serif text-cafe-dark-brown p-6 border-b border-cafe-beige">
                  Nuestra Ubicación
                </h2>
                
                <div className="h-[400px] w-full relative">
                  {/* Replace this iframe with actual Google Maps embed code when available */}
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2913.1321200480154!2d-8.262751223414225!3d43.091633971346465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2e64b3f52b5bd9%3A0xc73656a7b604280!2sUniversidade%20da%20Coru%C3%B1a%20-%20Campus%20de%20Ferrol!5e0!3m2!1sen!2ses!4v1712179689706!5m2!1sen!2ses"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa de Raíz y Grano"
                  ></iframe>
                </div>
                
                <div className="p-6 bg-cafe-beige bg-opacity-20">
                  <p className="text-cafe-dark-brown">
                    <strong>Raíz y Grano</strong> - Entre el edificio H y el CRAI, Campus Ferrol
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
};

export default Contact;

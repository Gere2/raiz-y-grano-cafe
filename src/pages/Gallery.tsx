
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Eye, X } from 'lucide-react';

// Define image gallery with categories
const galleryImages = {
  "Café": [
    { src: "/lovable-uploads/649eac4b-afe2-4360-9252-bede9f39acc3.png", alt: "Café con croissant", description: "Espresso y croissant recién horneado" },
    { src: "/lovable-uploads/f53365f0-b667-4808-a863-b2fb6e913df5.png", alt: "Preparando café", description: "Barista preparando café de especialidad" },
    { src: "/lovable-uploads/70f57454-a1cc-4f06-8701-b76528b28713.png", alt: "Café sobre libro", description: "Un momento de lectura acompañado de café" }
  ],
  "Alimentos": [
    { src: "/lovable-uploads/45e4d764-6d51-4440-be8f-5673c5ac5fe2.png", alt: "Mujer con trigo", description: "Seleccionamos los mejores ingredientes" },
    { src: "/lovable-uploads/649eac4b-afe2-4360-9252-bede9f39acc3.png", alt: "Café con croissant", description: "Repostería artesanal diaria" },
    { src: "/lovable-uploads/eddb575b-707b-465f-82bd-fe69ba4037b5.png", alt: "Mesa con alimentos", description: "Opciones para todos los gustos" }
  ],
  "Ambiente": [
    { src: "/lovable-uploads/70f57454-a1cc-4f06-8701-b76528b28713.png", alt: "Café sobre libro", description: "Ambiente perfecto para estudiar" },
    { src: "/lovable-uploads/ffa79ff1-d030-4159-bd0b-8e303ab0f366.png", alt: "Espacio de cafetería", description: "Un rincón de paz en el campus" },
    { src: "/lovable-uploads/f53365f0-b667-4808-a863-b2fb6e913df5.png", alt: "Preparando café", description: "Pasión en cada preparación" }
  ],
  "Sostenibilidad": [
    { src: "/lovable-uploads/45e4d764-6d51-4440-be8f-5673c5ac5fe2.png", alt: "Mujer con trigo", description: "Compromiso con el origen" },
    { src: "/lovable-uploads/92d62c2f-fdf0-42ee-8703-7e0bc4236dac.png", alt: "Manos sosteniendo café", description: "Comercio justo con productores" },
    { src: "/lovable-uploads/51e9a661-0432-4c8e-9c51-9c8df69e9d94.png", alt: "Taza reutilizable", description: "Comprometidos con el medio ambiente" }
  ]
};

const Gallery = () => {
  useEffect(() => {
    document.title = "Galería | Raíz y Grano";
  }, []);

  const [activeCategory, setActiveCategory] = useState<string>("Café");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<any>(null);
  
  const categories = Object.keys(galleryImages);

  const openLightbox = (image: any) => {
    setCurrentImage(image);
    setLightboxOpen(true);
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    // Restore scrolling when lightbox is closed
    document.body.style.overflow = 'auto';
  };

  const staggerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
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
            <div className="max-w-6xl mx-auto">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl font-serif text-cafe-dark-brown mb-6">Galería</h1>
                <div className="w-24 h-1 bg-cafe-light-brown mx-auto mb-8"></div>
                <p className="text-lg text-cafe-dark-brown max-w-2xl mx-auto">
                  Descubre la esencia de Raíz y Grano a través de nuestras imágenes. Una mirada visual 
                  a nuestro café, productos y ambiente.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-wrap justify-center gap-3 md:gap-5 mb-12"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(category)}
                    className={`px-5 py-3 rounded-full text-sm md:text-base transition-colors ${
                      activeCategory === category
                        ? "bg-cafe-dark-brown text-cafe-cream shadow-md"
                        : "bg-cafe-beige text-cafe-dark-brown hover:bg-cafe-light-brown hover:text-cafe-cream"
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </motion.div>

              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {galleryImages[activeCategory as keyof typeof galleryImages].map((image, index) => (
                  <motion.div
                    key={`${activeCategory}-${index}`}
                    custom={index}
                    variants={staggerAnimation}
                    initial="hidden"
                    animate="visible"
                    className="group relative rounded-xl overflow-hidden shadow-md cursor-pointer h-64"
                    onClick={() => openLightbox(image)}
                  >
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="w-full">
                        <h3 className="text-white font-medium mb-1">{image.alt}</h3>
                        <p className="text-white/80 text-sm">{image.description}</p>
                      </div>
                      <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                        <Eye className="text-white" size={20} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Gallery description */}
              <motion.div 
                className="mt-16 bg-cafe-beige bg-opacity-20 p-8 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h2 className="text-2xl font-serif text-cafe-dark-brown mb-4">Nuestra Historia Visual</h2>
                <p className="text-cafe-dark-brown">
                  En Raíz y Grano creemos que las imágenes transmiten sensaciones y valores que las palabras 
                  a veces no pueden expresar. A través de esta galería queremos compartir contigo no solo nuestros 
                  productos y espacios, sino también la filosofía y pasión que hay detrás de cada taza de café 
                  que preparamos.
                </p>
                <p className="text-cafe-dark-brown mt-4">
                  Te invitamos a conocernos mejor a través de estas instantáneas que capturan la esencia de 
                  nuestro proyecto: sostenibilidad, artesanía y amor por el café de especialidad.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Lightbox */}
        {lightboxOpen && currentImage && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-cafe-cream p-2 rounded-full bg-black/50 transition-colors"
              aria-label="Cerrar"
            >
              <X size={24} />
            </button>
            
            <div className="max-w-4xl w-full">
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src={currentImage.src} 
                  alt={currentImage.alt} 
                  className="w-full h-auto max-h-[80vh] object-contain" 
                />
              </div>
              <div className="mt-4 text-white text-center">
                <h3 className="text-xl font-serif">{currentImage.alt}</h3>
                <p className="text-cafe-cream opacity-80 mt-2">{currentImage.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Gallery;

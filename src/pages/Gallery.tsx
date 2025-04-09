
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Card,
  CardContent,
} from "@/components/ui/card";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Imágenes de carteles promocionales
const promotionalImages = [
  {
    id: 1,
    src: "/lovable-uploads/92d62c2f-fdf0-42ee-8703-7e0bc4236dac.png",
    alt: "Conoce cómo conservar tu café molido",
    category: "consejos"
  },
  {
    id: 2,
    src: "/lovable-uploads/2f86309b-c09e-48cd-ace5-08f53fbd76b4.png",
    alt: "HOY TE SERVIMOS: Origen Etiopía - Floral y cítrico",
    category: "café"
  },
  {
    id: 3,
    src: "/lovable-uploads/6c9935e5-3b4e-44b9-9bee-f5bfe9772810.png",
    alt: "CONSEJO: Conoce a Oscar, caficultor colombiano del lote El Rocío",
    category: "consejos"
  },
  {
    id: 4,
    src: "/lovable-uploads/eb416299-66a6-4bdf-90b6-16b0973ecdd9.png",
    alt: "Logo de Raíz y Grano",
    category: "branding"
  },
  {
    id: 5,
    src: "/lovable-uploads/75ce01af-aa90-4ec6-a828-6ad664d2fcf6.png",
    alt: "APERTURA DE RAÍZ Y GRANO - Sabor que enciende neuronas",
    category: "promoción"
  },
  {
    id: 6,
    src: "/lovable-uploads/59c6ec53-307a-449d-83c0-39367e96e386.png",
    alt: "¡ABRIMOS HOY! RAÍZ Y GRANO - Tu nueva pausa favorita entre clase y clase",
    category: "promoción"
  },
  {
    id: 7,
    src: "/lovable-uploads/08af2b01-4ca9-4bfb-97c2-2268ae192fea.png",
    alt: "CAFÉ PARA QUIENES DESPIERTAN MENTES - Raíz y Grano: tu pausa con sentido",
    category: "promoción"
  },
  {
    id: 8,
    src: "/lovable-uploads/eddb575b-707b-465f-82bd-fe69ba4037b5.png",
    alt: "IDEAS QUE GERMINAN CON CAFÉ - Raíz y Grano, tu pausa con profundidad",
    category: "promoción"
  },
  {
    id: 9,
    src: "/lovable-uploads/51e9a661-0432-4c8e-9c51-9c8df69e9d94.png",
    alt: "El café que inspira, el café que transforma - Raíz y Grano tu pausa con alma",
    category: "promoción"
  },
  {
    id: 10,
    src: "/lovable-uploads/ae17feec-88a6-4ff6-b4aa-2fa9dfb4a3cc.png",
    alt: "Una pausa con esencia - Café de especialidad, para tu momento más tuyo",
    category: "promoción"
  },
  {
    id: 11,
    src: "/lovable-uploads/43e54373-9a22-414b-bf7b-3659781392c6.png",
    alt: "HOY TE SERVIMOS: Origen Etiopía - Floral y cítrico",
    category: "café"
  },
  {
    id: 12,
    src: "/lovable-uploads/1ed06b71-f1b5-401f-84a0-f7572be153d6.png",
    alt: "Logo de Raíz y Grano",
    category: "branding"
  },
  {
    id: 13,
    src: "/lovable-uploads/9a562b14-8f86-4f65-96a9-af7d47660d1c.png",
    alt: "¡APERTURA DE RAÍZ Y GRANO! - El sabor que enciende neuronas entre clases",
    category: "promoción"
  }
];

const Gallery = () => {
  const [filter, setFilter] = useState("todos");
  const [filteredImages, setFilteredImages] = useState(promotionalImages);
  const [selectedImage, setSelectedImage] = useState<null | typeof promotionalImages[0]>(null);
  const [showLightbox, setShowLightbox] = useState(false);

  useEffect(() => {
    document.title = "Galería | Raíz y Grano";
  }, []);

  useEffect(() => {
    if (filter === "todos") {
      setFilteredImages(promotionalImages);
    } else {
      setFilteredImages(promotionalImages.filter(img => img.category === filter));
    }
  }, [filter]);

  const handleImageClick = (image: typeof promotionalImages[0]) => {
    setSelectedImage(image);
    setShowLightbox(true);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
  };

  return (
    <Layout fullWidth>
      <div className="pt-24 md:pt-28">
        <div className="container mx-auto px-4 py-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif text-center mb-4 text-cafe-dark-brown"
          >
            Nuestra Galería
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-cafe-dark-brown mb-12 max-w-2xl mx-auto"
          >
            Conoce nuestros carteles promocionales y descubre nuestra identidad visual.
          </motion.p>

          {/* Carousel de destacados */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-serif text-center mb-8 text-cafe-dark-brown">Destacados</h2>
            <Carousel className="max-w-4xl mx-auto">
              <CarouselContent>
                {[5, 6, 9, 12].map((idx) => (
                  <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="border-0 shadow-md overflow-hidden">
                        <CardContent className="p-0">
                          <img 
                            src={promotionalImages[idx-1].src} 
                            alt={promotionalImages[idx-1].alt}
                            className="w-full h-auto object-cover aspect-[3/4] cursor-pointer transition-transform hover:scale-105"
                            onClick={() => handleImageClick(promotionalImages[idx-1])}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-10 flex flex-wrap justify-center gap-2"
          >
            {["todos", "promoción", "café", "consejos", "branding"].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm md:text-base transition-colors ${
                  filter === category
                    ? "bg-cafe-dark-brown text-cafe-cream"
                    : "bg-cafe-beige text-cafe-dark-brown hover:bg-cafe-light-brown hover:text-cafe-cream"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </motion.div>

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden rounded-lg shadow-md bg-white"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div 
                  className="cursor-pointer" 
                  onClick={() => handleImageClick(image)}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-auto object-cover aspect-[3/4]"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Lightbox para imagen seleccionada */}
      {showLightbox && selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-3xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto max-h-[90vh] object-contain"
            />
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white text-xl bg-cafe-dark-brown bg-opacity-70 w-10 h-10 rounded-full flex items-center justify-center"
            >
              ×
            </button>
            <p className="text-white text-center mt-4 italic">{selectedImage.alt}</p>
          </motion.div>
        </motion.div>
      )}
    </Layout>
  );
};

export default Gallery;

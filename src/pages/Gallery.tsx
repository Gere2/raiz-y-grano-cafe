
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const galleryImages = [
  { id: 1, category: "café", placeholder: "Imagen de una taza de café con latte art" },
  { id: 2, category: "café", placeholder: "Barista preparando un café de especialidad" },
  { id: 3, category: "comida", placeholder: "Toast de aguacate con huevo poché" },
  { id: 4, category: "comida", placeholder: "Bowl de yogur con frutas y granola" },
  { id: 5, category: "local", placeholder: "Interior de la cafetería con luz natural" },
  { id: 6, category: "local", placeholder: "Espacio de trabajo con clientes" },
  { id: 7, category: "café", placeholder: "Granos de café de especialidad" },
  { id: 8, category: "comida", placeholder: "Selección de pasteles artesanales" },
  { id: 9, category: "local", placeholder: "Terraza exterior de la cafetería" },
  { id: 10, category: "café", placeholder: "Proceso de tueste de café" },
  { id: 11, category: "comida", placeholder: "Plato de brunch completo" },
  { id: 12, category: "local", placeholder: "Detalle de decoración de la cafetería" },
];

const Gallery = () => {
  const [filter, setFilter] = useState("todos");
  const [filteredImages, setFilteredImages] = useState(galleryImages);

  useEffect(() => {
    document.title = "Galería | Raíz y Grano";
  }, []);

  useEffect(() => {
    if (filter === "todos") {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(galleryImages.filter(img => img.category === filter));
    }
  }, [filter]);

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
            Nuestra Galería
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-cafe-dark-brown mb-12 max-w-2xl mx-auto"
          >
            Explora nuestra selección de imágenes para conocer nuestro espacio, productos y el ambiente que nos caracteriza.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-10 flex flex-wrap justify-center gap-2"
          >
            {["todos", "café", "comida", "local"].map((category) => (
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
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="aspect-square overflow-hidden rounded-lg shadow-md bg-cafe-light-brown"
              >
                <div className="w-full h-full flex items-center justify-center p-4 text-center text-white">
                  <p>{image.placeholder}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center text-cafe-dark-brown mt-10 italic"
          >
            Nota: Las imágenes son representativas y serían reemplazadas por fotografías reales de la cafetería.
          </motion.p>
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;

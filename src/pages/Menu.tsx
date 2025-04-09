
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Coffee, Leaf, Cookie, Droplet } from "lucide-react";

const menuData = {
  "Cafés": [
    { name: "Espresso", description: "Intenso y concentrado, base de todos nuestros cafés", price: "1.80€", featured: true },
    { name: "Americano", description: "Espresso con agua caliente", price: "2.00€" },
    { name: "Cortado", description: "Espresso con una pequeña cantidad de leche", price: "1.90€" },
    { name: "Café con leche", description: "Espresso con leche texturizada", price: "2.20€", featured: true },
    { name: "Cappuccino", description: "Espresso con leche texturizada y espuma de leche", price: "2.60€", featured: true },
    { name: "Flat White", description: "Espresso doble con leche texturizada", price: "2.90€" },
    { name: "Latte", description: "Espresso con abundante leche cremosa", price: "2.80€" },
    { name: "Pour Over", description: "Método de filtrado que resalta notas florales y afrutadas", price: "3.50€", featured: true },
    { name: "Aeropress", description: "Método de inmersión que produce un café limpio y equilibrado", price: "3.50€" },
    { name: "Cold Brew", description: "Café de extracción en frío (12h), suave y refrescante", price: "3.30€", featured: true },
  ],
  "Desayunos": [
    { name: "Tostada con AOVE", description: "Pan artesanal con aceite de oliva virgen extra", price: "2.50€", featured: true },
    { name: "Tostada con tomate", description: "Pan artesanal con tomate y AOVE", price: "2.80€" },
    { name: "Tostada con aguacate", description: "Pan artesanal con aguacate, tomate cherry y semillas", price: "4.50€", featured: true },
    { name: "Bowl de yogur", description: "Con granola casera, fruta fresca y miel", price: "4.90€", featured: true },
    { name: "Porridge", description: "Avena cocida con leche, canela y toppings a elegir", price: "4.20€" },
    { name: "Tostada francesa", description: "Con frutas del bosque y sirope de arce", price: "5.90€", featured: true },
  ],
  "Repostería Artesanal": [
    { name: "Carrot Cake", description: "Bizcocho de zanahoria con frosting de queso", price: "4.20€", featured: true },
    { name: "Cookies", description: "Galleta artesanal con chocolate belga", price: "2.30€", featured: true },
    { name: "Croissant", description: "Hojaldre artesanal elaborado con mantequilla francesa", price: "2.10€" },
    { name: "Brownie", description: "Con nueces y chocolate 70%", price: "3.50€", featured: true },
    { name: "Cinnamon Roll", description: "Rollito de canela con glaseado", price: "3.20€" },
    { name: "Banana Bread", description: "Pan de plátano con nueces", price: "3.00€" },
  ],
  "Bebidas Frías": [
    { name: "Limonada casera", description: "Con menta fresca y jengibre", price: "3.00€", featured: true },
    { name: "Zumo de naranja", description: "Recién exprimido", price: "3.20€", featured: true },
    { name: "Smoothie verde", description: "Espinacas, manzana, jengibre y limón", price: "4.50€" },
    { name: "Smoothie tropical", description: "Mango, piña, plátano y leche de coco", price: "4.50€", featured: true },
    { name: "Kombucha", description: "Bebida probiótica fermentada, varios sabores", price: "3.80€" },
  ],
  "Infusiones": [
    { name: "Té negro", description: "English Breakfast, Earl Grey", price: "2.20€" },
    { name: "Té verde", description: "Sencha, Jazmín", price: "2.20€", featured: true },
    { name: "Rooibos", description: "Sin teína, sabores variados", price: "2.20€" },
    { name: "Infusión de hierbas", description: "Manzanilla, Menta, Tila", price: "2.20€", featured: true },
    { name: "Chai Latte", description: "Té negro con especias y leche texturizada", price: "3.50€", featured: true },
    { name: "Matcha Latte", description: "Té verde matcha ceremonial con leche", price: "3.80€" },
  ]
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Cafés":
      return <Coffee className="w-5 h-5" />;
    case "Desayunos":
      return <Leaf className="w-5 h-5" />;
    case "Repostería Artesanal":
      return <Cookie className="w-5 h-5" />;
    case "Bebidas Frías":
    case "Infusiones":
      return <Droplet className="w-5 h-5" />;
    default:
      return <Coffee className="w-5 h-5" />;
  }
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("Cafés");
  const [showFeatured, setShowFeatured] = useState(false);
  const categories = Object.keys(menuData);

  useEffect(() => {
    document.title = "Carta | Raíz y Grano";
  }, []);

  const filteredItems = showFeatured 
    ? menuData[activeCategory as keyof typeof menuData].filter(item => item.featured) 
    : menuData[activeCategory as keyof typeof menuData];

  return (
    <Layout>
      <div className="py-12">
        <motion.div 
          className="relative mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-cafe-dark-brown opacity-70"></div>
          <div className="relative py-20 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-5xl md:text-6xl font-serif text-cafe-cream mb-6">Nuestra Carta</h1>
            <div className="w-24 h-1 bg-cafe-beige mb-6"></div>
            <p className="text-lg md:text-xl text-cafe-cream max-w-2xl mx-auto font-light">
              Descubre nuestra selección de productos elaborados con ingredientes de primera calidad y preparados con pasión.
            </p>
          </div>
        </motion.div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-10"
          >
            <div className="flex flex-col items-center mb-8">
              <h2 className="text-3xl font-serif text-cafe-dark-brown mb-3">Explora Nuestras Categorías</h2>
              <p className="text-cafe-dark-brown opacity-80 max-w-2xl text-center mb-8">
                Ofrecemos alternativas vegetarianas, veganas y sin gluten. Todos nuestros productos son elaborados artesanalmente cada día.
              </p>
              
              <div className="flex justify-center mb-4">
                <button
                  onClick={() => setShowFeatured(!showFeatured)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors border ${
                    showFeatured
                      ? "bg-cafe-light-brown text-cafe-cream border-cafe-light-brown"
                      : "bg-transparent text-cafe-dark-brown border-cafe-dark-brown hover:bg-cafe-beige"
                  }`}
                >
                  {showFeatured ? "Mostrar todos" : "Destacados"}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-3 rounded-full text-sm md:text-base transition-colors flex items-center gap-2 ${
                    activeCategory === category
                      ? "bg-cafe-dark-brown text-cafe-cream shadow-md"
                      : "bg-cafe-beige text-cafe-dark-brown hover:bg-cafe-light-brown hover:text-cafe-cream"
                  }`}
                >
                  {getCategoryIcon(category)}
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            key={`${activeCategory}-${showFeatured}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-cafe-beige bg-opacity-30 py-6 px-8 border-b border-cafe-beige">
                <div className="flex items-center gap-3">
                  {getCategoryIcon(activeCategory)}
                  <h2 className="text-2xl font-serif text-cafe-dark-brown">{activeCategory}</h2>
                </div>
              </div>
              
              <div className="divide-y divide-cafe-beige divide-opacity-50">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <motion.div 
                      key={item.name} 
                      className="p-6 hover:bg-cafe-beige hover:bg-opacity-10 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-serif font-medium text-lg text-cafe-dark-brown flex items-center">
                          {item.name}
                          {item.featured && (
                            <span className="ml-2 bg-cafe-light-brown bg-opacity-20 text-cafe-light-brown text-xs py-0.5 px-2 rounded-full">
                              Popular
                            </span>
                          )}
                        </h3>
                        <span className="font-medium text-cafe-light-brown">{item.price}</span>
                      </div>
                      <p className="text-cafe-dark-brown opacity-80">{item.description}</p>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-cafe-dark-brown opacity-70">No hay elementos destacados en esta categoría.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 max-w-3xl mx-auto"
          >
            <div className="bg-cafe-beige bg-opacity-20 p-8 rounded-lg border border-cafe-beige border-opacity-30">
              <h3 className="text-xl font-serif mb-5 text-cafe-dark-brown border-b border-cafe-beige pb-3">Información Adicional</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-cafe-dark-brown">
                  <span className="text-cafe-light-brown shrink-0 bg-cafe-light-brown bg-opacity-10 p-1 rounded-full">•</span>
                  <span>Ofrecemos leches vegetales (avena, soja, almendra) con un suplemento de 0.30€.</span>
                </li>
                <li className="flex items-start gap-3 text-cafe-dark-brown">
                  <span className="text-cafe-light-brown shrink-0 bg-cafe-light-brown bg-opacity-10 p-1 rounded-full">•</span>
                  <span>Los precios incluyen IVA.</span>
                </li>
                <li className="flex items-start gap-3 text-cafe-dark-brown">
                  <span className="text-cafe-light-brown shrink-0 bg-cafe-light-brown bg-opacity-10 p-1 rounded-full">•</span>
                  <span>Si tienes alguna alergia o intolerancia, por favor infórmanos.</span>
                </li>
                <li className="flex items-start gap-3 text-cafe-dark-brown">
                  <span className="text-cafe-light-brown shrink-0 bg-cafe-light-brown bg-opacity-10 p-1 rounded-full">•</span>
                  <span>Pregunta por nuestra selección especial de cafés de temporada.</span>
                </li>
              </ul>
              
              <div className="mt-8 text-center">
                <p className="italic text-cafe-light-brown font-serif text-lg mb-4">"Nuestro café, cultivado de manera sostenible, es tostado artesanalmente para resaltar sus mejores notas"</p>
                <button className="cafe-button-primary mt-2">
                  ¿Necesitas un presupuesto para eventos?
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Menu;

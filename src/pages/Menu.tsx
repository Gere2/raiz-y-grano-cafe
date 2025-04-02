
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const menuData = {
  "Cafés": [
    { name: "Espresso", description: "Intenso y concentrado, base de todos nuestros cafés", price: "1.80€" },
    { name: "Americano", description: "Espresso con agua caliente", price: "2.00€" },
    { name: "Cortado", description: "Espresso con una pequeña cantidad de leche", price: "1.90€" },
    { name: "Café con leche", description: "Espresso con leche texturizada", price: "2.20€" },
    { name: "Cappuccino", description: "Espresso con leche texturizada y espuma de leche", price: "2.60€" },
    { name: "Flat White", description: "Espresso doble con leche texturizada", price: "2.90€" },
    { name: "Latte", description: "Espresso con abundante leche cremosa", price: "2.80€" },
    { name: "Pour Over", description: "Método de filtrado que resalta notas florales y afrutadas", price: "3.50€" },
    { name: "Aeropress", description: "Método de inmersión que produce un café limpio y equilibrado", price: "3.50€" },
    { name: "Cold Brew", description: "Café de extracción en frío (12h), suave y refrescante", price: "3.30€" },
  ],
  "Desayunos": [
    { name: "Tostada con AOVE", description: "Pan artesanal con aceite de oliva virgen extra", price: "2.50€" },
    { name: "Tostada con tomate", description: "Pan artesanal con tomate y AOVE", price: "2.80€" },
    { name: "Tostada con aguacate", description: "Pan artesanal con aguacate, tomate cherry y semillas", price: "4.50€" },
    { name: "Bowl de yogur", description: "Con granola casera, fruta fresca y miel", price: "4.90€" },
    { name: "Porridge", description: "Avena cocida con leche, canela y toppings a elegir", price: "4.20€" },
    { name: "Tostada francesa", description: "Con frutas del bosque y sirope de arce", price: "5.90€" },
  ],
  "Repostería Artesanal": [
    { name: "Carrot Cake", description: "Bizcocho de zanahoria con frosting de queso", price: "4.20€" },
    { name: "Cookies", description: "Galleta artesanal con chocolate belga", price: "2.30€" },
    { name: "Croissant", description: "Hojaldre artesanal elaborado con mantequilla francesa", price: "2.10€" },
    { name: "Brownie", description: "Con nueces y chocolate 70%", price: "3.50€" },
    { name: "Cinnamon Roll", description: "Rollito de canela con glaseado", price: "3.20€" },
    { name: "Banana Bread", description: "Pan de plátano con nueces", price: "3.00€" },
  ],
  "Bebidas Frías": [
    { name: "Limonada casera", description: "Con menta fresca y jengibre", price: "3.00€" },
    { name: "Zumo de naranja", description: "Recién exprimido", price: "3.20€" },
    { name: "Smoothie verde", description: "Espinacas, manzana, jengibre y limón", price: "4.50€" },
    { name: "Smoothie tropical", description: "Mango, piña, plátano y leche de coco", price: "4.50€" },
    { name: "Kombucha", description: "Bebida probiótica fermentada, varios sabores", price: "3.80€" },
  ],
  "Infusiones": [
    { name: "Té negro", description: "English Breakfast, Earl Grey", price: "2.20€" },
    { name: "Té verde", description: "Sencha, Jazmín", price: "2.20€" },
    { name: "Rooibos", description: "Sin teína, sabores variados", price: "2.20€" },
    { name: "Infusión de hierbas", description: "Manzanilla, Menta, Tila", price: "2.20€" },
    { name: "Chai Latte", description: "Té negro con especias y leche texturizada", price: "3.50€" },
    { name: "Matcha Latte", description: "Té verde matcha ceremonial con leche", price: "3.80€" },
  ]
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("Cafés");
  const categories = Object.keys(menuData);

  useEffect(() => {
    document.title = "Carta | Raíz y Grano";
  }, []);

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
            Nuestra Carta
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-cafe-dark-brown mb-12 max-w-2xl mx-auto"
          >
            Descubre nuestra selección de productos elaborados con ingredientes de primera calidad. Ofrecemos alternativas vegetarianas, veganas y sin gluten.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-10 flex flex-wrap justify-center gap-2"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm md:text-base transition-colors ${
                  activeCategory === category
                    ? "bg-cafe-dark-brown text-cafe-cream"
                    : "bg-cafe-beige text-cafe-dark-brown hover:bg-cafe-light-brown hover:text-cafe-cream"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8"
          >
            <h2 className="text-2xl font-serif mb-6 text-cafe-dark-brown text-center">{activeCategory}</h2>
            <div className="space-y-6">
              {menuData[activeCategory as keyof typeof menuData].map((item, index) => (
                <div 
                  key={item.name} 
                  className="border-b border-cafe-beige pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-serif font-medium text-cafe-dark-brown">{item.name}</h3>
                    <span className="font-medium text-cafe-light-brown">{item.price}</span>
                  </div>
                  <p className="text-sm text-cafe-dark-brown opacity-80">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 max-w-2xl mx-auto bg-cafe-beige bg-opacity-30 p-6 rounded-lg"
          >
            <h3 className="text-xl font-serif mb-4 text-cafe-dark-brown">Información Adicional</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-cafe-dark-brown">
                <span className="text-cafe-light-brown mt-1">•</span>
                <span>Ofrecemos leches vegetales (avena, soja, almendra) con un suplemento de 0.30€.</span>
              </li>
              <li className="flex items-start gap-2 text-cafe-dark-brown">
                <span className="text-cafe-light-brown mt-1">•</span>
                <span>Los precios incluyen IVA.</span>
              </li>
              <li className="flex items-start gap-2 text-cafe-dark-brown">
                <span className="text-cafe-light-brown mt-1">•</span>
                <span>Si tienes alguna alergia o intolerancia, por favor infórmanos.</span>
              </li>
              <li className="flex items-start gap-2 text-cafe-dark-brown">
                <span className="text-cafe-light-brown mt-1">•</span>
                <span>Pregunta por nuestra selección especial de cafés de temporada.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Menu;

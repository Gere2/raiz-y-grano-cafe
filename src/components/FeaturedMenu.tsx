
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const menuItems = [
  {
    category: "Cafés de Especialidad",
    items: [
      { name: "Espresso", description: "Intenso y concentrado, base de todos nuestros cafés", price: "1.80€" },
      { name: "Flat White", description: "Espresso doble con leche texturizada", price: "2.90€" },
      { name: "Pour Over", description: "Método de filtrado que resalta notas florales y afrutadas", price: "3.50€" },
    ]
  },
  {
    category: "Desayunos",
    items: [
      { name: "Tostada con AOVE", description: "Pan artesanal con aceite de oliva virgen extra", price: "2.50€" },
      { name: "Tostada con tomate", description: "Pan artesanal con tomate y AOVE", price: "2.80€" },
      { name: "Bowl de yogur", description: "Con granola casera, fruta fresca y miel", price: "4.90€" },
    ]
  },
  {
    category: "Repostería Artesanal",
    items: [
      { name: "Carrot Cake", description: "Bizcocho de zanahoria con frosting de queso", price: "4.20€" },
      { name: "Cookies", description: "Galleta artesanal con chocolate belga", price: "2.30€" },
      { name: "Croissant", description: "Hojaldre artesanal elaborado con mantequilla francesa", price: "2.10€" },
    ]
  }
];

const FeaturedMenu = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Nuestra Carta
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center max-w-2xl mx-auto mb-12 text-cafe-dark-brown"
        >
          Te presentamos una selección de nuestros productos destacados. Descubre sabores auténticos elaborados con ingredientes de primera calidad.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {menuItems.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-md"
            >
              <h3 className="font-serif text-xl text-center mb-6 text-cafe-dark-brown relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-0.5 after:bg-cafe-light-brown">
                {category.category}
              </h3>
              <div className="space-y-6">
                {category.items.map((item) => (
                  <div key={item.name} className="border-b border-cafe-beige pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-serif font-medium text-cafe-dark-brown">{item.name}</h4>
                      <span className="font-medium text-cafe-light-brown">{item.price}</span>
                    </div>
                    <p className="text-sm text-cafe-dark-brown opacity-80">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/carta" className="cafe-button-primary">
            Ver carta completa
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMenu;

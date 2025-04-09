
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Coffee, Leaf, Cookie, Droplet, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Interface for product details
interface ProductDetail {
  process?: string;
  origin?: string;
  notes?: string;
  pairing?: string;
}

// Enhanced menu data with additional information
const menuData = {
  "Cafés": [
    { 
      name: "Espresso", 
      description: "Intenso y concentrado, base de todos nuestros cafés", 
      price: "1.80€", 
      featured: true,
      details: {
        process: "Extracción a 9 bares de presión, 25-30 segundos",
        origin: "Blend de granos de Colombia y Etiopía",
        notes: "Cuerpo intenso, notas a chocolate negro y nuez",
        pairing: "Perfecto con nuestro brownie artesanal"
      }
    },
    { 
      name: "Americano", 
      description: "Espresso con agua caliente", 
      price: "2.00€",
      details: {
        process: "Espresso con agua a 85°C",
        origin: "Blend de granos de Colombia y Etiopía",
        notes: "Suave, acidez equilibrada, notas a caramelo",
      }
    },
    { 
      name: "Cortado", 
      description: "Espresso con una pequeña cantidad de leche", 
      price: "1.90€",
      details: {
        process: "Espresso con leche texturizada a 65°C",
        origin: "Blend de granos de Colombia y Etiopía",
        notes: "Equilibrado, notas dulces y cremosas"
      }
    },
    { 
      name: "Café con leche", 
      description: "Espresso con leche texturizada", 
      price: "2.20€", 
      featured: true,
      details: {
        process: "Espresso con leche texturizada a 65°C",
        origin: "Blend de granos de Colombia y Etiopía",
        notes: "Cremoso, notas a caramelo y vainilla"
      }
    },
    { 
      name: "Cappuccino", 
      description: "Espresso con leche texturizada y espuma de leche", 
      price: "2.60€", 
      featured: true,
      details: {
        process: "Espresso, leche texturizada y espuma en proporciones iguales",
        origin: "Blend de granos de Colombia y Etiopía",
        notes: "Aromático, equilibrio perfecto entre café y leche",
        pairing: "Ideal con nuestras cookies de chocolate"
      }
    },
    { 
      name: "Flat White", 
      description: "Espresso doble con leche texturizada", 
      price: "2.90€",
      details: {
        process: "Doble espresso con leche microespumada",
        origin: "Single origin de Colombia",
        notes: "Intenso pero suave, notas a caramelo y frutos secos"
      }
    },
    { 
      name: "Latte", 
      description: "Espresso con abundante leche cremosa", 
      price: "2.80€",
      details: {
        process: "Espresso con abundante leche texturizada",
        origin: "Blend de granos de Colombia y Etiopía",
        notes: "Suave, cremoso, con ligeras notas a vainilla"
      }
    },
    { 
      name: "Pour Over", 
      description: "Método de filtrado que resalta notas florales y afrutadas", 
      price: "3.50€", 
      featured: true,
      details: {
        process: "Filtrado por gravedad, extracción lenta (3-4 minutos)",
        origin: "Single origin de Etiopía, región Yirgacheffe",
        notes: "Floral, afrutado, con notas cítricas y a bayas",
        pairing: "Excelente con nuestra tarta de frutas"
      }
    },
    { 
      name: "Aeropress", 
      description: "Método de inmersión que produce un café limpio y equilibrado", 
      price: "3.50€",
      details: {
        process: "Inmersión y presión, extracción rápida (1-2 minutos)",
        origin: "Single origin de Guatemala, región Huehuetenango",
        notes: "Limpio, equilibrado, con notas a chocolate y frutos rojos"
      }
    },
    { 
      name: "Cold Brew", 
      description: "Café de extracción en frío (12h), suave y refrescante", 
      price: "3.30€", 
      featured: true,
      details: {
        process: "Extracción en frío durante 12-14 horas",
        origin: "Blend especial para Cold Brew (Brasil y Colombia)",
        notes: "Suave, bajo en acidez, notas a chocolate y nueces",
        pairing: "Perfecto con nuestro carrot cake"
      }
    },
  ],
  "Desayunos": [
    { 
      name: "Tostada con AOVE", 
      description: "Pan artesanal con aceite de oliva virgen extra", 
      price: "2.50€", 
      featured: true,
      details: {
        process: "Pan de masa madre tostado con AOVE ecológico",
        origin: "Pan de la panadería local 'El Horno', AOVE de Sierra de Segura",
        notes: "Crujiente por fuera, tierno por dentro, con el sabor frutado del aceite"
      }
    },
    { 
      name: "Tostada con tomate", 
      description: "Pan artesanal con tomate y AOVE", 
      price: "2.80€",
      details: {
        process: "Pan de masa madre con tomate rallado y AOVE",
        origin: "Tomates de temporada de huertas locales",
        notes: "Fresco, aromático, con el dulzor natural del tomate"
      }
    },
    { 
      name: "Tostada con aguacate", 
      description: "Pan artesanal con aguacate, tomate cherry y semillas", 
      price: "4.50€", 
      featured: true,
      details: {
        process: "Aguacate machacado con limón, sobre pan tostado",
        origin: "Aguacates de proximidad y semillas ecológicas",
        notes: "Cremoso, con un toque de limón y la textura de las semillas",
        pairing: "Combina perfectamente con nuestro Flat White"
      }
    },
    { 
      name: "Bowl de yogur", 
      description: "Con granola casera, fruta fresca y miel", 
      price: "4.90€", 
      featured: true,
      details: {
        process: "Yogur natural con granola tostada a baja temperatura y frutas de temporada",
        origin: "Yogur de granja local, frutas de temporada de proximidad",
        notes: "Cremoso, crujiente, con la dulzura natural de la fruta y la miel"
      }
    },
    { 
      name: "Porridge", 
      description: "Avena cocida con leche, canela y toppings a elegir", 
      price: "4.20€",
      details: {
        process: "Avena cocida lentamente con leche y especias",
        origin: "Avena ecológica, leche de producción local",
        notes: "Reconfortante, cremoso, con un toque de canela y vainilla"
      }
    },
    { 
      name: "Tostada francesa", 
      description: "Con frutas del bosque y sirope de arce", 
      price: "5.90€", 
      featured: true,
      details: {
        process: "Pan brioche remojado en huevo y leche, cocinado a la plancha",
        origin: "Pan brioche artesanal, frutas del bosque de proximidad",
        notes: "Suave, ligeramente dulce, con la acidez de las frutas",
        pairing: "Increíble con nuestro café filtro del día"
      }
    },
  ],
  "Repostería Artesanal": [
    { 
      name: "Carrot Cake", 
      description: "Bizcocho de zanahoria con frosting de queso", 
      price: "4.20€", 
      featured: true,
      details: {
        process: "Elaborado diariamente con zanahorias frescas y especias",
        origin: "Receta tradicional, con zanahorias de agricultura local",
        notes: "Húmedo, especiado, con la dulzura natural de la zanahoria",
        pairing: "Marida perfectamente con nuestro Cold Brew"
      }
    },
    { 
      name: "Cookies", 
      description: "Galleta artesanal con chocolate belga", 
      price: "2.30€", 
      featured: true,
      details: {
        process: "Horneadas diariamente, con chocolate 70% cacao",
        origin: "Chocolate de comercio justo, mantequilla local",
        notes: "Crujientes por fuera, tiernas por dentro, con trozos de chocolate fundente"
      }
    },
    { 
      name: "Croissant", 
      description: "Hojaldre artesanal elaborado con mantequilla francesa", 
      price: "2.10€",
      details: {
        process: "Fermentación lenta (24h) y horneado diario",
        origin: "Elaborados con mantequilla AOP de Francia",
        notes: "Crujiente, con capas definidas y sabor a mantequilla"
      }
    },
    { 
      name: "Brownie", 
      description: "Con nueces y chocolate 70%", 
      price: "3.50€", 
      featured: true,
      details: {
        process: "Horneado a baja temperatura para preservar la humedad",
        origin: "Chocolate de origen único y nueces seleccionadas",
        notes: "Intenso sabor a chocolate, húmedo, con la textura de las nueces",
        pairing: "Sublime con nuestro espresso"
      }
    },
    { 
      name: "Cinnamon Roll", 
      description: "Rollito de canela con glaseado", 
      price: "3.20€",
      details: {
        process: "Masa brioche fermentada lentamente, con canela de Ceilán",
        origin: "Receta tradicional escandinava adaptada",
        notes: "Tierno, aromático, con un toque equilibrado de dulzor"
      }
    },
    { 
      name: "Banana Bread", 
      description: "Pan de plátano con nueces", 
      price: "3.00€",
      details: {
        process: "Elaborado con plátanos maduros para máximo sabor",
        origin: "Plátanos de comercio justo y nueces nacionales",
        notes: "Húmedo, aromático, con notas a plátano caramelizado"
      }
    },
  ],
  "Bebidas Frías": [
    { 
      name: "Limonada casera", 
      description: "Con menta fresca y jengibre", 
      price: "3.00€", 
      featured: true,
      details: {
        process: "Limones exprimidos al momento, con menta y jengibre macerados",
        origin: "Limones y menta de cultivo ecológico",
        notes: "Refrescante, cítrica, con un toque picante del jengibre"
      }
    },
    { 
      name: "Zumo de naranja", 
      description: "Recién exprimido", 
      price: "3.20€", 
      featured: true,
      details: {
        process: "Exprimido al momento, sin azúcares añadidos",
        origin: "Naranjas de temporada de Valencia",
        notes: "Dulce natural, cítrico, con la pulpa justa"
      }
    },
    { 
      name: "Smoothie verde", 
      description: "Espinacas, manzana, jengibre y limón", 
      price: "4.50€",
      details: {
        process: "Batido lentamente para preservar nutrientes",
        origin: "Vegetales y frutas de agricultura ecológica",
        notes: "Refrescante, con un equilibrio entre lo dulce y lo herbáceo"
      }
    },
    { 
      name: "Smoothie tropical", 
      description: "Mango, piña, plátano y leche de coco", 
      price: "4.50€", 
      featured: true,
      details: {
        process: "Frutas maduradas naturalmente, batidas con leche de coco",
        origin: "Frutas de comercio justo",
        notes: "Cremoso, dulce natural, con notas tropicales",
        pairing: "Genial con nuestro croissant"
      }
    },
    { 
      name: "Kombucha", 
      description: "Bebida probiótica fermentada, varios sabores", 
      price: "3.80€",
      details: {
        process: "Fermentación natural (10-14 días)",
        origin: "Elaboración artesanal local",
        notes: "Burbujeante, ligeramente ácida, refrescante"
      }
    },
  ],
  "Infusiones": [
    { 
      name: "Té negro", 
      description: "English Breakfast, Earl Grey", 
      price: "2.20€",
      details: {
        process: "Infusionado 3-4 minutos a 95°C",
        origin: "Blend de tés de la India y Sri Lanka",
        notes: "Intenso, aromático, con cuerpo y astringencia equilibrada"
      }
    },
    { 
      name: "Té verde", 
      description: "Sencha, Jazmín", 
      price: "2.20€", 
      featured: true,
      details: {
        process: "Infusionado 2 minutos a 80°C",
        origin: "Japón (Sencha) y China (Jazmín)",
        notes: "Fresco, vegetal, con notas florales en el caso del jazmín"
      }
    },
    { 
      name: "Rooibos", 
      description: "Sin teína, sabores variados", 
      price: "2.20€",
      details: {
        process: "Infusionado 5-6 minutos a 100°C",
        origin: "Sudáfrica, región de Cederberg",
        notes: "Dulce natural, con notas a vainilla y madera"
      }
    },
    { 
      name: "Infusión de hierbas", 
      description: "Manzanilla, Menta, Tila", 
      price: "2.20€", 
      featured: true,
      details: {
        process: "Infusionado 5 minutos a 100°C",
        origin: "Hierbas recolectadas de cultivos ecológicos",
        notes: "Aromáticas, relajantes, con propiedades digestivas"
      }
    },
    { 
      name: "Chai Latte", 
      description: "Té negro con especias y leche texturizada", 
      price: "3.50€", 
      featured: true,
      details: {
        process: "Té negro infusionado con especias, mezclado con leche texturizada",
        origin: "Blend de especias tradicionales de la India",
        notes: "Especiado, cremoso, con notas a canela y cardamomo",
        pairing: "Perfecto con nuestras cookies"
      }
    },
    { 
      name: "Matcha Latte", 
      description: "Té verde matcha ceremonial con leche", 
      price: "3.80€",
      details: {
        process: "Matcha ceremonial batido a mano, con leche texturizada",
        origin: "Matcha de grado ceremonial de Japón",
        notes: "Intenso sabor umami, cremoso, con ligeramente dulce"
      }
    },
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
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    document.title = "Carta | Raíz y Grano";
  }, []);

  const filteredItems = showFeatured 
    ? menuData[activeCategory as keyof typeof menuData].filter(item => item.featured) 
    : menuData[activeCategory as keyof typeof menuData];

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Layout>
      <motion.div 
        className="py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative mb-16 overflow-hidden rounded-xl shadow-lg">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-cafe-dark-brown/80 to-cafe-dark-brown/60"
            style={{
              backgroundImage: "url('/lovable-uploads/649eac4b-afe2-4360-9252-bede9f39acc3.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "multiply",
            }}
          ></div>
          <div className="relative py-24 flex flex-col items-center justify-center text-center px-4 z-10">
            <motion.h1 
              className="text-5xl md:text-6xl font-serif text-cafe-cream mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Nuestra Carta
            </motion.h1>
            <div className="w-24 h-1 bg-cafe-beige mb-6"></div>
            <motion.p 
              className="text-lg md:text-xl text-cafe-cream max-w-2xl mx-auto font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Descubre nuestra selección de productos elaborados con ingredientes de primera calidad y preparados con pasión.
            </motion.p>
          </div>
        </div>

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
              
              <div className="flex justify-center mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFeatured(!showFeatured)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors border ${
                    showFeatured
                      ? "bg-cafe-light-brown text-cafe-cream border-cafe-light-brown"
                      : "bg-transparent text-cafe-dark-brown border-cafe-dark-brown hover:bg-cafe-beige"
                  }`}
                >
                  {showFeatured ? "Mostrar todos" : "Destacados"}
                </motion.button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-3 rounded-full text-sm md:text-base transition-colors flex items-center gap-2 ${
                    activeCategory === category
                      ? "bg-cafe-dark-brown text-cafe-cream shadow-md"
                      : "bg-cafe-beige text-cafe-dark-brown hover:bg-cafe-light-brown hover:text-cafe-cream"
                  }`}
                >
                  {getCategoryIcon(category)}
                  {category}
                </motion.button>
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
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-cafe-beige">
              <div className="bg-cafe-cream bg-opacity-70 py-6 px-8 border-b border-cafe-beige">
                <div className="flex items-center gap-3">
                  {getCategoryIcon(activeCategory)}
                  <h2 className="text-2xl font-serif text-cafe-dark-brown">{activeCategory}</h2>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <motion.div 
                      key={item.name} 
                      className="bg-white p-5 rounded-lg border border-cafe-beige hover:shadow-md transition-all cursor-pointer"
                      variants={fadeInUpVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleProductClick(item)}
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
                      <p className="text-cafe-dark-brown opacity-80 mb-3">{item.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-cafe-dark-brown/60 italic">
                          {item.details?.origin && `Origen: ${item.details.origin.split(',')[0].trim()}`}
                        </span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="text-cafe-light-brown hover:text-cafe-dark-brown transition-colors flex items-center text-sm">
                                <Info size={16} className="mr-1" />
                                <span>Detalles</span>
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Click para ver más información</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full p-8 text-center">
                    <p className="text-cafe-dark-brown opacity-70 italic">No hay elementos destacados en esta categoría.</p>
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
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cafe-button-primary mt-2"
                >
                  ¿Necesitas un presupuesto para eventos?
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-cafe-cream sm:max-w-md">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-serif text-cafe-dark-brown flex items-center justify-between">
                  {selectedProduct.name}
                  <span className="text-cafe-light-brown font-normal">{selectedProduct.price}</span>
                </DialogTitle>
                <DialogDescription className="text-cafe-dark-brown opacity-90">
                  {selectedProduct.description}
                </DialogDescription>
              </DialogHeader>
              
              {selectedProduct.details && (
                <div className="space-y-4 mt-2">
                  {selectedProduct.details.process && (
                    <div>
                      <h4 className="text-sm font-medium text-cafe-dark-brown mb-1">Elaboración</h4>
                      <p className="text-sm text-cafe-dark-brown/80">{selectedProduct.details.process}</p>
                    </div>
                  )}
                  
                  {selectedProduct.details.origin && (
                    <div>
                      <h4 className="text-sm font-medium text-cafe-dark-brown mb-1">Origen</h4>
                      <p className="text-sm text-cafe-dark-brown/80">{selectedProduct.details.origin}</p>
                    </div>
                  )}
                  
                  {selectedProduct.details.notes && (
                    <div>
                      <h4 className="text-sm font-medium text-cafe-dark-brown mb-1">Notas de Sabor</h4>
                      <p className="text-sm text-cafe-dark-brown/80">{selectedProduct.details.notes}</p>
                    </div>
                  )}
                  
                  {selectedProduct.details.pairing && (
                    <div>
                      <h4 className="text-sm font-medium text-cafe-dark-brown mb-1">Maridaje Recomendado</h4>
                      <p className="text-sm text-cafe-dark-brown/80">{selectedProduct.details.pairing}</p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Menu;


import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselImage {
  src: string;
  alt: string;
}

const HomeCarousel = () => {
  const images: CarouselImage[] = [
    { src: "/lovable-uploads/649eac4b-afe2-4360-9252-bede9f39acc3.png", alt: "Café con croissant" },
    { src: "/lovable-uploads/f53365f0-b667-4808-a863-b2fb6e913df5.png", alt: "Preparando café" },
    { src: "/lovable-uploads/70f57454-a1cc-4f06-8701-b76528b28713.png", alt: "Café sobre libro" },
    { src: "/lovable-uploads/45e4d764-6d51-4440-be8f-5673c5ac5fe2.png", alt: "Mujer con trigo" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    let interval: number;
    
    if (isAutoplay) {
      interval = window.setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoplay, images.length]);

  const handleNext = () => {
    setIsAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setIsAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoplay(false);
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${images[currentIndex].src})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full transition duration-300 z-10"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full transition duration-300 z-10"
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-white scale-110' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeCarousel;

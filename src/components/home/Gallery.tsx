import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Import images
import img1 from '@/assets/images/photo_2025-09-21 10.17.30.jpeg';
import img2 from '@/assets/images/photo_2025-09-21 10.18.04.jpeg';
import img3 from '@/assets/images/photo_2025-09-21 10.18.56.jpeg';
import img4 from '@/assets/images/photo_2025-09-21 10.19.54.jpeg';
import img5 from '@/assets/images/photo_2025-09-21 10.20.02.jpeg';
import img6 from '@/assets/images/photo_2025-09-21 10.20.14.jpeg';
import img7 from '@/assets/images/photo_2025-09-21 10.20.25.jpeg';

const Gallery = () => {
    // Function to shuffle array
  const shuffleArray = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Initialize with all images
  const allImages = [img1, img2, img3, img4, img5, img6, img7];
  
  // State for shuffled images
  const [images, setImages] = useState<string[]>([]);
  
  // Shuffle images on component mount and set up auto-play
  useEffect(() => {
    setImages(shuffleArray(allImages));
    
    // Start with auto-play enabled
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % allImages.length);
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Handle auto-play with pause on hover
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % (images.length || 1));
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, images.length]);

  return (
    <div className="bg-primary py-8 sm:py-12 w-full min-h-[80vh] flex items-center justify-center"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <div className="w-full max-w-[100vw] sm:max-w-full sm:px-6">
        <div className="relative w-full max-w-6xl mx-auto">
        
          <div className="max-w-6xl mx-auto h-full">
            {/* Main Image */}
            <div 
              className="w-full flex items-center justify-center bg-black/10 relative group h-[70vh] md:h-[60vh]"
              onMouseEnter={() => setIsAutoPlay(false)}
              onMouseLeave={() => setIsAutoPlay(true)}
            >
              {images.length > 0 ? (
                <img
                  src={images[currentIndex]}
                  alt={`Gallery ${currentIndex + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-500 max-w-none"
                  onLoad={() => setIsLoading(false)}
                  style={{ opacity: isLoading ? 0 : 1 }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-pulse text-white/50">Loading gallery...</div>
                </div>
              )}
            </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 md:p-2 rounded-full focus:outline-none transition-all duration-200"
            aria-label="Previous image"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 md:p-2 rounded-full focus:outline-none transition-all duration-200"
            aria-label="Next image"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
          
          {/* Dots Indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Thumbnails */}
        <div 
          className="hidden sm:flex justify-center mt-6 space-x-2"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentIndex ? 'border-amber-400' : 'border-transparent'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);
};

export default Gallery;

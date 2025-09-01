import React, { useRef, useEffect, useState } from 'react';
import telegramPostsData from './telegramPosts.json'; // Import the JSON data

const TelegramPostsGallery: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const postWidth = 320;

  const [telegramPosts, setTelegramPosts] = useState<string[]>([]); // Store the URLs in state

  useEffect(() => {
    const carousel = carouselRef.current;
    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;

    if (!carousel || !prevBtn || !nextBtn) {
      return;
    }

    const handleNextClick = () => {
      carousel.scrollBy({ left: postWidth, behavior: 'smooth' });
    };

    const handlePrevClick = () => {
      carousel.scrollBy({ left: -postWidth, behavior: 'smooth' });
    };

    const handleScroll = () => {
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;

      if (carousel.scrollLeft <= 0) {
        prevBtn.classList.add('opacity-50');
      } else {
        prevBtn.classList.remove('opacity-50');
      }

      if (carousel.scrollLeft >= maxScroll) {
        nextBtn.classList.add('opacity-50');
      } else {
        nextBtn.classList.remove('opacity-50');
      }
    };

    nextBtn.addEventListener('click', handleNextClick);
    prevBtn.addEventListener('click', handlePrevClick);
    carousel.addEventListener('scroll', handleScroll);

    // Initialize button state
    handleScroll();

    return () => {
      nextBtn.removeEventListener('click', handleNextClick);
      prevBtn.removeEventListener('click', handlePrevClick);
      carousel.removeEventListener('scroll', handleScroll);
    };
  }, []);


  useEffect(() => {
    // Load Telegram posts from the JSON file
    setTelegramPosts(telegramPostsData);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Мой Telegram канал
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Следите за новостями в мире компьютерного зрения
          </p>
        </div>
        <div className="relative max-w-6xl mx-auto">
          <button
            ref={prevBtnRef}
            id="prevBtn"
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-8 z-10 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition"
          >
            <i className="fas fa-chevron-left text-gray-700"></i>
          </button>

          <button
            ref={nextBtnRef}
            id="nextBtn"
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-8 z-10 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition"
          >
            <i className="fas fa-chevron-right text-gray-700"></i>
          </button>

          <div
            ref={carouselRef}
            className="carousel-container overflow-x-auto whitespace-nowrap py-4 px-2 scroll-smooth"
            id="carousel"
          >
            {telegramPosts.map((postUrl, index) => (
              <div className="inline-block w-80 mx-2 telegram-post" key={index}>
                <div className="iframe-wrapper">
                  <iframe
                    scrolling="no"
                    src={postUrl}
                    title={`Telegram Post ${index + 1}`}
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelegramPostsGallery;

import Swiper from 'swiper';
import { EffectFade, Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

// Function to initialize the Swiper instance
function initializeSwiper() {
  new Swiper('.swiper', {
    modules: [Navigation, Pagination, EffectFade, Autoplay],
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: 7000,
      disableOnInteraction: true, // Keeps autoplay running after user interaction
    },
    speed: 1000,
  });
}

// Initialize Swiper when the DOM is ready
document.addEventListener('DOMContentLoaded', initializeSwiper);

// Re-initialize Swiper after Astro transitions (useful for Astro’s view transitions)
document.addEventListener('astro:after-swap', () => {
  initializeSwiper();
});
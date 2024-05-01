const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

// Buttons
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// Counter
let counter = 0;
const size = carouselImages[0].clientWidth;

// Move carousel to the next slide
function nextSlide() {
    if (counter >= carouselImages.length - 1) {
        carouselSlide.style.transition = 'none';
        counter = 0;
        carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    } else {
        counter++;
        carouselSlide.style.transition = 'transform 0.5s ease-in-out';
        carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    }
}

// Move carousel to the previous slide
function prevSlide() {
    if (counter <= 0) {
        carouselSlide.style.transition = 'none';
        counter = carouselImages.length - 1;
        carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    } else {
        counter--;
        carouselSlide.style.transition = 'transform 0.5s ease-in-out';
        carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    }
}

// Button event listeners
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Automatic slide
setInterval(nextSlide, 5000); // Change slide every 3 seconds

var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true, // Loop the slider
    autoplay: {
        delay: 3000, // Slide change interval (ms)
        disableOnInteraction: false, // Continue autoplay even if user interacts with slider
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});


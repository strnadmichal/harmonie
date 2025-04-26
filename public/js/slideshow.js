// Seznam obrázků
const images = [
  "../img/uvod/1.jpg",
  "../img/uvod/2.jpg",
  "../img/uvod/3.jpg",
  "../img/uvod/4.jpg",
  "../img/uvod/5.jpg",
];

let currentIndex = 0;
const slide1 = document.getElementById("slide1");
const slide2 = document.getElementById("slide2");
let activeSlide = slide1;
let inactiveSlide = slide2;

// Funkce pro změnu pozadí
function changeBackground() {
  currentIndex = (currentIndex + 1) % images.length;
  
  // Set new image on inactive slide
  inactiveSlide.style.backgroundImage = `url('${images[currentIndex]}')`;
  
  // Fade in inactive slide
  inactiveSlide.style.opacity = '1';
  activeSlide.style.opacity = '0';
  
  // Swap active/inactive slides
  [activeSlide, inactiveSlide] = [inactiveSlide, activeSlide];
}

// Spuštění každých 5 sekund
setInterval(changeBackground, 5000);

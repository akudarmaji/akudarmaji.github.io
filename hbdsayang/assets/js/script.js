// Siwper JS
const audio = new Audio("./audio/ultah.mp3");
const buttons = document.querySelector(".card-button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    audio.play();
  });
});


let swiperCard = new Swiper(".card-content", {
  loop: true,
  spaceBetween: 32,
  grabCursor: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    600: { slidesPerView: 2 },
    968: { slidesPerView: 3 },
  },
});

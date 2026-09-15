const swFestival = new Swiper(".sw-festival", {
  loop: true,
  slidesPerView: 3.5,
  slidesPerGroup: 1,
  spaceBetween: 32,
  //   centeredSlides: true,
  pagination: {
    el: ".festival .pagination .swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".festival-next-btn",
    prevEl: ".festival-prev-btn",
  },
});

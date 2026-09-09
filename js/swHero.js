const mainVisualBg = document.querySelector(
  ".hero .main-visual .main-visual-bg",
);
// console.log(mainVisualBg);
const heroBtns = document.querySelectorAll(".visual-inner .sw-hero-btn");
// console.log(heroBtns);
const playStopBtn = document.querySelector(
  ".sw-hero .pagination .play-stop-btn",
);
// console.log(playStopBtn);

// 히어로 슬라이드 버튼 호버 인터랙션
heroBtns.forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    btn.querySelector(".off").style.opacity = 1;
  });
  btn.addEventListener("mouseleave", () => {
    btn.querySelector(".off").style.opacity = 0;
  });
});

// 스와이퍼 설정
const swHero = new Swiper(".sw-hero", {
  speed: 1000,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".hero-next-btn",
    prevEl: ".hero-prev-btn",
  },

  on: {
    slideChangeTransitionStart: function (swiper) {
      // const activeSilde = swiper.activeIndex + 1;
      // console.log(activeSilde);
      // mainVisualBg.style.backgroundImage = `url(assets/images/slide_${activeSilde}.png)`;
      const activeSlide = swiper.slides[swiper.activeIndex];
      // console.log(activeSlide);
      const activeSlideImgUrl =
        activeSlide.querySelector(".slide-image img").src;
      // console.log(activeSlideImg.src);
      mainVisualBg.style.backgroundImage = `url(${activeSlideImgUrl})`;
    },
  },
});

// 재생, 정지 버튼
playStopBtn.addEventListener("click", () => {
  // console.log("슬라이드 자동재생 정지");

  const isRunning = swHero.autoplay.running;
  // console.log(isRunning);

  if (isRunning) {
    swHero.autoplay.stop();
    console.log("자동재생 정지");
    playStopBtn.style.backgroundImage = `url(assets/icons/slide_play.png)`;
    playStopBtn.textContent = "재생";
  } else {
    swHero.autoplay.start();
    console.log("자동재생 시작");
    playStopBtn.style.backgroundImage = `url(assets/icons/slide_stop.png)`;
    playStopBtn.textContent = "정지";
  }
});

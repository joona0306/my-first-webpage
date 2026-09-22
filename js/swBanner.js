// 1. 배너 영역에서 사용할 HTML 요소 선택
// 배너 영역 전체
const bannerSection = document.querySelector(".banner");
// Swiper를 적용할 슬라이더 컨테이너
const bannerContainer = bannerSection.querySelector(".sw-banner");
// JSON 데이터를 바탕으로 만든 swiper-slide 요소들을 넣을 공간
const bannerWrapper = bannerContainer.querySelector(".swiper-wrapper");
// 이전, 다음, 페이지 번호, 정지 버튼을 감싸는 영역
const bannerControls = bannerSection.querySelector(".pagination");
// 재생, 정지 버튼
const bannerPlayStopBtn = bannerSection.querySelector(".play-stop-btn");

// 2. JSON 파일에서 배너 데이터 불러오기
async function fetchBanners() {
  const response = await fetch("data/banner.json");

  if (!response.ok) {
    // 이 오류는 loadBanners() 의 catch에서 처리
    throw new Error(`배너 요청 실패: ${response.status}`);
  }

  // 응답 본문을 읽고 JSON을 javascript 데이터로 변환
  const banners = await response.json();

  return banners;
}

// 3. map()과 템플릿 문자열로 배너 HTML 생성
function renderBanners(banners) {
  const bannerHTML = banners
    .map((banner) => {
      return `
        <div class="swiper-slide">
          <a href="#">
            <img
              src="${banner.bannerImg}"
              alt="${banner.bannerTitle}"
            />
            <div class="text-wrap">
              <span class="desc">${banner.desc}</span>
              <strong>${banner.bannerTitle}</strong>
              <div class="link-btn">
                <span>${banner.linkLabel}</span>
                <img
                  src="assets/icons/icon_link.png"
                  alt="바로가기 아이콘"
                />
              </div>
            </div>
          </a>
        </div>
        `;
    })
    .join("");

  bannerWrapper.innerHTML = bannerHTML;
}

// 4. 생성된 배너에 Swiper 적용
function initBannerSwiper() {
  const swBanner = new Swiper(bannerContainer, {
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: bannerControls.querySelector(".swiper-pagination"),
      type: "fraction",
    },
    navigation: {
      nextEl: bannerControls.querySelector(".banner-next-btn"),
      prevEl: bannerControls.querySelector(".banner-prev-btn"),
    },
  });

  // 재생, 정지 버튼
  bannerPlayStopBtn.addEventListener("click", () => {
    // console.log("슬라이드 자동재생 정지");

    const isRunning = swBanner.autoplay.running;
    // console.log(isRunning);

    if (isRunning) {
      swBanner.autoplay.stop();
      //   console.log("자동재생 정지");
      bannerPlayStopBtn.style.backgroundImage = `url(assets/icons/slide_play_bk.png)`;
      bannerPlayStopBtn.textContent = "재생";
    } else {
      swBanner.autoplay.start();
      //   console.log("자동재생 시작");
      bannerPlayStopBtn.style.backgroundImage = `url(assets/icons/slide_stop_bk.png)`;
      bannerPlayStopBtn.textContent = "정지";
    }
  });
}

// 5. 전체 작업을 순서대로 실행
async function loadBanners() {
  try {
    const banners = await fetchBanners();

    // 배열은 정상적으로 받았지만 항목이 없는 경우를 처리
    if (banners.length === 0) {
      return;
    }

    // 배너 데이터를 HTML로 만들어서 화면에 넣음
    renderBanners(banners);
    // Swiper 초기화
    initBannerSwiper();
  } catch (error) {
    console.log(`배너 로딩 오류: ${error}`);
  }
}

loadBanners();

const sliders = {
  location: document.getElementById("location-slider"),
  exhibition: document.getElementById("exhibition-slider"),
  movie: document.getElementById("movie-slider"),
  experience: document.getElementById("experience-slider"),
  artists: document.getElementById("artists-slider"),
  retail: document.getElementById("retail-slider"),
};

// 각 섹션별 이미지 경로 배열 정의
const images = {
  location: [
    "../images/LOCATION/IMG_0074.png",
    "../images/LOCATION/IMG_0074-1.png",
    "../images/LOCATION/IMG_0074-2.png",
    "../images/LOCATION/IMG_0074-3.png",
    "../images/LOCATION/IMG_0074-4.png",
    "../images/LOCATION/IMG_0074-5.png",
    "../images/LOCATION/IMG_0074-6.png",
    "../images/LOCATION/IMG_0081.png",
    "../images/LOCATION/IMG_0084.png",
  ],
  exhibition: [
    "../images/01_the_exhibition/IMG_0074.png",
    "../images/01_the_exhibition/IMG_0074-1.png",
    "../images/01_the_exhibition/IMG_0074-2.png",
    "../images/01_the_exhibition/IMG_0074-3.png",
    "../images/01_the_exhibition/IMG_0074-4.png",
    "../images/01_the_exhibition/IMG_0074-5.png",
    "../images/01_the_exhibition/IMG_0074-6.png",
    "../images/01_the_exhibition/IMG_0074-7.png",
    "../images/01_the_exhibition/IMG_0074-8.png",
    "../images/01_the_exhibition/IMG_0074-9.png",
    "../images/01_the_exhibition/IMG_0081.png",
    "../images/01_the_exhibition/IMG_0084.png",
  ],
  movie: [
    "../images/02_the_movie/IMG_0206.png",
    "../images/02_the_movie/IMG_0207.png",
    "../images/02_the_movie/IMG_0218.png",
    "../images/02_the_movie/IMG_0220.png",
    "../images/02_the_movie/IMG_0222.png",
    "../images/02_the_movie/IMG_0223.png",
    "../images/02_the_movie/IMG_0229.png",
    "../images/02_the_movie/IMG_0239.png",
    "../images/02_the_movie/IMG_0242.png",
    "../images/02_the_movie/IMG_0248.png",
  ],
  experience: [
    "../images/03_the_experience/IMG_0259.png",
    "../images/03_the_experience/IMG_0289.png",
    "../images/03_the_experience/IMG_0307.png",
    "../images/03_the_experience/IMG_0317.png",
    "../images/03_the_experience/IMG_0342.png",
    "../images/03_the_experience/IMG_0371.png",
    "../images/03_the_experience/IMG_0378.png",
    "../images/03_the_experience/IMG_0394.png",
    "../images/03_the_experience/IMG_0398.png",
    "../images/03_the_experience/IMG_0405.png",
    "../images/03_the_experience/IMG_0407.png",
    "../images/03_the_experience/IMG_0409.png",
  ],
  artists: [
    "../images/04_Artist_Visits/IMG_0074.png",
    "../images/04_Artist_Visits/IMG_0074-1.png",
    "../images/04_Artist_Visits/IMG_0074-2.png",
    "../images/04_Artist_Visits/IMG_0074-3.png",
    "../images/04_Artist_Visits/IMG_0074-4.png",
    "../images/04_Artist_Visits/IMG_0074-5.png",
    "../images/04_Artist_Visits/IMG_0074-6.png",
    "../images/04_Artist_Visits/IMG_0074-7.png",
    "../images/04_Artist_Visits/IMG_0074-8.png",
    "../images/04_Artist_Visits/IMG_0074-9.png",
    "../images/04_Artist_Visits/IMG_0074-10.png",
    "../images/04_Artist_Visits/IMG_0074-11.png",
    "../images/04_Artist_Visits/IMG_0074-12.png",
    "../images/04_Artist_Visits/IMG_0074-13.png",
    "../images/04_Artist_Visits/IMG_0074-14.png",
    "../images/04_Artist_Visits/IMG_0074-15.png",
    "../images/04_Artist_Visits/IMG_0074-16.png",
    "../images/04_Artist_Visits/IMG_0074-17.png",
    "../images/04_Artist_Visits/IMG_0074-18.png",
    "../images/04_Artist_Visits/IMG_0081.png",
    "../images/04_Artist_Visits/IMG_0084.png",
  ],
  retail: [
    "../images/05_the_retail/IMG_0410.png",
    "../images/05_the_retail/IMG_0414.png",
    "../images/05_the_retail/IMG_0419.png",
    "../images/05_the_retail/IMG_0430.png",
    "../images/05_the_retail/IMG_0435.png",
    "../images/05_the_retail/IMG_0441.png",
    "../images/05_the_retail/IMG_0445.png",
    "../images/05_the_retail/IMG_0449.png",
    "../images/05_the_retail/IMG_0457.png",
    "../images/05_the_retail/IMG_0463.png",
    "../images/05_the_retail/IMG_0492.png",
    "../images/05_the_retail/IMG_0496.png",
    "../images/05_the_retail/IMG_0498.png",
    "../images/05_the_retail/IMG_0500.png",
  ],
};

// 각 슬라이더에 이미지 동적 생성
Object.keys(sliders).forEach((key) => {
  images[key].forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "scroll-item";
    img.alt = `Slide Image for ${key}`;
    sliders[key].appendChild(img);
  });

  // 페이지 인디케이터 초기화
  updatePageIndicator(key);

  // 슬라이더의 스크롤 이벤트 리스너 추가
  sliders[key].addEventListener("scroll", () => {
    updatePageIndicator(key);
  });
});

// 슬라이드 이동 함수
function slide(section, direction) {
  const slider = sliders[section];
  if (!slider.querySelector("img")) return;

  const imageWidth = slider.querySelector(".scroll-item").clientWidth + 20; // 이미지 너비 + 마진
  const groupSize = 3; // 그룹당 보여줄 이미지 수
  const currentPage = Math.round(slider.scrollLeft / (imageWidth * groupSize)); // 현재 페이지

  // 전체 페이지 수
  const totalPages = Math.ceil(images[section].length / groupSize);
  let newPage = currentPage + direction;

  if (newPage >= totalPages) {
    newPage = 0; // 첫 페이지로 이동
  } else if (newPage < 0) {
    newPage = totalPages - 1; // 마지막 페이지로 이동
  }

  slider.scrollTo({
    left: newPage * imageWidth * groupSize,
    behavior: "smooth",
  });

  updatePageIndicator(section); // 페이지 인디케이터 즉시 업데이트
}

// 페이지 인디케이터 업데이트 함수
function updatePageIndicator(section) {
  const slider = sliders[section];
  if (!slider.querySelector("img")) return;

  const imageWidth = slider.querySelector(".scroll-item").clientWidth + 20; // 이미지 너비 + 마진
  const totalImages = images[section].length;

  // 한 페이지에 표시할 슬라이드 수
  const groupSize = 3;
  const totalGroups = Math.ceil(totalImages / groupSize);

  // 현재 페이지 계산
  const currentPage =
    Math.round(slider.scrollLeft / (imageWidth * groupSize)) + 1;

  // 페이지 인디케이터 업데이트
  const pageIndicator = document.getElementById(`${section}-page-indicator`);
  pageIndicator.querySelector(".current-page").textContent = `${currentPage}`;
  pageIndicator.querySelector(".total-pages").textContent = `${totalGroups}`;
}

// 초기 로드 및 화면 크기 변경 시 페이지 인디케이터 설정
window.addEventListener("resize", () => adjustPageIndicators());
window.addEventListener("load", () => adjustPageIndicators());

function adjustPageIndicators() {
  Object.keys(sliders).forEach((key) => {
    const pageIndicator = document.getElementById(`${key}-page-indicator`);
    const groupSize = 3;
    const totalPages = Math.ceil(images[key].length / groupSize);
    pageIndicator.querySelector(".total-pages").textContent = `${totalPages}`;
  });
}

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

// 슬라이더 초기화
Object.keys(sliders).forEach((key) => {
  const slider = sliders[key];
  const imageList = images[key];
  const groupSize = getGroupSize();

  if (groupSize === 1) {
    initializeInfiniteSlider(slider, imageList, key);
  } else {
    initializeRegularSlider(slider, imageList, key);
  }

  updatePageIndicator(key);

  // 반응형 슬라이더 재설정
  slider.addEventListener("scroll", () => {
    debounce(() => updatePageIndicator(key), 100);
  });
});

// 무한 모드 슬라이더 초기화 함수
function initializeInfiniteSlider(slider, imageList, key) {
  const lastImage = document.createElement("img");
  lastImage.src = imageList[imageList.length - 1];
  lastImage.className = "scroll-item clone";
  lastImage.alt = `Clone of Last Image for ${key}`;
  slider.appendChild(lastImage);

  imageList.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "scroll-item";
    img.alt = `Slide Image for ${key}`;
    slider.appendChild(img);
  });

  const firstImage = document.createElement("img");
  firstImage.src = imageList[0];
  firstImage.className = "scroll-item clone";
  firstImage.alt = `Clone of First Image for ${key}`;
  slider.appendChild(firstImage);

  setTimeout(() => {
    slider.scrollLeft = slider.querySelector(".scroll-item").clientWidth;
  }, 0);

  slider.addEventListener("scroll", () => handleInfiniteScroll(slider));
}

// 일반 모드 슬라이더 초기화 함수
function initializeRegularSlider(slider, imageList, key) {
  imageList.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "scroll-item";
    img.alt = `Slide Image for ${key}`;
    slider.appendChild(img);
  });
}

// 무한 스크롤 핸들링 함수
function handleInfiniteScroll(slider) {
  const scrollItems = slider.querySelectorAll(".scroll-item");
  const firstItemWidth = scrollItems[0].clientWidth;
  const totalScrollWidth = firstItemWidth * scrollItems.length;

  if (slider.scrollLeft <= 0) {
    slider.scrollLeft = totalScrollWidth - 2 * firstItemWidth;
  }

  if (slider.scrollLeft >= totalScrollWidth - firstItemWidth) {
    slider.scrollLeft = firstItemWidth;
  }
}

// 반응형을 위한 그룹 크기 설정 함수
function getGroupSize() {
  const width = window.innerWidth;
  if (width <= 480) return 1;
  if (width <= 800) return 1;
  return 3;
}

// 슬라이드 이동 함수
function slide(section, direction) {
  const slider = sliders[section];
  if (!slider.querySelector("img")) return;

  const imageWidth = slider.querySelector(".scroll-item").clientWidth;
  const groupSize = getGroupSize();
  const scrollOffset = imageWidth * groupSize;
  const isInfinite = groupSize === 1;

  const maxScrollLeft = isInfinite
    ? imageWidth * (slider.querySelectorAll(".scroll-item").length - 2)
    : imageWidth * (slider.querySelectorAll(".scroll-item").length - groupSize);

  let newScrollLeft = slider.scrollLeft + direction * scrollOffset;

  if (isInfinite) {
    if (newScrollLeft >= maxScrollLeft) newScrollLeft = imageWidth;
    else if (newScrollLeft <= 0) newScrollLeft = maxScrollLeft - imageWidth;
  } else {
    if (newScrollLeft > maxScrollLeft) newScrollLeft = maxScrollLeft;
    else if (newScrollLeft < 0) newScrollLeft = 0;
  }

  slider.scrollTo({ left: newScrollLeft, behavior: "smooth" });

  // 슬라이드 이동이 끝난 후 인디케이터 업데이트
  setTimeout(() => updatePageIndicator(section), 300);
}

// 페이지 인디케이터 업데이트 함수
function updatePageIndicator(section) {
  const slider = sliders[section];
  if (!slider.querySelector("img")) return;

  const imageWidth = slider.querySelector(".scroll-item").clientWidth;
  const totalImages = images[section].length;
  const groupSize = getGroupSize();
  const totalGroups = Math.ceil(totalImages / groupSize);

  // 스크롤 위치에 따른 현재 페이지 계산
  let currentPage = Math.round(slider.scrollLeft / (imageWidth * groupSize));
  currentPage = currentPage + 1; // 1부터 시작하도록 보정

  if (currentPage > totalGroups) currentPage = totalGroups;

  const pageIndicator = document.getElementById(`${section}-page-indicator`);
  if (pageIndicator) {
    pageIndicator.querySelector(".current-page").textContent = `${currentPage}`;
    pageIndicator.querySelector(".total-pages").textContent = `${totalGroups}`;
  }
}

// 디바운스 함수
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// 초기 로드 및 화면 크기 변경 시 페이지 인디케이터 설정
window.addEventListener("resize", () => adjustPageIndicators());
window.addEventListener("load", () => adjustPageIndicators());

function adjustPageIndicators() {
  Object.keys(sliders).forEach((key) => updatePageIndicator(key));
}

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
    "../images/LOCATION/IMG_0010.png",
    "../images/LOCATION/IMG_0016.png",
    "../images/LOCATION/IMG_0019.png",
    "../images/LOCATION/IMG_0026.png",
    "../images/LOCATION/IMG_0042.png",
    "../images/LOCATION/IMG_0051.png",
    "../images/LOCATION/IMG_0056.png",
    "../images/LOCATION/IMG_9990.png",
    "../images/LOCATION/IMG_9993.png",
    "../images/LOCATION/IMG_9999.png",
  ],
  exhibition: [
    "../images/01_the_exhibition/IMG_0062.png",
    "../images/01_the_exhibition/IMG_0081.png",
    "../images/01_the_exhibition/IMG_0084.png",
    "../images/01_the_exhibition/IMG_0090.png",
    "../images/01_the_exhibition/IMG_0114.png",
    "../images/01_the_exhibition/IMG_0118.png",
    "../images/01_the_exhibition/IMG_0129.png",
    "../images/01_the_exhibition/IMG_0143.png",
    "../images/01_the_exhibition/IMG_0149.png",
    "../images/01_the_exhibition/IMG_0151.png",
    "../images/01_the_exhibition/IMG_0166.png",
    "../images/01_the_exhibition/IMG_0175.png",
    "../images/01_the_exhibition/IMG_0192.png",
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
    "../images/04_Artist_Visits/IMG_0352.png",
    "../images/04_Artist_Visits/IMG_0355.png",
    "../images/04_Artist_Visits/로운03.jpg",
    "../images/04_Artist_Visits/스테이씨01.jpg",
    "../images/04_Artist_Visits/스테이씨02.jpg",
    "../images/04_Artist_Visits/스테이씨03.jpg",
    "../images/04_Artist_Visits/엔믹스01.jpg",
    "../images/04_Artist_Visits/엔믹스02.jpg",
    "../images/04_Artist_Visits/여자아이들01.jpg",
    "../images/04_Artist_Visits/여자아이들02.jpg",
    "../images/04_Artist_Visits/여자아이들03.jpg",
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
    sliders[key].appendChild(img);
  });
});

let currentIndex = {
  location: 0,
  exhibition: 0,
  movie: 0,
  experience: 0,
  artists: 0,
  retail: 0,
};

// 슬라이더 이동 함수
function slide(section, direction) {
  const slider = sliders[section];
  const totalImages = images[section].length;

  const groupSize = window.innerWidth <= 768 ? 1 : 3;
  const totalGroups = Math.ceil(totalImages / groupSize);

  currentIndex[section] += direction * groupSize;

  if (currentIndex[section] < 0) {
    currentIndex[section] = (totalGroups - 1) * groupSize;
  } else if (currentIndex[section] >= totalImages) {
    currentIndex[section] = 0;
  }

  const offset = -(currentIndex[section] / groupSize) * 100;
  slider.style.transform = `translateX(${offset}%)`;

  const pageIndicator = document.getElementById(`${section}-page-indicator`);
  const currentPage = Math.ceil(currentIndex[section] / groupSize) + 1;
  pageIndicator.textContent = `${currentPage} | ${totalGroups}`;
}

// 초기 로드 및 화면 크기 변경 시 슬라이더 조정
window.addEventListener("resize", () => adjustPageIndicators());
window.addEventListener("load", () => adjustPageIndicators());

function adjustPageIndicators() {
  Object.keys(sliders).forEach((key) => {
    const pageIndicator = document.getElementById(`${key}-page-indicator`);
    const groupSize = window.innerWidth <= 768 ? 1 : 3;
    const totalPages = Math.ceil(images[key].length / groupSize);
    pageIndicator.textContent = `1 | ${totalPages}`;
  });
}

const slider = document.getElementById("dynamic-slider");
const images = [
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
];

// 이미지 동적으로 생성
images.forEach((src) => {
  const img = document.createElement("img");
  img.src = src;
  slider.appendChild(img);
});

let currentIndex = 0; // 현재 슬라이더 시작 인덱스
const totalImages = images.length; // 전체 이미지 개수
const visibleImages = 3; // 화면에 보이는 이미지 개수
const groupSize = 3; // 이동 시 묶음 단위 크기
const imageMargin = 20; // 이미지 간의 여백
const imageWidth = slider.querySelector("img").clientWidth + imageMargin; // 이미지 하나의 전체 너비
const totalGroups = Math.ceil(totalImages / groupSize); // 전체 그룹 수 계산

// 슬라이더 이동 함수
function slide(direction) {
  // 이동할 그룹의 인덱스를 설정
  currentIndex += direction * groupSize;

  // 슬라이더의 이동 범위 제한
  if (currentIndex < 0) {
    currentIndex = (totalGroups - 1) * groupSize; // 마지막 그룹으로 이동
  } else if (currentIndex >= totalImages) {
    currentIndex = 0; // 첫 번째 그룹으로 이동
  }

  // 슬라이더 이동 거리 계산 (3개씩 이동하므로 전체 너비를 3개 단위로 계산)
  const offset = -(currentIndex / groupSize) * 100;
  slider.style.transform = `translateX(${offset}%)`;
}

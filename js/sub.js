document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.getElementById("main-content");
  const emailInput = document.querySelector("#email");
  const continueButton = document.querySelector(".continue-button");
  const errorMessage = document.getElementById("error-message");
  const loginContainer = document.getElementById("login-container");
  const verifyContainer = document.getElementById("verify-container");
  const loginWelcome = document.getElementById("login-welcome");
  const verifyWelcome = document.getElementById("verify-welcome");
  const loginSubtext = document.getElementById("login-subtext");
  const verifySubtext = document.getElementById("verify-subtext");

  // 이메일 정규식 패턴
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // 이메일 입력 시 continue 버튼 활성화/비활성화
  continueButton.disabled = true;
  emailInput.addEventListener("input", () => {
    const emailValue = emailInput.value.trim();

    if (emailPattern.test(emailValue)) {
      // 이메일 형식이 유효하면 버튼 활성화 및 에러 메시지 숨김
      continueButton.style.backgroundColor = "rgba(97, 57, 255, 1)";
      continueButton.style.color = "white";
      continueButton.disabled = false;
      emailInput.classList.remove("invalid");
      errorMessage.style.display = "none";
    } else {
      // 유효하지 않으면 버튼 비활성화 및 에러 메시지 표시
      continueButton.style.backgroundColor = "#333333";
      continueButton.style.color = "#a4a4a4";
      continueButton.disabled = true;
      emailInput.classList.add("invalid");
      errorMessage.style.display = "block";
    }
  });

  // Continue 버튼 클릭 시 인증 코드 폼으로 전환
  continueButton.addEventListener("click", () => {
    if (emailPattern.test(emailInput.value.trim())) {
      mainContent.classList.add("verify-active");
      loginContainer.style.display = "none"; // 로그인 폼 숨기기
      verifyContainer.style.display = "flex"; // 인증 코드 폼 보이기
      loginWelcome.style.display = "none"; // 로그인 Welcome 텍스트 숨기기
      verifyWelcome.style.display = "block"; // 인증 코드 Welcome 텍스트 보이기
      loginSubtext.style.display = "none"; // 로그인 Sub 텍스트 숨기기
      verifySubtext.style.display = "block"; // 인증 코드 Sub 텍스트 보이기
    }
  });

  // 인증 코드 입력 필드와 버튼 선택
  const codeInputs = document.querySelectorAll(".code-input");
  const verifyButton = document.querySelector(".verify-button");

  // 코드 입력 시 버튼 활성화/비활성화
  codeInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      if (input.value.length === 1 && index < codeInputs.length - 1) {
        codeInputs[index + 1].focus();
      }

      // 모든 코드 입력 필드가 채워졌는지 확인
      const allFilled = Array.from(codeInputs).every(
        (input) => input.value.trim() !== ""
      );

      if (allFilled) {
        verifyButton.style.backgroundColor = "rgba(97, 57, 255, 1)";
        verifyButton.style.color = "white";
        verifyButton.disabled = false;
      } else {
        verifyButton.style.backgroundColor = "#333333";
        verifyButton.style.color = "#a4a4a4";
        verifyButton.disabled = true;
      }
    });
  });
});

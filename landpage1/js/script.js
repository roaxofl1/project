const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const leadForm = document.getElementById("leadForm");
const successState = document.getElementById("successState");
const successClose = document.getElementById("successClose");
const agree = document.getElementById("agree");
const agreeError = document.getElementById("agreeError");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

const openButtons = document.querySelectorAll(".open-modal");

function openModal() {
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setTimeout(() => nameInput.focus(), 250);
}

function closeModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

openButtons.forEach(btn => btn.addEventListener("click", openModal));
modalClose.addEventListener("click", closeModal);
successClose.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
});

// 전화번호 자동 하이픈
phoneInput.addEventListener("input", () => {
  let value = phoneInput.value.replace(/\D/g, "").slice(0, 11);
  if (value.length > 7) {
    value = value.replace(/^(\d{3})(\d{4})(\d{0,4}).*/, "$1-$2-$3");
  } else if (value.length > 3) {
    value = value.replace(/^(\d{3})(\d{0,4})/, "$1-$2");
  }
  phoneInput.value = value;
});

function showError(input, message) {
  const field = input.closest(".field");
  field.classList.add("invalid");
  field.querySelector(".error").textContent = message;
}

function clearError(input) {
  const field = input.closest(".field");
  field.classList.remove("invalid");
  field.querySelector(".error").textContent = "";
}

[nameInput, emailInput, phoneInput].forEach(input => {
  input.addEventListener("input", () => clearError(input));
});

leadForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let valid = true;
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name) {
    showError(nameInput, "이름을 입력해주세요.");
    valid = false;
  } else clearError(nameInput);

  if (!email) {
    showError(emailInput, "이메일 주소를 입력해주세요.");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError(emailInput, "올바른 이메일 주소를 입력해주세요.");
    valid = false;
  } else clearError(emailInput);

  if (!phone) {
    showError(phoneInput, "전화번호를 입력해주세요.");
    valid = false;
  } else if (!/^01[0-9]-\d{3,4}-\d{4}$/.test(phone)) {
    showError(phoneInput, "올바른 전화번호를 입력해주세요.");
    valid = false;
  } else clearError(phoneInput);

  if (!agree.checked) {
    agreeError.textContent = "개인정보 수집 및 이용에 동의해주세요.";
    valid = false;
  } else {
    agreeError.textContent = "";
  }

  if (!valid) return;

  // 실제 서비스에서는 이 지점에서 서버/API 또는 CRM으로 데이터를 전송합니다.
  console.log({
    name,
    email,
    phone,
    agreed: agree.checked,
    submittedAt: new Date().toISOString()
  });

  leadForm.style.display = "none";
  successState.classList.add("active");
});

agree.addEventListener("change", () => {
  if (agree.checked) agreeError.textContent = "";
});

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Header shadow
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.style.boxShadow = window.scrollY > 10
    ? "0 8px 30px rgba(0,0,0,.06)"
    : "none";
});

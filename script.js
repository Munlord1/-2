// Прелоадер
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  gsap.to(preloader, { opacity: 0, duration: 0.5, onComplete: () => preloader.style.display = "none" });
});

// Three.js для 3D-куба
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(300, 300);
document.getElementById("three-canvas").appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const texture = new THREE.TextureLoader().load("animepc.gif");
const materials = [
  new THREE.MeshBasicMaterial({ map: texture, transparent: true }), // Темная тема
  new THREE.MeshBasicMaterial({ color: 0xFFFFFF, opacity: 0.8, transparent: true }) // Светлая тема
];
const cube = new THREE.Mesh(geometry, materials[0]);
scene.add(cube);

camera.position.z = 5;

function updateCubeMaterial() {
  cube.material = document.body.classList.contains("dark-theme") ? materials[0] : materials[1];
}

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Параллакс для фона
gsap.to("#parallax-bg", {
  y: 100,
  ease: "none",
  scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
  }
});

// Анимация главной секции
gsap.from(".hero-title", {
  opacity: 0,
  y: 50,
  duration: 1.5,
  ease: "power3.out"
});

gsap.from(".hero-subtitle", {
  opacity: 0,
  y: 30,
  duration: 1.5,
  delay: 0.5,
  ease: "power3.out"
});

gsap.from(".cta-button", {
  opacity: 0,
  scale: 0.8,
  duration: 1,
  delay: 1,
  ease: "back.out(1.7)"
});

// Анимация текста (пишущаяся машинка)
const typewriter = document.querySelector(".typewriter");
const text = document.body.getAttribute("data-lang") === "ru" ? "Code Smarter, Not Harder" : "Code Smarter, Not Harder";
let i = 0;
function type() {
  if (i < text.length) {
      typewriter.textContent += text.charAt(i);
      i++;
      setTimeout(type, 100);
  } else {
      setTimeout(() => {
          typewriter.textContent = "";
          i = 0;
          type();
      }, 2000);
  }
}
type();

// Intersection Observer для секций
const sections = document.querySelectorAll(".section");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add("visible");
      }
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

// Частицы
particlesJS("particles-js", {
  particles: {
      number: { value: 100, density: { enable: true, value_area: 800 } },
      color: { value: "#00DDEB" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: {
          enable: true,
          distance: 150,
          color: "#FF007A",
          opacity: 0.4,
          width: 1
      },
      move: {
          enable: true,
          speed: 3,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false
      }
  },
  interactivity: {
      detect_on: "canvas",
      events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
          resize: true
      },
      modes: {
          repulse: { distance: 100, duration: 0.4 },
          push: { particles_nb: 4 }
      }
  },
  retina_detect: true
});

// Переключатель темы
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
  themeToggle.textContent = document.body.classList.contains("dark-theme") ? "☀️" : "🌙";
  updateCubeMaterial();
});

// Локализация
function updateLanguage(lang) {
  document.querySelectorAll("[data-lang-ru]").forEach(element => {
      const text = element.getAttribute(`data-lang-${lang}`);
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
          element.placeholder = text;
      } else {
          element.textContent = text;
      }
  });
  typewriter.textContent = "";
  i = 0;
  type();
}

document.getElementById("lang-ru").addEventListener("click", () => {
  document.body.setAttribute("data-lang", "ru");
  document.getElementById("lang-ru").classList.add("active");
  document.getElementById("lang-en").classList.remove("active");
  updateLanguage("ru");
});

document.getElementById("lang-en").addEventListener("click", () => {
  document.body.setAttribute("data-lang", "en");
  document.getElementById("lang-en").classList.add("active");
  document.getElementById("lang-ru").classList.remove("active");
  updateLanguage("en");
});

// Вкладки
document.querySelectorAll(".tab-button").forEach(button => {
  button.addEventListener("click", () => {
      document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
      document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("active"));
      button.classList.add("active");
      document.getElementById(button.getAttribute("data-tab")).classList.add("active");
  });
});

// Аккордеоны
document.querySelectorAll(".accordion-button").forEach(button => {
  button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      content.classList.toggle("active");
      if (content.classList.contains("active")) {
          content.style.display = "block";
          gsap.from(content, { opacity: 0, height: 0, duration: 0.5 });
      } else {
          content.style.display = "none";
      }
  });
});

// Модальные окна
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const modalClose = document.getElementById("modal-close");

const modalContent = {
  "code-generator": {
      ru: { title: "Генератор кода", text: "Создавайте HTML, CSS или JS код за секунды. Экономьте время с готовыми шаблонами." },
      en: { title: "Code Generator", text: "Generate HTML, CSS, or JS code in seconds. Save time with ready-made templates." }
  },
  "debugger": {
      ru: { title: "Дебаггер", text: "Инструмент для поиска и исправления ошибок в вашем коде." },
      en: { title: "Debugger", text: "A tool to find and fix bugs in your code." }
  },
  "converter": {
      ru: { title: "Конвертер кода", text: "Переводите код между языками программирования быстро и легко." },
      en: { title: "Code Converter", text: "Convert code between programming languages quickly and easily." }
  }
};

document.querySelectorAll(".tool-card:not(.pomodoro-card):not(.code-counter-card):not(.color-generator-card)").forEach(card => {
  card.addEventListener("click", () => {
      const modalId = card.getAttribute("data-modal");
      const lang = document.body.getAttribute("data-lang");
      modalTitle.textContent = modalContent[modalId][lang].title;
      modalText.textContent = modalContent[modalId][lang].text;
      modal.style.display = "block";
      gsap.from(".modal-content", { opacity: 0, y: -50, duration: 0.5 });
  });
});

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
      modal.style.display = "none";
  }
});

// Поиск
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  document.querySelectorAll(".blog-card").forEach(card => {
      const searchData = card.getAttribute("data-search").toLowerCase();
      card.style.display = searchData.includes(query) || query === "" ? "block" : "none";
  });
  document.querySelectorAll(".tab-pane").forEach(pane => {
      const paneId = pane.id.toLowerCase();
      pane.style.display = paneId.includes(query) || query === "" ? "block" : "none";
  });
});

// Форма обратной связи с конфетти
document.getElementById("feedback-form").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("success-message").style.display = "block";
  gsap.from("#success-message", { opacity: 0, y: 20, duration: 0.5 });
  confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
  });
  e.target.reset();
  setTimeout(() => {
      document.getElementById("success-message").style.display = "none";
  }, 3000);
});

// Плавный скролл
document.querySelectorAll(".nav-links a").forEach(anchor => {
  anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      target.scrollIntoView({ behavior: "smooth" });
  });
});

// Кнопка "Наверх"
const scrollTopBtn = document.getElementById("scroll-top");
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Прогресс-бар скролла
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  document.getElementById("scroll-progress").style.width = `${progress}%`;

  if (scrollTop > 300) {
      scrollTopBtn.classList.add("visible");
  } else {
      scrollTopBtn.classList.remove("visible");
  }
});

// Таймер Помодоро
const timerDisplay = document.getElementById("pomodoro-timer");
const startBtn = document.getElementById("pomodoro-start");
const resetBtn = document.getElementById("pomodoro-reset");
let timeLeft = 25 * 60;
let timerId = null;
let isWorking = true;

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
  if (!timerId) {
      timerId = setInterval(() => {
          timeLeft--;
          updateTimer();
          if (timeLeft <= 0) {
              clearInterval(timerId);
              timerId = null;
              isWorking = !isWorking;
              timeLeft = isWorking ? 25 * 60 : 5 * 60;
              updateTimer();
              alert(isWorking ? "Время работать!" : "Время отдыха!");
          }
      }, 1000);
      startBtn.textContent = document.body.getAttribute("data-lang") === "ru" ? "Пауза" : "Pause";
  } else {
      clearInterval(timerId);
      timerId = null;
      startBtn.textContent = document.body.getAttribute("data-lang") === "ru" ? "Старт" : "Start";
  }
}

startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", () => {
  clearInterval(timerId);
  timerId = null;
  timeLeft = 25 * 60;
  isWorking = true;
  updateTimer();
  startBtn.textContent = document.body.getAttribute("data-lang") === "ru" ? "Старт" : "Start";
});

updateTimer();

// Калькулятор кода
const codeInput = document.getElementById("code-input");
const codeLines = document.getElementById("code-lines");
codeInput.addEventListener("input", () => {
  const lines = codeInput.value.split("\n").length;
  codeLines.textContent = document.body.getAttribute("data-lang") === "ru" ? `Строк: ${lines}` : `Lines: ${lines}`;
});

// Генератор цвета
const colorBox = document.getElementById("color-box");
const generateColorBtn = document.getElementById("generate-color");
generateColorBtn.addEventListener("click", () => {
  const color = "#" + Math.floor(Math.random()*16777215).toString(16);
  colorBox.style.backgroundColor = color;
  colorBox.textContent = color;
});

// GitHub API
fetch("https://api.github.com/users/YOUR_GITHUB_USERNAME/repos?sort=updated&per_page=3")
  .then(response => response.json())
  .then(data => {
      const reposContainer = document.getElementById("github-repos");
      data.forEach(repo => {
          const repoCard = document.createElement("div");
          repoCard.classList.add("repo-card");
          repoCard.innerHTML = `
              <h4><a href="${repo.html_url}" target="_blank">${repo.name}</a></h4>
              <p>${repo.description || "No description"}</p>
          `;
          reposContainer.appendChild(repoCard);
      });
  })
  .catch(error => console.error("Ошибка GitHub API:", error));

// Погода (OpenWeather API)
fetch("https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=YOUR_API_KEY&units=metric&lang=ru")
  .then(response => response.json())
  .then(data => {
      const weather = document.getElementById("weather");
      weather.textContent = document.body.getAttribute("data-lang") === "ru" 
          ? `Погода: ${data.main.temp}°C, ${data.weather[0].description}`
          : `Weather: ${data.main.temp}°C, ${data.weather[0].description}`;
  })
  .catch(error => console.error("Ошибка OpenWeather API:", error));

// Счётчик посетителей
let visitors = localStorage.getItem("visitors") || 0;
visitors++;
localStorage.setItem("visitors", visitors);
document.getElementById("visitor-count").textContent = document.body.getAttribute("data-lang") === "ru" 
  ? `Посетителей: ${visitors}` 
  : `Visitors: ${visitors}`;

// Клавиатурные шорткаты
document.addEventListener("keydown", (e) => {
  switch(e.key.toLowerCase()) {
      case "h": window.scrollTo({ top: 0, behavior: "smooth" }); break;
      case "l": document.querySelector("#lessons").scrollIntoView({ behavior: "smooth" }); break;
      case "t": document.querySelector("#tools").scrollIntoView({ behavior: "smooth" }); break;
      case "c": document.querySelector("#community").scrollIntoView({ behavior: "smooth" }); break;
      case "b": document.querySelector("#blog").scrollIntoView({ behavior: "smooth" }); break;
  }
});
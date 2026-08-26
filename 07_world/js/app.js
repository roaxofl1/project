/* =========================================================
   WEATHER APP
   OpenWeather API
   API KEY만 교체하면 됩니다.
========================================================= */

const API_KEY = "8e15ce6537aa6b8088563183dfaf3609";

const els = {
  searchForm: document.querySelector("#searchForm"),
  cityInput: document.querySelector("#cityInput"),
  suggestions: document.querySelector("#suggestions"),
  popularCities: document.querySelector("#popularCities"),
  status: document.querySelector("#status"),
  locationName: document.querySelector("#locationName"),
  currentIcon: document.querySelector("#currentIcon"),
  weatherDescription: document.querySelector("#weatherDescription"),
  currentTemp: document.querySelector("#currentTemp"),
  feelsLike: document.querySelector("#feelsLike"),
  tempMax: document.querySelector("#tempMax"),
  tempMin: document.querySelector("#tempMin"),
  humidity: document.querySelector("#humidity"),
  wind: document.querySelector("#wind"),
  pressure: document.querySelector("#pressure"),
  visibility: document.querySelector("#visibility"),
  clouds: document.querySelector("#clouds"),
  sunTime: document.querySelector("#sunTime"),
  hourlyList: document.querySelector("#hourlyList"),
  dailyList: document.querySelector("#dailyList"),
  tempChart: document.querySelector("#tempChart"),
  favoritesList: document.querySelector("#favoritesList"),
  favoriteBtn: document.querySelector("#favoriteBtn"),
  locationBtn: document.querySelector("#locationBtn"),
  themeBtn: document.querySelector("#themeBtn")
};

/* 한글 ↔ 영문 도시 검색을 위한 기본 매핑 */
const koreaCities = {
  "서울": { name: "서울", lat: 37.5665, lon: 126.978 },
  "부산": { name: "부산", lat: 35.1796, lon: 129.0756 },
  "대구": { name: "대구", lat: 35.8714, lon: 128.6014 },
  "인천": { name: "인천", lat: 37.4563, lon: 126.7052 },
  "광주": { name: "광주", lat: 35.1595, lon: 126.8526 },
  "대전": { name: "대전", lat: 36.3504, lon: 127.3845 },
  "울산": { name: "울산", lat: 35.5384, lon: 129.3114 },
  "세종": { name: "세종", lat: 36.48, lon: 127.289 },
  "수원": { name: "수원", lat: 37.2636, lon: 127.0286 },
  "성남": { name: "성남", lat: 37.4449, lon: 127.1389 },
  "의정부": { name: "의정부", lat: 37.7381, lon: 127.0337 },
  "안양": { name: "안양", lat: 37.3943, lon: 126.9568 },
  "부천": { name: "부천", lat: 37.5034, lon: 126.766 },
  "광명": { name: "광명", lat: 37.4786, lon: 126.8644 },
  "평택": { name: "평택", lat: 36.9921, lon: 127.1127 },
  "동두천": { name: "동두천", lat: 37.9034, lon: 127.0606 },
  "안산": { name: "안산", lat: 37.3219, lon: 126.8309 },
  "고양": { name: "고양", lat: 37.6584, lon: 126.832 },
  "과천": { name: "과천", lat: 37.4292, lon: 126.9876 },
  "구리": { name: "구리", lat: 37.5943, lon: 127.1296 },
  "남양주": { name: "남양주", lat: 37.636, lon: 127.2165 },
  "오산": { name: "오산", lat: 37.1498, lon: 127.0772 },
  "시흥": { name: "시흥", lat: 37.38, lon: 126.8029 },
  "군포": { name: "군포", lat: 37.3617, lon: 126.9352 },
  "의왕": { name: "의왕", lat: 37.3449, lon: 126.9683 },
  "하남": { name: "하남", lat: 37.5393, lon: 127.2148 },
  "용인": { name: "용인", lat: 37.2411, lon: 127.1776 },
  "파주": { name: "파주", lat: 37.7599, lon: 126.7802 },
  "이천": { name: "이천", lat: 37.272, lon: 127.435 },
  "안성": { name: "안성", lat: 37.0079, lon: 127.2797 },
  "김포": { name: "김포", lat: 37.6153, lon: 126.7156 },
  "화성": { name: "화성", lat: 37.1995, lon: 126.8312 },
  "광주시": { name: "광주시", lat: 37.4294, lon: 127.2551 },
  "양주": { name: "양주", lat: 37.7853, lon: 127.0458 },
  "포천": { name: "포천", lat: 37.8949, lon: 127.2003 },
  "여주": { name: "여주", lat: 37.2983, lon: 127.6372 },
  "연천": { name: "연천", lat: 38.0967, lon: 127.0748 },
  "가평": { name: "가평", lat: 37.8315, lon: 127.5095 },
  "양평": { name: "양평", lat: 37.4917, lon: 127.4876 },
  "춘천": { name: "춘천", lat: 37.8813, lon: 127.7298 },
  "원주": { name: "원주", lat: 37.3422, lon: 127.9202 },
  "강릉": { name: "강릉", lat: 37.7519, lon: 128.8761 },
  "동해": { name: "동해", lat: 37.5247, lon: 129.1143 },
  "태백": { name: "태백", lat: 37.1641, lon: 128.9856 },
  "속초": { name: "속초", lat: 38.207, lon: 128.5918 },
  "삼척": { name: "삼척", lat: 37.4499, lon: 129.1652 },
  "홍천": { name: "홍천", lat: 37.697, lon: 127.8885 },
  "횡성": { name: "횡성", lat: 37.4919, lon: 127.985 },
  "영월": { name: "영월", lat: 37.1838, lon: 128.4617 },
  "평창": { name: "평창", lat: 37.3708, lon: 128.39 },
  "정선": { name: "정선", lat: 37.3806, lon: 128.6609 },
  "철원": { name: "철원", lat: 38.1466, lon: 127.3136 },
  "화천": { name: "화천", lat: 38.1062, lon: 127.7082 },
  "양구": { name: "양구", lat: 38.1099, lon: 127.9896 },
  "인제": { name: "인제", lat: 38.0697, lon: 128.1707 },
  "고성군": { name: "고성군", lat: 38.38, lon: 128.4679 },
  "양양": { name: "양양", lat: 38.0754, lon: 128.619 },
  "청주": { name: "청주", lat: 36.6424, lon: 127.489 },
  "충주": { name: "충주", lat: 36.991, lon: 127.9259 },
  "제천": { name: "제천", lat: 37.1326, lon: 128.191 },
  "보은": { name: "보은", lat: 36.4896, lon: 127.7294 },
  "옥천": { name: "옥천", lat: 36.3064, lon: 127.5714 },
  "영동": { name: "영동", lat: 36.175, lon: 127.7833 },
  "증평": { name: "증평", lat: 36.7854, lon: 127.5815 },
  "진천": { name: "진천", lat: 36.8554, lon: 127.4355 },
  "괴산": { name: "괴산", lat: 36.8153, lon: 127.7866 },
  "음성": { name: "음성", lat: 36.9403, lon: 127.6905 },
  "단양": { name: "단양", lat: 36.9847, lon: 128.3655 },
  "천안": { name: "천안", lat: 36.8151, lon: 127.1139 },
  "공주": { name: "공주", lat: 36.4465, lon: 127.119 },
  "보령": { name: "보령", lat: 36.3335, lon: 126.6129 },
  "아산": { name: "아산", lat: 36.7898, lon: 127.0018 },
  "서산": { name: "서산", lat: 36.7849, lon: 126.4503 },
  "논산": { name: "논산", lat: 36.1872, lon: 127.0987 },
  "계룡": { name: "계룡", lat: 36.2745, lon: 127.2488 },
  "당진": { name: "당진", lat: 36.8898, lon: 126.6459 },
  "금산": { name: "금산", lat: 36.1089, lon: 127.488 },
  "부여": { name: "부여", lat: 36.2757, lon: 126.9098 },
  "서천": { name: "서천", lat: 36.0803, lon: 126.6919 },
  "청양": { name: "청양", lat: 36.459, lon: 126.8022 },
  "홍성": { name: "홍성", lat: 36.6012, lon: 126.6608 },
  "예산": { name: "예산", lat: 36.6826, lon: 126.8489 },
  "태안": { name: "태안", lat: 36.7456, lon: 126.298 },
  "전주": { name: "전주", lat: 35.8242, lon: 127.148 },
  "군산": { name: "군산", lat: 35.9677, lon: 126.7366 },
  "익산": { name: "익산", lat: 35.9483, lon: 126.9577 },
  "정읍": { name: "정읍", lat: 35.5699, lon: 126.8558 },
  "남원": { name: "남원", lat: 35.4164, lon: 127.3904 },
  "김제": { name: "김제", lat: 35.8036, lon: 126.8808 },
  "완주": { name: "완주", lat: 35.9056, lon: 127.1626 },
  "진안": { name: "진안", lat: 35.7918, lon: 127.4249 },
  "무주": { name: "무주", lat: 36.0073, lon: 127.6608 },
  "장수": { name: "장수", lat: 35.6473, lon: 127.5214 },
  "임실": { name: "임실", lat: 35.6178, lon: 127.289 },
  "순창": { name: "순창", lat: 35.3744, lon: 127.137 },
  "고창": { name: "고창", lat: 35.435, lon: 126.702 },
  "부안": { name: "부안", lat: 35.7318, lon: 126.733 },
  "목포": { name: "목포", lat: 34.8118, lon: 126.3922 },
  "여수": { name: "여수", lat: 34.7604, lon: 127.6622 },
  "순천": { name: "순천", lat: 34.9506, lon: 127.4872 },
  "나주": { name: "나주", lat: 35.0158, lon: 126.7108 },
  "광양": { name: "광양", lat: 34.9407, lon: 127.6959 },
  "담양": { name: "담양", lat: 35.3212, lon: 126.9882 },
  "곡성": { name: "곡성", lat: 35.282, lon: 127.2919 },
  "구례": { name: "구례", lat: 35.2025, lon: 127.4627 },
  "고흥": { name: "고흥", lat: 34.6111, lon: 127.2851 },
  "보성": { name: "보성", lat: 34.7715, lon: 127.0801 },
  "화순": { name: "화순", lat: 35.0645, lon: 126.9865 },
  "장흥": { name: "장흥", lat: 34.6814, lon: 126.9069 },
  "강진": { name: "강진", lat: 34.6421, lon: 126.767 },
  "해남": { name: "해남", lat: 34.5736, lon: 126.599 },
  "영암": { name: "영암", lat: 34.8002, lon: 126.6968 },
  "무안": { name: "무안", lat: 34.9904, lon: 126.4787 },
  "함평": { name: "함평", lat: 35.0659, lon: 126.5166 },
  "영광": { name: "영광", lat: 35.2773, lon: 126.512 },
  "장성": { name: "장성", lat: 35.3019, lon: 126.7847 },
  "완도": { name: "완도", lat: 34.3118, lon: 126.755 },
  "진도": { name: "진도", lat: 34.4868, lon: 126.2635 },
  "신안": { name: "신안", lat: 34.8274, lon: 126.1072 },
  "포항": { name: "포항", lat: 36.019, lon: 129.3435 },
  "경주": { name: "경주", lat: 35.8562, lon: 129.2247 },
  "김천": { name: "김천", lat: 36.1398, lon: 128.1136 },
  "안동": { name: "안동", lat: 36.5684, lon: 128.7294 },
  "구미": { name: "구미", lat: 36.1195, lon: 128.3446 },
  "영주": { name: "영주", lat: 36.8057, lon: 128.624 },
  "영천": { name: "영천", lat: 35.9733, lon: 128.9386 },
  "상주": { name: "상주", lat: 36.4109, lon: 128.1591 },
  "문경": { name: "문경", lat: 36.5867, lon: 128.1866 },
  "경산": { name: "경산", lat: 35.8251, lon: 128.7412 },
  "군위": { name: "군위", lat: 36.2428, lon: 128.5729 },
  "의성": { name: "의성", lat: 36.3527, lon: 128.697 },
  "청송": { name: "청송", lat: 36.4363, lon: 129.057 },
  "영양": { name: "영양", lat: 36.6667, lon: 129.1124 },
  "영덕": { name: "영덕", lat: 36.415, lon: 129.3658 },
  "청도": { name: "청도", lat: 35.6474, lon: 128.734 },
  "고령": { name: "고령", lat: 35.7262, lon: 128.2629 },
  "성주": { name: "성주", lat: 35.919, lon: 128.283 },
  "칠곡": { name: "칠곡", lat: 35.9954, lon: 128.4018 },
  "예천": { name: "예천", lat: 36.6469, lon: 128.4374 },
  "봉화": { name: "봉화", lat: 36.8931, lon: 128.7325 },
  "울진": { name: "울진", lat: 36.993, lon: 129.4003 },
  "울릉": { name: "울릉", lat: 37.4844, lon: 130.9057 },
  "창원": { name: "창원", lat: 35.228, lon: 128.6811 },
  "진주": { name: "진주", lat: 35.18, lon: 128.1076 },
  "통영": { name: "통영", lat: 34.8544, lon: 128.433 },
  "사천": { name: "사천", lat: 35.0037, lon: 128.0642 },
  "김해": { name: "김해", lat: 35.2285, lon: 128.8894 },
  "밀양": { name: "밀양", lat: 35.5038, lon: 128.7466 },
  "거제": { name: "거제", lat: 34.8806, lon: 128.6211 },
  "양산": { name: "양산", lat: 35.335, lon: 129.037 },
  "의령": { name: "의령", lat: 35.3222, lon: 128.2616 },
  "함안": { name: "함안", lat: 35.2724, lon: 128.4065 },
  "창녕": { name: "창녕", lat: 35.5446, lon: 128.492 },
  "고성": { name: "고성", lat: 34.973, lon: 128.322 },
  "남해": { name: "남해", lat: 34.8375, lon: 127.8925 },
  "하동": { name: "하동", lat: 35.0673, lon: 127.7513 },
  "산청": { name: "산청", lat: 35.4156, lon: 127.8735 },
  "함양": { name: "함양", lat: 35.5205, lon: 127.725 },
  "거창": { name: "거창", lat: 35.6866, lon: 127.9095 },
  "합천": { name: "합천", lat: 35.5667, lon: 128.165 },
  "제주": { name: "제주", lat: 33.4996, lon: 126.5312 },
  "서귀포": { name: "서귀포", lat: 33.2541, lon: 126.5601 }
};

const popularCities = [
  { ko: "서울", en: "Seoul" },
  { ko: "도쿄", en: "Tokyo" },
  { ko: "뉴욕", en: "New York" },
  { ko: "런던", en: "London" },
  { ko: "파리", en: "Paris" },
  { ko: "시드니", en: "Sydney" }
];

let currentCity = null;
let currentWeather = null;
let currentForecast = null;

/* ---------------------------------------------------------
   초기화
--------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderPopularCities();
  renderFavorites();
  applySavedTheme();

  if (API_KEY === "YOUR_API_KEY") {
    setStatus("OpenWeather API Key를 js/app.js의 API_KEY에 입력해주세요.", true);
    return;
  }

  loadCityWeather("Seoul");
});

/* ---------------------------------------------------------
   도시 검색
--------------------------------------------------------- */
els.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const keyword = els.cityInput.value.trim();

  if (!keyword) {
    setStatus("도시명을 입력해주세요.", true);
    return;
  }

  loadCityWeather(keyword);
  hideSuggestions();
});

els.cityInput.addEventListener("input", () => {
  renderSuggestions(els.cityInput.value.trim());
});

document.addEventListener("click", (event) => {
  if (!els.searchForm.contains(event.target)) {
    hideSuggestions();
  }
});

/* ---------------------------------------------------------
   현재 위치
--------------------------------------------------------- */
els.locationBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    setStatus("이 브라우저에서는 위치 기능을 사용할 수 없습니다.", true);
    return;
  }

  setStatus("현재 위치를 확인하고 있습니다...");

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => loadWeatherByCoords(coords.latitude, coords.longitude),
    () => setStatus("위치 권한을 허용하거나 도시를 직접 검색해주세요.", true),
    { enableHighAccuracy: true, timeout: 10000 }
  );
});

/* ---------------------------------------------------------
   다크모드
--------------------------------------------------------- */
els.themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("weather-theme", isDark ? "dark" : "light");
  els.themeBtn.textContent = isDark ? "☀️" : "🌙";
});

function applySavedTheme() {
  const saved = localStorage.getItem("weather-theme");

  if (saved === "dark") {
    document.body.classList.add("dark");
    els.themeBtn.textContent = "☀️";
  }
}

/* ---------------------------------------------------------
   API 요청
--------------------------------------------------------- */
async function loadCityWeather(keyword) {
  if (!validateApiKey()) return;

  setStatus("날씨 정보를 불러오는 중...");

  const koreanCity = getKoreanCity(keyword);

  // 국내 도시가 등록되어 있으면 도시명 검색 대신 좌표로 조회합니다.
  if (koreanCity) {
    await loadWeatherByCoords(koreanCity.lat, koreanCity.lon, koreanCity.name);
    els.cityInput.value = "";
    hideSuggestions();
    return;
  }

  try {
    const normalizedCity = normalizeCity(keyword);

    const currentUrl =
      `https://api.openweathermap.org/data/2.5/weather` +
      `?q=${encodeURIComponent(normalizedCity)}&appid=${API_KEY}&units=metric&lang=kr`;

    const forecastUrl =
      `https://api.openweathermap.org/data/2.5/forecast` +
      `?q=${encodeURIComponent(normalizedCity)}&appid=${API_KEY}&units=metric&lang=kr`;

    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl)
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error("CITY_NOT_FOUND");
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    /* ★ API 응답을 가장 먼저 콘솔에서 확인 */
    console.log("===== OpenWeather 현재 날씨 API =====");
    console.log(currentData);

    console.log("===== OpenWeather 예보 API =====");
    console.log(forecastData);

    currentWeather = currentData;
    currentForecast = forecastData;

    renderCurrentWeather(currentData);
    renderForecast(forecastData);
    renderFavorites();
    updateFavoriteButton();

    els.cityInput.value = "";
    setStatus(`${currentData.name}의 날씨 정보를 불러왔습니다.`);
  } catch (error) {
    console.error("날씨 API 오류:", error);
    setStatus(
      error.message === "CITY_NOT_FOUND"
        ? "검색 결과를 찾을 수 없습니다. 도시명을 다시 확인해주세요."
        : "날씨 정보를 불러오지 못했습니다. API Key와 네트워크 연결을 확인해주세요.",
      true
    );
  }
}

async function loadWeatherByCoords(lat, lon, requestedName = "") {
  if (!validateApiKey()) return;

  try {
    const currentUrl =
      `https://api.openweathermap.org/data/2.5/weather` +
      `?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;

    const forecastUrl =
      `https://api.openweathermap.org/data/2.5/forecast` +
      `?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;

    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl)
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error("LOCATION_ERROR");
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    console.log("===== OpenWeather 현재 위치 날씨 API =====");
    console.log(currentData);

    console.log("===== OpenWeather 현재 위치 예보 API =====");
    console.log(forecastData);

    currentWeather = currentData;
    currentForecast = forecastData;

    if (requestedName) {
      currentData.displayName = requestedName;
    }

    renderCurrentWeather(currentData);
    renderForecast(forecastData);
    renderFavorites();
    updateFavoriteButton();

    setStatus(`${currentData.displayName || currentData.name}의 현재 위치 날씨입니다.`);
  } catch (error) {
    console.error("현재 위치 API 오류:", error);
    setStatus("현재 위치의 날씨를 불러오지 못했습니다.", true);
  }
}

function validateApiKey() {
  if (API_KEY === "YOUR_API_KEY") {
    setStatus("js/app.js에서 YOUR_API_KEY를 실제 OpenWeather API Key로 교체해주세요.", true);
    return false;
  }

  return true;
}

/* ---------------------------------------------------------
   한글 도시명 처리
--------------------------------------------------------- */
function normalizeCity(keyword) {
  const trimmed = keyword.trim();

  return trimmed;
}

function getKoreanCity(keyword) {
  return koreaCities[keyword.trim()] || null;
}

/* ---------------------------------------------------------
   현재 날씨 렌더링
--------------------------------------------------------- */
function renderCurrentWeather(data) {
  currentCity = {
    name: data.displayName || data.name,
    country: data.sys.country,
    lat: data.coord.lat,
    lon: data.coord.lon
  };

  const displayName = data.displayName || data.name;
  els.locationName.textContent = `${displayName}, ${data.sys.country}`;

  const weather = data.weather[0];

  els.currentIcon.src = getIconUrl(weather.icon);
  els.currentIcon.alt = weather.description;
  els.weatherDescription.textContent = capitalize(weather.description);

  els.currentTemp.textContent = Math.round(data.main.temp);
  els.feelsLike.textContent = Math.round(data.main.feels_like);
  els.tempMax.textContent = Math.round(data.main.temp_max);
  els.tempMin.textContent = Math.round(data.main.temp_min);

  els.humidity.textContent = `${data.main.humidity}%`;
  els.wind.textContent = `${Number(data.wind.speed).toFixed(1)} m/s`;
  els.pressure.textContent = `${data.main.pressure} hPa`;
  els.visibility.textContent = data.visibility
    ? `${(data.visibility / 1000).toFixed(1)} km`
    : "--";
  els.clouds.textContent = `${data.clouds.all}%`;

  const sunrise = formatTime(data.sys.sunrise, data.timezone);
  const sunset = formatTime(data.sys.sunset, data.timezone);
  els.sunTime.textContent = `${sunrise} / ${sunset}`;
}

function getIconUrl(icon) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

/* ---------------------------------------------------------
   시간별 / 5일 예보
--------------------------------------------------------- */
function renderForecast(data) {
  const list = data.list;

  renderHourly(list);
  renderDaily(list);
  renderTemperatureChart(list);
}

function renderHourly(list) {
  const items = list.slice(0, 8);

  els.hourlyList.innerHTML = items.map(item => `
    <article class="hourly-item">
      <div class="time">${formatForecastTime(item.dt)}</div>
      <img src="${getIconUrl(item.weather[0].icon)}" alt="${item.weather[0].description}">
      <div class="temp">${Math.round(item.main.temp)}°</div>
    </article>
  `).join("");
}

function renderDaily(list) {
  const days = {};

  list.forEach(item => {
    const dateKey = new Date(item.dt * 1000).toISOString().slice(0, 10);

    if (!days[dateKey]) {
      days[dateKey] = [];
    }

    days[dateKey].push(item);
  });

  const daily = Object.values(days).slice(0, 5);

  els.dailyList.innerHTML = daily.map(items => {
    const noon =
      items.find(item => new Date(item.dt * 1000).getHours() === 12) ||
      items[Math.floor(items.length / 2)];

    const max = Math.max(...items.map(item => item.main.temp_max));
    const min = Math.min(...items.map(item => item.main.temp_min));

    return `
      <article class="daily-item">
        <div class="day">${formatDay(noon.dt)}</div>
        <img src="${getIconUrl(noon.weather[0].icon)}" alt="${noon.weather[0].description}">
        <div class="desc">${noon.weather[0].description}</div>
        <div class="range">
          <strong>${Math.round(max)}°</strong>
          <span class="low">${Math.round(min)}°</span>
        </div>
      </article>
    `;
  }).join("");
}

/* ---------------------------------------------------------
   기온 그래프
--------------------------------------------------------- */
function renderTemperatureChart(list) {
  const items = list.slice(0, 8);
  const temps = items.map(item => item.main.temp);

  const min = Math.min(...temps);
  const max = Math.max(...temps);
  const range = Math.max(max - min, 1);

  els.tempChart.innerHTML = items.map(item => {
    const height = 22 + ((item.main.temp - min) / range) * 68;

    return `
      <div class="chart-bar-wrap">
        <div class="chart-bar" style="height:${height}%">
          <span class="chart-value">${Math.round(item.main.temp)}°</span>
        </div>
        <span class="chart-label">${formatForecastTime(item.dt)}</span>
      </div>
    `;
  }).join("");
}

/* ---------------------------------------------------------
   관심 도시
--------------------------------------------------------- */
els.favoriteBtn.addEventListener("click", () => {
  if (!currentCity) return;

  const favorites = getFavorites();
  const exists = favorites.some(
    city => city.name === currentCity.name && city.country === currentCity.country
  );

  if (exists) {
    const filtered = favorites.filter(
      city => !(city.name === currentCity.name && city.country === currentCity.country)
    );
    saveFavorites(filtered);
  } else {
    favorites.push(currentCity);
    saveFavorites(favorites);
  }

  updateFavoriteButton();
  renderFavorites();
});

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem("weather-favorites")) || [];
  } catch {
    return [];
  }
}

function saveFavorites(favorites) {
  localStorage.setItem("weather-favorites", JSON.stringify(favorites));
}

function renderFavorites() {
  const favorites = getFavorites();

  if (!favorites.length) {
    els.favoritesList.innerHTML =
      `<div class="empty">아직 저장된 관심 도시가 없습니다.</div>`;
    return;
  }

  els.favoritesList.innerHTML = favorites.map(city => `
    <article class="favorite-item">
      <button class="favorite-city" data-lat="${city.lat}" data-lon="${city.lon}">
        <strong>${city.name}</strong>
        <small>${city.country}</small>
      </button>
      <div class="favorite-actions">
        <button type="button" data-load="${city.name}" aria-label="${city.name} 불러오기">보기</button>
        <button type="button" data-remove="${city.name}" aria-label="${city.name} 삭제">삭제</button>
      </div>
    </article>
  `).join("");

  els.favoritesList.querySelectorAll("[data-load]").forEach(button => {
    button.addEventListener("click", () => loadCityWeather(button.dataset.load));
  });

  els.favoritesList.querySelectorAll("[data-remove]").forEach(button => {
    button.addEventListener("click", () => {
      const updated = getFavorites().filter(city => city.name !== button.dataset.remove);
      saveFavorites(updated);
      renderFavorites();
      updateFavoriteButton();
    });
  });
}

function updateFavoriteButton() {
  if (!currentCity) return;

  const exists = getFavorites().some(
    city => city.name === currentCity.name && city.country === currentCity.country
  );

  els.favoriteBtn.textContent = exists ? "★ 저장됨" : "☆ 관심 도시";
  els.favoriteBtn.classList.toggle("active", exists);
}

/* ---------------------------------------------------------
   인기 도시 / 자동완성
--------------------------------------------------------- */
function renderPopularCities() {
  els.popularCities.innerHTML = popularCities.map(city => `
    <button class="city-chip" type="button" data-city="${city.en}">
      ${city.ko}
    </button>
  `).join("");

  els.popularCities.querySelectorAll("[data-city]").forEach(button => {
    button.addEventListener("click", () => {
      loadCityWeather(button.dataset.city);
    });
  });
}

function renderSuggestions(keyword) {
  if (!keyword) {
    hideSuggestions();
    return;
  }

  const matches = Object.keys(koreaCities)
    .filter(name => name.includes(keyword))
    .slice(0, 8);

  if (!matches.length) {
    hideSuggestions();
    return;
  }

  els.suggestions.hidden = false;
  els.suggestions.innerHTML = matches.map(name => `
    <button class="suggestion" type="button" data-city="${name}">
      <strong>${name}</strong> <span>· 대한민국</span>
    </button>
  `).join("");

  els.suggestions.querySelectorAll("[data-city]").forEach(button => {
    button.addEventListener("click", () => {
      els.cityInput.value = button.dataset.city;
      hideSuggestions();
      loadCityWeather(button.dataset.city);
    });
  });
}

function hideSuggestions() {
  els.suggestions.hidden = true;
  els.suggestions.innerHTML = "";
}

/* ---------------------------------------------------------
   날짜 / 시간
--------------------------------------------------------- */
function formatForecastTime(timestamp) {
  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(new Date(timestamp * 1000));
}

function formatDay(timestamp) {
  return new Intl.DateTimeFormat("ko-KR", {
    weekday: "short",
    month: "numeric",
    day: "numeric"
  }).format(new Date(timestamp * 1000));
}

function formatTime(timestamp, timezoneOffset) {
  const utc = timestamp * 1000;
  const local = new Date(utc + timezoneOffset * 1000);

  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(local);
}

function capitalize(text) {
  if (!text) return "-";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function setStatus(message, isError = false) {
  els.status.textContent = message;
  els.status.classList.toggle("error", isError);
}

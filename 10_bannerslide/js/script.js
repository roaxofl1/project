/* ========================================
   설화수 추천 제품 Swiper
======================================== */

const recommendSwiper = new Swiper(".recommend-swiper", {

    /* 한 화면에 제품 3개 */
    slidesPerView: 3,

    /* 제품 사이 간격 */
    spaceBetween: 22,

    /* ★ 한 번에 3개씩 이동 */
    slidesPerGroup: 1,

    /* ★ 무한 반복 */
    loop: true,

    /* 3초마다 자동 재생 */
    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    },

    /* 좌우 버튼 */
    navigation: {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next"
    },

    /* 슬라이드 이동 속도 */
    speed: 700
});


/* ========================================
   진행 상태바
======================================== */

const progressBar = document.querySelector(".progress-bar");


/* ========================================
   진행 상태 업데이트
======================================== */

function updateProgress() {

    /*
        총 제품은 6개

        1번째 위치 → 1/6
        2번째 위치 → 2/6
        3번째 위치 → 3/6
        4번째 위치 → 4/6
        5번째 위치 → 5/6
        6번째 위치 → 6/6
    */

    const totalSlides = 6;

    /* 현재 슬라이드 위치 */
    const currentIndex = recommendSwiper.realIndex;

    /* 진행률 계산 */
    const progress =
        ((currentIndex + 1) / totalSlides) * 100;

    /* 진행바 길이 변경 */
    progressBar.style.width = progress + "%";
}


/* ========================================
   슬라이드가 움직일 때 진행바 변경
======================================== */

recommendSwiper.on("slideChange", function () {

    updateProgress();

});


/* ========================================
   처음 로딩됐을 때 진행바
======================================== */

updateProgress();

/* ========================================
   최초 로딩
======================================== */

updateProgress();


/* ========================================
   일시정지 / 재생 버튼
======================================== */

const pauseBtn = document.querySelector(".pause-btn");

const pauseIcon = pauseBtn.querySelector(".pause-icon");
const playIcon = pauseBtn.querySelector(".play-icon");

let isPlaying = true;


/* ========================================
   버튼 클릭
======================================== */

pauseBtn.addEventListener("click", function () {

    /* 현재 재생 중이면 */
    if (isPlaying === true) {

        /* 자동재생 정지 */
        recommendSwiper.autoplay.stop();

        /* 일시정지 아이콘 숨기기 */
        pauseIcon.style.display = "none";

        /* 재생 아이콘 보여주기 */
        playIcon.style.display = "block";

        /* 상태 변경 */
        isPlaying = false;

    }

    /* 현재 정지 상태라면 */
    else {

        /* 자동재생 다시 시작 */
        recommendSwiper.autoplay.start();

        /* 재생 아이콘 숨기기 */
        playIcon.style.display = "none";

        /* 일시정지 아이콘 보여주기 */
        pauseIcon.style.display = "block";

        /* 상태 변경 */
        isPlaying = true;

    }

});
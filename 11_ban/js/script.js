/* ========================================
   BANNER SWIPER
======================================== */

const bannerSwiper = new Swiper(".banner-swiper", {

    /* 한 화면에 한 장 */
    slidesPerView: 1,

    /* 한 번에 한 장 이동 */
    slidesPerGroup: 1,

    /* 무한 반복 */
    loop: true,

    /* 슬라이드 속도 */
    speed: 700,


    /* ========================================
       자동재생
    ======================================== */

    autoplay: {

        /* 3초마다 실행 */
        delay: 3000,

        /* 버튼을 눌러도 자동재생 유지 */
        disableOnInteraction: false

    },


    /* ========================================
       좌우 버튼
    ======================================== */

    navigation: {

        prevEl: ".banner-prev",

        nextEl: ".banner-next"

    }

});


/* ========================================
   BANNER 페이지 숫자
======================================== */

const currentPage =
    document.querySelector(".current-page");


/* ========================================
   페이지 번호 변경
======================================== */

function updatePageNumber() {

    const page =
        bannerSwiper.realIndex + 1;

    currentPage.textContent = page;
}


/* ========================================
   슬라이드 변경 시
======================================== */

bannerSwiper.on("slideChange", function () {

    updatePageNumber();

});


/* ========================================
   최초 실행
======================================== */

updatePageNumber();



/* ========================================
   PRODUCT SWIPER
======================================== */

/* ========================================
   PRODUCT SWIPER
======================================== */

const productSwiper = new Swiper(".product-swiper", {

    /* 카드 실제 크기 280px을 유지 */
    slidesPerView: "auto",

    /* 카드 사이 간격 */
    spaceBetween: 14,

    /* 한 번에 1개씩 이동 */
    slidesPerGroup: 1,

    /* 무한 반복 */
    loop: true,

    /* 자동재생 */
    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    },

    /* 슬라이드 이동 속도 */
    speed: 600,

    /* 좌우 버튼 */
    navigation: {
        prevEl: ".product-prev",
        nextEl: ".product-next"
    }

});
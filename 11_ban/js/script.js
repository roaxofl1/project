/* ========================================
   BANNER SWIPER
======================================== */

const bannerSwiper = new Swiper(".banner-swiper", {

    /* 한 화면에 슬라이드 1개 */
    slidesPerView: 1,

    /* 한 번에 한 장씩 이동 */
    slidesPerGroup: 1,

    /* 무한 반복 */
    loop: true,

    /* 슬라이드 이동 속도 */
    speed: 700,

    /* ========================================
       자동재생
    ======================================== */

    autoplay: {
        delay: 3000,

        /* 버튼을 눌러도 자동재생 유지 */
        disableOnInteraction: false
    },

    /* ========================================
       ★ 배너 전용 좌우 버튼
    ======================================== */

 navigation: {
    prevEl: ".banner-prev",
    nextEl: ".banner-next"
}

});


/* ========================================
   배너 페이지 숫자
======================================== */

const currentPage =
    document.querySelector(".current-page");


/* ========================================
   현재 페이지 번호 변경
======================================== */

function updatePageNumber() {

    /* loop 상태에서도 실제 슬라이드 번호 확인 */
    const page = bannerSwiper.realIndex + 1;

    currentPage.textContent = page;

}


/* ========================================
   배너 슬라이드 변경
======================================== */

bannerSwiper.on("slideChange", function () {

    updatePageNumber();

});


/* ========================================
   처음 로딩했을 때 페이지 번호
======================================== */

updatePageNumber();



/* ========================================
   PRODUCT SWIPER
======================================== */

const productSwiper = new Swiper(".product-swiper", {
/* ========================================
   한 화면에 4개
   카드 크기를 직접 지정하기 위해 auto 사용
======================================== */

slidesPerView: "auto",

/* 카드 사이 간격 */
spaceBetween: 14,

/* 한 번에 1개 이동 */
slidesPerGroup: 1,

    /* 무한 반복 */
    loop: true,

    /* ========================================
       자동재생
    ======================================== */

    autoplay: {
        delay: 3000,

        /* 버튼 클릭 후에도 자동재생 유지 */
        disableOnInteraction: false
    },

    /* 슬라이드 이동 속도 */
    speed: 600,

    /* ========================================
       ★ 상품 전용 좌우 버튼
    ======================================== */

    navigation: {
        prevEl: ".product-prev",
        nextEl: ".product-next"
    }

});


/* ========================================
   상품 왼쪽 버튼
======================================== */

const productPrev =
    document.querySelector(".product-prev");


/* ========================================
   상품 오른쪽 버튼
======================================== */

const productNext =
    document.querySelector(".product-next");


/* ========================================
   처음 상태

   왼쪽 → 숨김
   오른쪽 → 표시
======================================== */

productPrev.classList.remove("show");

productNext.style.display = "flex";


/* ========================================
   상품이 한 번이라도 이동하면
   왼쪽 버튼 등장
======================================== */

productSwiper.on(
    "slideChangeTransitionStart",
    function () {

        productPrev.classList.add("show");

    }
);
const swiper = new Swiper(".bannerSwiper", {

    // 방향
    direction: "horizontal",

    // 무한반복
    loop: true,

    // 속도
    speed: 600,

    // 자동재생
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
    },

    // 페이지네이션
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    // 좌우 버튼
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    // 터치 감도
    touchRatio: 1,
    grabCursor: true,

    // 슬라이드 개수
    slidesPerView: 1,

    // 간격
    spaceBetween: 0,

    // 끝에서 튕김 방지
    resistanceRatio: 0,

});
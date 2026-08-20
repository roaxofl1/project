$(function () {

    const $nav = $(".gnb > ul > li");
    const $depth2 = $(".depth2");
    const $depth2List = $(".depth2-inner > ul");


    /* =========================
       주메뉴 hover
    ========================= */

    $nav.on("mouseenter", function () {

        const index = $(this).index();

        /* 기존 active 제거 */
        $depth2List.removeClass("active");

        /* 현재 주메뉴와 같은 번호의 2단만 active */
        $depth2List.eq(index).addClass("active");

        /* 2단 메뉴 열기 */
        $depth2
            .stop(true, true)
            .slideDown(300);

    });


    /* =========================
       2단 메뉴 안으로 이동
    ========================= */

    $depth2.on("mouseenter", function () {

        $depth2.stop(true, true);

    });


    /* =========================
       전체 메뉴 영역에서 빠져나감
    ========================= */

    $(".nav-wrap").on("mouseleave", function () {

        $depth2
            .stop(true, true)
            .slideUp(250, function () {

                $depth2List.removeClass("active");

            });

    });

});

/* ========================================
   MAIN SLIDE - SWIPER
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ========================================
       Swiper 객체 생성
    ======================================== */

    const mainSwiper = new Swiper(".mainSwiper", {

        /* 한 화면에 슬라이드 1개 */
        slidesPerView: 1,

        /* 무한 반복 */
        loop: true,

        /* 슬라이드 이동 속도 */
        speed: 700,

        /* ========================================
           자동 슬라이드
           3초마다 다음 이미지로 이동
        ======================================== */

        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },

        /* ========================================
           좌우 버튼
        ======================================== */

        navigation: {
            nextEl: ".slide-next",
            prevEl: ".slide-prev"
        }

    });


    /* ========================================
       현재 페이지 번호
    ======================================== */

    const currentPage =
        document.querySelector(".slide-page .current");


    /* ========================================
       슬라이드 변경될 때 번호 변경
    ======================================== */

    mainSwiper.on("slideChange", function () {

        currentPage.textContent =
            mainSwiper.realIndex + 1;

    });

});
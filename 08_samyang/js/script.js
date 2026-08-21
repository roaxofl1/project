$(function () {

    /* ========================================
       HEADER MENU
    ======================================== */

    const $nav = $(".gnb > ul > li");
    const $depth2 = $(".depth2");
    const $depth2List = $(".depth2-inner > ul");


    /* =========================
       주메뉴 hover
    ========================= */

    $nav.on("mouseenter", function () {

        const index = $(this).index();

        /* 모든 주메뉴 active 제거 */
        $nav.removeClass("active");

        /* 현재 주메뉴 active */
        $(this).addClass("active");

        /* 모든 2단 메뉴 active 제거 */
        $depth2List.removeClass("active");

        /* 현재 주메뉴와 같은 번호의 2단 메뉴 */
        $depth2List.eq(index).addClass("active");

        /* 2단 메뉴 열기 */
        $depth2
            .stop(true, true)
            .slideDown(300);

    });


    /* =========================
       2단 메뉴 hover
    ========================= */

    $depth2List.on("mouseenter", function () {

        const index = $(this).index();

        /* 주메뉴 active 변경 */
        $nav.removeClass("active");

        $nav.eq(index).addClass("active");

        /* 2단 메뉴 active 변경 */
        $depth2List.removeClass("active");

        $(this).addClass("active");

    });


    /* =========================
       2단 메뉴 영역 hover
    ========================= */

    $depth2.on("mouseenter", function () {

        $depth2.stop(true, true);

    });


    /* =========================
       전체 메뉴 영역에서
       마우스가 빠져나갔을 때
    ========================= */

    $(".nav-wrap").on("mouseleave", function () {

        $depth2
            .stop(true, true)
            .slideUp(250, function () {

                /* 주메뉴 active 제거 */
                $nav.removeClass("active");

                /* 2단 메뉴 active 제거 */
                $depth2List.removeClass("active");

            });

    });

});



/* ========================================
   MAIN SLIDE - SWIPER
======================================== */

$(function () {

    /* ========================================
       Swiper 생성
    ======================================== */

    const mainSwiper = new Swiper(".mainSwiper", {

        /* 한 화면에 하나 */
        slidesPerView: 1,

        /* 무한 반복 */
        loop: true,

        /* 이동 속도 */
        speed: 700,


        /* ========================================
           자동재생

           3초마다 다음 슬라이드
        ======================================== */

        autoplay: {

            delay: 3000,

            /* 버튼을 눌러도 자동재생 유지 */
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
       페이지 번호
    ======================================== */

    const currentPage =
        document.querySelector(".slide-page .current");


    /* ========================================
       슬라이드 변경 시 페이지 번호 변경
    ======================================== */

    mainSwiper.on("slideChange", function () {

        currentPage.textContent =
            mainSwiper.realIndex + 1;

    });

});



/* ========================================
   BRAND TAB
======================================== */

$(function () {

    /* ========================================
       TAB 버튼 클릭
    ======================================== */

    $(".tab-btn").on("click", function () {

        /* 클릭한 버튼의 data-tab 가져오기 */
        const tabId = $(this).data("tab");


        /* ========================================
           모든 TAB 버튼 비활성화
        ======================================== */

        $(".tab-btn").removeClass("active");


        /* 클릭한 TAB 활성화 */
        $(this).addClass("active");


        /* ========================================
           모든 TAB 내용 숨기기
        ======================================== */

        $(".tab-content").removeClass("active");


        /* ========================================
           선택한 TAB 내용 표시
        ======================================== */

        $("#" + tabId).addClass("active");

    });

});
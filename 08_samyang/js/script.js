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

/* ========================================
   FAMILY SITE
======================================== */

$(".family-btn").on("click", function () {

    $(".family-list").stop(true, true).slideToggle(200);

});

/* ========================================
   팝업창
======================================== */

$(function () {

    const $popup = $("#popup");
    const $popupClose = $("#popupClose");
    const $popupCloseBottom = $("#popupCloseBottom");
    const $todayClose = $("#todayClose");


    /* ========================================
       팝업 닫기 함수
    ======================================== */

// ========================================
// 팝업 닫기
// ========================================

// X 버튼 클릭
$("#popupClose").on("click", function () {

    // 팝업창 닫기
    $("#popup").hide();

    // 어두운 배경도 같이 닫기
    $(".popup-bg").hide();

});


// [닫기] 버튼 클릭
$("#popupCloseBottom").on("click", function () {

    // 팝업창 닫기
    $("#popup").hide();

    // 어두운 배경도 같이 닫기
    $(".popup-bg").hide();

});

    /* ========================================
       X 버튼 클릭
    ======================================== */

    $popupClose.on("click", function () {

        closePopup();

    });


    /* ========================================
       [닫기] 버튼 클릭
    ======================================== */

    $popupCloseBottom.on("click", function () {

        /* 체크되어 있으면 오늘 하루 동안 다시 열지 않음 */

        if ($todayClose.is(":checked")) {

            /* 오늘 날짜를 저장 */
            const today = new Date().toDateString();

            localStorage.setItem("popupToday", today);

        }

        closePopup();

    });


    /* ========================================
       페이지가 열릴 때
       오늘 하루 닫기를 확인
    ======================================== */

    const savedDate = localStorage.getItem("popupToday");

    const today = new Date().toDateString();


    /* 저장된 날짜가 오늘이면 팝업 숨기기 */

    if (savedDate === today) {

        $popup.hide();

    } else {

        /* 오늘이 아니면 팝업 보여주기 */

        $popup.show();

    }

});

/* ========================================
   TOP 버튼
======================================== */

$(function () {

    $("#topBtn").on("click", function () {

        // 페이지 맨 위로 부드럽게 이동
        $("html, body").animate({
            scrollTop: 0
        }, 600);

    });

});
/* ========================================
   SCROLL HEADER + TOP BUTTON
======================================== */

$(window).on("scroll", function () {

    /* 현재 스크롤 위치 */
    const scrollTop = $(window).scrollTop();


    /* ========================================
       HEADER 고정
       
       스크롤이 조금이라도 내려가면
       header를 고정
    ======================================== */

    if (scrollTop > 0) {

        $("#header").addClass("fixed");

    } else {

        $("#header").removeClass("fixed");

    }


    /* ========================================
       TOP 버튼 표시
       
       300px 이상 스크롤하면 표시
    ======================================== */

    if (scrollTop > 300) {

        $("#topBtn").addClass("show");

    } else {

        $("#topBtn").removeClass("show");

    }

});
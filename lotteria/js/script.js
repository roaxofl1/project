$(function () {

    /* ========================================
       HEADER 2단 메뉴
    ======================================== */

    const $header = $("#header");
    const $gnb = $(".gnb");
    const $depth2Bg = $(".depth2-bg");
    const $depth2 = $(".depth2");


    /* ----------------------------------------
       주메뉴에 마우스를 올렸을 때
       전체 2단 메뉴 OPEN
    ---------------------------------------- */

    $gnb.on("mouseenter", function () {

        // 전체 2단 배경
        $depth2Bg
            .stop(true, true)
            .slideDown(250);

        // 모든 2단 메뉴
        $depth2
            .stop(true, true)
            .slideDown(250);

    });


    /* ----------------------------------------
       GNB에서 마우스가 빠져나갔을 때
       전체 2단 메뉴 CLOSE
    ---------------------------------------- */

    $header.on("mouseleave", function () {

        $depth2Bg
            .stop(true, true)
            .slideUp(200);

        $depth2
            .stop(true, true)
            .slideUp(200);

    });


    /* ----------------------------------------
       2단 메뉴 마우스 hover
       글자색 #43b9c7
    ---------------------------------------- */

    $(".depth2 a").on("mouseenter", function () {

        $(this).css("color", "#43b9c7");

    });

    $(".depth2 a").on("mouseleave", function () {

        if (!$(this).hasClass("point")) {
            $(this).css("color", "#333");
        }

    });

});

$(function () {

    /* ==================================================
       SWIPER
    ================================================== */

    const mainSwiper = new Swiper(".mainSwiper", {

        // 한 번에 1장
        slidesPerView: 1,

        // 슬라이드 방향
        direction: "horizontal",

        // 무한 반복
        loop: true,

        // 3초마다 자동 재생
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },

        // 부드러운 이동
        speed: 600,

    });


    /* ==================================================
       현재 페이지 표시
    ================================================== */

    function updateCount() {

        let current = mainSwiper.realIndex + 1;

        $(".slide-count .current").text(current);

    }

    updateCount();


    /* ==================================================
       슬라이드 변경 시 숫자 변경
    ================================================== */

    mainSwiper.on("slideChange", function () {

        updateCount();

    });


    /* ==================================================
       이전 버튼
    ================================================== */

    $(".slide-prev").on("click", function () {

        mainSwiper.slidePrev();

    });


    /* ==================================================
       다음 버튼
    ================================================== */

    $(".slide-next").on("click", function () {

        mainSwiper.slideNext();

    });


    /* ==================================================
       일시정지 / 재생
    ================================================== */

    let isPaused = false;

    $(".slide-pause").on("click", function () {

        if (isPaused === false) {

            mainSwiper.autoplay.stop();

            $(this).find("span").text("▶");

            isPaused = true;

        } else {

            mainSwiper.autoplay.start();

            $(this).find("span").text("Ⅱ");

            isPaused = false;

        }

    });

});

/* ==================================================
   지금 바로 쓸 수 있는 쿠폰 SLIDE
================================================== */

const couponSwiper = new Swiper(".coupon-swiper", {

    /* 한 화면에 4개 */
    slidesPerView: 4,

    /* 한 번에 1개씩 이동 */
    slidesPerGroup: 1,

    /* 카드 사이 간격 */
    spaceBetween: 12,

    /* 무한 반복 */
    loop: true,

    /* 3초마다 자동 슬라이드 */
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },

    /* 좌우 버튼 */
    navigation: {
        prevEl: ".coupon-prev",
        nextEl: ".coupon-next",
    },

    /* 슬라이드 변경 감지 */
    on: {

        init: function () {
            /* 처음에는 왼쪽 버튼 숨김 */
            document.querySelector(".coupon-prev").style.display = "none";
        },

        slideChange: function () {
            /* 한 번이라도 이동하면 왼쪽 버튼 표시 */
            document.querySelector(".coupon-prev").style.display = "block";
        }

    }

});

/* ========================================
   이달의 핫메뉴 TAB
======================================== */

$(function () {

    /* ----------------------------------------
       TAB별 메인 카드 이미지 경로
    ---------------------------------------- */

    const mainImages = {

        lotte: "./images/imgi_11_hot_lotteria.png",

        krispy: "./images/imgi_23_hot_krispy.png",

        plating: "./images/imgi_25_hot_pleeating.png",

        angel: "./images/imgi_17_hot_angelinus.png"

    };


    /* ----------------------------------------
       처음 화면
       → 롯데리아 TAB
    ---------------------------------------- */

    $(".hot-main-bg").css(
        "background-image",
        "url('" + mainImages.lotte + "')"
    );


    /* ----------------------------------------
       TAB 클릭
    ---------------------------------------- */

    $(".tab-btn").on("click", function () {

        /* 클릭한 TAB */
        const tabName = $(this).data("tab");


        /* TAB 버튼 변경 */
        $(".tab-btn").removeClass("active");
        $(this).addClass("active");


        /* 상품 내용 변경 */
        $(".product-list").removeClass("active");
        $("#" + tabName).addClass("active");


        /* ------------------------------------
           ★ 왼쪽 큰 카드 이미지 변경
        ------------------------------------ */

        $(".hot-main-bg").css(
            "background-image",
            "url('" + mainImages[tabName] + "')"
        );

    });

});

/* ========================================
   FAMILY SITE DROPDOWN
   삼양 때 사용했던 방식
======================================== */

$(function () {

    const $familyBtn = $(".family-btn");
    const $familyList = $(".family-list");


    /* ----------------------------------------
       Family Site 버튼 클릭
    ---------------------------------------- */

    $familyBtn.on("click", function (e) {

        e.stopPropagation();

        $familyList
            .stop(true, true)
            .slideToggle(200);

    });


    /* ----------------------------------------
       Family Site 외부 클릭 시 닫기
    ---------------------------------------- */

    $(document).on("click", function () {

        $familyList
            .stop(true, true)
            .slideUp(200);

    });


    /* ----------------------------------------
       목록 클릭 시 부모로 이벤트 전파 방지
    ---------------------------------------- */

    $familyList.on("click", function (e) {

        e.stopPropagation();

    });

});

/* ========================================
   TOP 버튼
======================================== */

$(function () {

    const $topBtn = $(".top-btn");


    /* ----------------------------------------
       스크롤 위치에 따라 TOP 버튼 표시
    ---------------------------------------- */

    $(window).on("scroll", function () {

        if ($(window).scrollTop() > 100) {

            $topBtn.fadeIn(200);

        } else {

            $topBtn.fadeOut(200);

        }

    });


    /* ----------------------------------------
       TOP 버튼 클릭
       → 페이지 맨 위로 부드럽게 이동
    ---------------------------------------- */

    $topBtn.on("click", function () {

        $("html, body").animate({
            scrollTop: 0
        }, 600);

    });

});
$(function () {

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
       2단 메뉴 영역에 마우스가
       들어와 있는 동안 메뉴 유지
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
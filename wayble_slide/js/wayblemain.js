document.addEventListener('DOMContentLoaded', () => {
    // 1. 슬라이드 메뉴 컨트롤 Element
    const btnHamburger = document.getElementById('btn-hamburger');
    const btnCloseMenu = document.getElementById('btn-close-menu');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    // 사이드바 열기
    function openSidebar() {
        sidebarMenu.classList.add('active');
        sidebarOverlay.classList.add('active');
    }

    // 사이드바 닫기
    function closeSidebar() {
        sidebarMenu.classList.remove('active');
        sidebarOverlay.classList.remove('active');
    }

    // 이벤트 리스너 바인딩
    if (btnHamburger) btnHamburger.addEventListener('click', openSidebar);
    if (btnCloseMenu) btnCloseMenu.addEventListener('click', closeSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

    // 2. Swiper 배너 슬라이더 초기화
    const mainBannerSwiper = new Swiper('.main-banner-swiper', {
        loop: true,               // 무한 반복
        autoplay: {
            delay: 3000,          // 3초마다 슬라이드
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,      // 불릿 클릭 제어 가능
        },
    });
});
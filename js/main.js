const swiper = new Swiper('.swiper', {
  // Optional parameters
//   슬라이드 애니메이션 방향
//   direction: 'horizontal',

    // fade in out 
    effect:'fade',

loop: true,
//   자동으로 슬라이드 실행
 autoplay: {
    delay: 3000,          // 3초마다 자동 넘김
    disableOnInteraction: false, // 사용자가 터치해도 계속 자동재생
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    // 페이지버튼에 하이퍼링크 설정
    clickable:true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});
// fadeOut 버튼
$(".fadeOutBtn").click(function() {
    $(".box1").fadeOut();
});


// fadeIn 버튼
$(".fadeInBtn").click(function() {
    $(".box1").fadeIn();
});


// fadeToggle 버튼
$(".fadeToggleBtn").click(function() {
    $(".box2").fadeToggle();
});


// slideUp 버튼
$(".slideUpBtn").click(function() {
    $(".box4").slideUp();
});


// slideDown 버튼
$(".slideDownBtn").click(function() {
    $(".box4").slideDown();
});


// slideToggle 버튼
$(".slideToggleBtn").click(function() {
    $(".box5").slideToggle();
});


// ani1 버튼
$(".ani1Btn").click(function() {
    $(".box6").animate({
        left: "500px"
    }, 1000);
});


// ani2 버튼
$(".ani2Btn").click(function() {
    $(".box6").animate({
        left: "0px"
    }, 1000);
});
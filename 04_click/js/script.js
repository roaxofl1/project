// fadeOut
$(".fadeOutBtn").click(function() {

    $(".box1").fadeOut();

});


// fadeIn
$(".fadeInBtn").click(function() {

    $(".box1").fadeIn();

});


// fadeToggle
$(".fadeToggleBtn").click(function() {

    $(".box2").fadeToggle();

});


// slideUp
$(".slideUpBtn").click(function() {

    $(".box4").slideUp();

});


// slideDown
$(".slideDownBtn").click(function() {

    $(".box4").slideDown();

});


// slideToggle
$(".slideToggleBtn").click(function() {

    $(".box5").slideToggle();

});


// ani1
$(".ani1Btn").click(function() {

    $(".box6").animate({
        left: "500px"
    }, 1000);

});


// ani2
$(".ani2Btn").click(function() {

    $(".box6").animate({
        left: "0px"
    }, 1000);

});
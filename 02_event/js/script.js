// 제이쿼리!

$(function(){
$(".bt1").click(function(){
    // 실행 코드 입력 칸!!!
    $(".parent .box1").hide()
})


$("#bt2").click(function(){
    $(".parent .box1").show()
})

$("#bt3").click(function(){
    $(".box2").toggle()
})

$("#bt4").click(function(){
    $(".box3").width(400)
    $(".box3").height(400)
})

$("#bt5").click(function(){
    $(".box3").width(200)
    $(".box3").height(200)
})

})
let showBtn = document.querySelector(".showBtn");
let hideBtn = document.querySelector(".hideBtn");
let toggleBtn = document.querySelector(".toggleBtn");
let bigBtn = document.querySelector(".bigBtn");
let smallBtn = document.querySelector(".smallBtn");

let box1 = document.querySelector(".box1");
let box2 = document.querySelector(".box2");
let box3 = document.querySelector(".box3");


// Show
showBtn.addEventListener("click", function() {
    box1.style.display = "block";
});


// Hide
hideBtn.addEventListener("click", function() {
    box1.style.display = "none";
});


// Toggle
toggleBtn.addEventListener("click", function() {
    if (box2.style.display === "none") {
        box2.style.display = "block";
    } else {
        box2.style.display = "none";
    }
});


// Big
bigBtn.addEventListener("click", function() {
    box3.style.width = "400px";
    box3.style.height = "400px";
});


// Small
smallBtn.addEventListener("click", function() {
    box3.style.width = "200px";
    box3.style.height = "200px";
});
const scriptURL =
  "https://script.google.com/macros/s/AKfycbxpUL_0jFlC5yJS01LwUpr5LH9daEJ4GvtxXwWcOZ87oLjRXQHwInJXYWHKu1yECk9y/exec";

const form = document.forms["submit-to-google-sheet"];

console.log("scriptURL:", scriptURL);
console.log("form:", form);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form)
  })
    .then((response) => {
      console.log("Google Sheets 전송 완료");

      const msg = document.getElementById("msg");
      msg.innerHTML = "Message sent successfully";

      setTimeout(() => {
        msg.innerHTML = "";
      }, 5000);

      form.reset();
    })
    .catch((error) => {
      console.error("전송 에러:", error);
    });
});
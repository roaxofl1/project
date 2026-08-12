```javascript
const scriptURL =
  "https://script.google.com/macros/s/AKfycbxpUL_0jFlC5yJS01LwUpr5LH9daEJ4GvtxXwWcOZ87oLjRXQHwInJXYWHKu1yECk9y/exec";

const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form)
  })
    .then((response) => {
      msg.innerHTML = "Message sent successfully";

      setTimeout(function () {
        msg.innerHTML = "";
      }, 5000);

      form.reset();
    })
    .catch((error) => {
      console.error("Error!", error.message);
      msg.innerHTML = "전송에 실패했습니다.";
    });
});
```

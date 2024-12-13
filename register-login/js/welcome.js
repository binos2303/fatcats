//Lấy dữ liệu trên localstorage
const userLogin = JSON.parse(localStorage.getItem("userLogin"));

const userLoginElement = document.getElementById("userLogin");

userLoginElement.innerHTML = userLogin.userName;
setTimeout(function() {
    window.location.href = "/fatcats/index.html";             
 }, 6000); 

 
// Elements của trang
const formRegister = document.getElementById("formRegister");
const userNameElement = document.getElementById("userName");
const emailElement = document.getElementById("email");
const passwordElement = document.getElementById("password");
const repasswordElement = document.getElementById("repassword");


// Elements lỗi
const userNameError = document.getElementById("userNameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const repasswordError = document.getElementById("repasswordError");

// Lấy dữ liệu từ localStorage
const userLocal = JSON.parse(localStorage.getItem("users")) || [];

/**
 * Validate địa chỉ email
 * @param {*} email: Chuỗi Email người dùng nhập vào
 * @returns: Dữ liệu nếu email đúng định dạng, undifuned nếu email không đúng định dạng
 * Author: LeMinhPhuc(11/1/2024)
 */
function validateEmail(email){
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
formRegister.addEventListener("submit", function(e){
    e.preventDefault();
    
    if(!userNameElement.value){
        //Hiển thị lỗi
        userNameError.style.display="block";
    } else{
        //Ẩn lỗi
        userNameError.style.display="none";
    }

    if(!emailElement.value){
    //Hiển thị lỗi
    emailError.style.display="block";
}  else{
    //Ẩn lỗi
    emailError.style.display="none";
     //Kiểm tra định dạng email
     if(!validateEmail(emailElement.value)){
     //Hiển thị lỗi
     emailError.style.display="block";
     emailError.innerHTML = "Email không đúng định dạng";
     }
}
    if(!passwordElement.value){
    //Hiển thị lỗi
    passwordError.style.display="block";
}  else{
    //Ẩn lỗi
    passwordError.style.display="none";
}
   if(!repasswordElement.value){
    //Hiển thị lỗi
    repasswordError.style.display="block";
}  else{
    //Ẩn lỗi
    repasswordError.style.display="none";
}

    //Kiểm tra mật khẩu - Nhập lại mật khẩu
    if(passwordElement.value !== repasswordElement.value){
        repasswordError.style.display = "block";
        repasswordError.innerHTML = "Mật khẩu không khớp";
    }

   //Gửi dữ liệu lên localStorage
   if(userNameElement.value && emailElement.value && passwordElement.value && repasswordElement.value && passwordElement.value === repasswordElement.value && validateEmail(emailElement.value)){
    //Lấy dữ liệu gộp thành một đối tượng user
    const user={
        userId: Math.ceil(Math.random() * 100000000),
        userName: userNameElement.value,
        email: emailElement.value,
        password: passwordElement.value,
        
        
    };
    //Push user vào trong mảng userLocal
    userLocal.push(user);

    //Lưu trữ lên local
    localStorage.setItem("users", JSON.stringify(userLocal))

    //Chuyển về trang đăng nhập
    setTimeout(function(){
        window.location.href = "login.html";
    }, 500)
   }
});

// Chọn tất cả các biểu tượng mắt
const eyesOpen = document.querySelectorAll(".fa-eye");
const eyesClose = document.querySelectorAll(".fa-eye-slash");

eyesOpen.forEach((eye, index) => {
    eye.addEventListener("click", function () {
        eye.style.display = "none";
        eyesClose[index].style.display = "block";
        eye.previousElementSibling.previousElementSibling.type = "text"; // Đổi mật khẩu sang text để hiện mật khẩu
    });
});

eyesClose.forEach((eye, index) => {
    eye.addEventListener("click", function () {
        eye.style.display = "none";
        eyesOpen[index].style.display = "block";
        eye.previousElementSibling.previousElementSibling.previousElementSibling.type = "password"; // Đổi mật khẩu lại thành kiểu password
    });
});
// Element của trang
const formLogin = document.getElementById("formLogin");
const emailElement = document.getElementById("email");
const passwordElement = document.getElementById("password");
const repasswordElement = document.getElementById("repassword");
const eyeOpen = document.getElementsByClassName("fa-eye")[0];
const eyeClose = document.getElementsByClassName("fa-eye-slash")[0];
const alertError = document.getElementById("alertError");


// Lắng nghe sự kiện submit form đăng nhập tài khoản
formLogin.addEventListener("submit",function(e){
    e.preventDefault();
    
    //Validate dữ liệu đầu vào

    // Lấy dữ liệu từ local về
    const userLocal = JSON.parse(localStorage.getItem("users")) || [];

    //Tìm kiếm email và mật khẩu người dùng nhập vào có tồn tại trên local?
    const finduser = userLocal.find(
        (user) => 
            user.email === emailElement.value && 
            user.password === passwordElement.value
     );
    if(!finduser){
        alertError.style.display = "block";
    } else{
        setTimeout(function() {
            window.location.href = "././index.html";             
         }, 500); 
    //lưu thông tin của user đăng nhập lên local
    const exit= JSON.parse(localStorage.getItem("checkLogin"));
    exit.check=1;
    localStorage.setItem("checkLogin", JSON.stringify(exit));
    localStorage.setItem("userLogin", JSON.stringify(finduser));
  }
})

eyeOpen.addEventListener("click", function(){
    eyeOpen.style.display="none";
    eyeClose.style.display="block";
    eyeOpen.previousElementSibling.type="text";
    console.log(eyeOpen.previousElementSibling)
})
eyeClose.addEventListener("click", function(){
    eyeOpen.style.display="block";
    eyeClose.style.display="none";
    eyeOpen.previousElementSibling.type="password";
})
//cart icon & cart box
const cartBox = document.querySelector(".cart_box");
const menuBox = document.querySelector(".menu__box");
const overlay = document.querySelector(".overlay");
const iconCart = document.querySelector(".icon_cart");
const closeCartIcon = document.querySelector('.cart_close-btn');
const closeMenuIcon = document.querySelector('.menu__close--btn');
const iconMenu = document.querySelector(".icon_menu");
const iconUser = document.querySelector(".icon_user");
const logoutBTN = document.querySelector(".logout__btn");
const loginInfoCell = document.querySelector(".login__info--cell");


// mở / đóng cart
function openCart() {
    cartBox.classList.add('active');
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    updatetotal();
    updateTotalQuantity();
    showCart();
}

function closeCart() {
    cartBox.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = "auto";
    updateTotalQuantity();
    updatetotal();
}

iconCart.addEventListener('click', openCart);
closeCartIcon.addEventListener('click', closeCart);
// mở đóng menu cho mobile
iconMenu.addEventListener("click", function(){
    menuBox.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
});
closeMenuIcon.addEventListener("click", function(){
    menuBox.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
});
//----------------------------------------------------

//check login hiển thị ô thông tin đăng nhập
iconUser.addEventListener("click", function(){
    iconUser.classList.add("active");
    const checkLogin=JSON.parse(localStorage.getItem("checkLogin"));
    if(localStorage.getItem("checkLogin")===null){
        const exit= {check:0};
        localStorage.setItem("checkLogin", JSON.stringify(exit));

        window.location.href="/register-login/login.html";
    }
    else if(checkLogin.check===1){
        const userLogin = JSON.parse(localStorage.getItem("userLogin"));
        let username = loginInfoCell.getElementsByClassName("info__login--name")[0].innerHTML=userLogin.userName;
        let useremail = loginInfoCell.getElementsByClassName("info__login--email")[0].innerHTML=userLogin.email;
        if(iconUser.nextElementSibling.style.display==="block"){
            iconUser.nextElementSibling.style.display="none";
            // iconUser.classList.remove("active");
        }
        else{ 
            // iconUser.classList.add("active");
            iconUser.nextElementSibling.style.display="block";
        }  
    }else{
        window.location.href="/fatcats/register-login/login.html";
        // iconUser.classList.remove("active");
    }
});
//---------------------------------------------------------------

// logout tắc ô thông tin đăng nhập
logoutBTN.addEventListener("click", function(){
    iconUser.classList.remove("active");
    const checkLogin = JSON.parse(localStorage.getItem("checkLogin"));
    checkLogin.check=0;
    localStorage.setItem("checkLogin", JSON.stringify(checkLogin));
    loginInfoCell.style.display="none";
});
//------------------------------------------------------------------
//khi nhấn bất cứ đâu thì sẽ đóng ô thông tin người dùng
document.addEventListener("click", function(event) {
    if (loginInfoCell.style.display=="block" && !loginInfoCell.contains(event.target) && event.target === iconUser) {
        loginInfoCell.style.display="none"
        iconUser.classList.remove("active");
    }
});
//----------------
// cart
updatetotal();
updateTotalQuantity();
// xoa item ra khoi cart
let removeCartButtons = document.getElementsByClassName("btn-remove");
for(let i=0; i < removeCartButtons.length;i++){
    let button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
}
//thay doi so luong cua item do
let quantityInputs = document.getElementsByClassName("cart_product-total-btn");
for(let i=0;i<quantityInputs.length;i++){
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
}
//them vao cart
let addCart = document.getElementsByClassName("addcart_icon");
for(let i=0;i<addCart.length;i++){
    let button = addCart[i];
    button.addEventListener("click", addCartClicked);
}
document
    .getElementsByClassName("cart_buy-btn")[0]
    .addEventListener("click", buyButtonClicked);

function buyButtonClicked(){
    alert("Your order is placed-Thank you!");
    let cartProductList =  document.getElementsByClassName("cart_product-list")[0];
    while(cartProductList.hasChildNodes()){
        cartProductList.removeChild(cartProductList.firstChild);
    }
    localStorage.removeItem("cartItems");
    location.reload();
    updatetotal();
    updateTotalQuantity();
    closeCart();
}
function removeCartItem(event){
    let buttonClicked = event.target;
    let elm = buttonClicked.parentElement.parentElement;
    buttonClicked.parentElement.parentElement.remove();
    let nameProduct = elm.getElementsByClassName("cart_product-name")[0].innerText;

    const newcartItems=[];
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    cartItems.forEach(item => {
        if(item.name !== nameProduct){
            newcartItems.push(item);
        }
    });
    localStorage.setItem("cartItems", JSON.stringify(newcartItems));
    updatetotal();
    updateTotalQuantity();
}
function quantityChanged(event){
    let input = event.target;
    let product = input.parentElement;
    let name = product.getElementsByClassName("cart_product-name")[0].innerText;
    if(isNaN(input.value) || input.value <=0){
        input.value =1;
    }
    const arrCart= JSON.parse(localStorage.getItem("cartItems"));
    let index = arrCart.findIndex(item => item.name === name);
    arrCart[index].quantity=input.value;
    localStorage.setItem("cartItems", JSON.stringify(arrCart));
    updatetotal();
    updateTotalQuantity();
}
function isExistedInCart(item, arrCart) {
    return arrCart.findIndex(itemCard => item.id === itemCard.id);
}

let updatedcart= [];
function addCartClicked(event){
    let button = event.target;
    let product = button.parentElement.parentElement;
    if(typeof Storage !== undefined){
        let titleProduct = product.getElementsByClassName("product_name")[0].innerText;
        let priceProduct = product.getElementsByClassName("product_prise")[0].innerText;
        let imgProduct = product.getElementsByClassName("product_img")[0].src;
        let productId = product.id;

        let newItem={
            "id": productId,
            "name" : titleProduct,
            "price": priceProduct,
            "img": imgProduct,
            "quantity": 1
        }
        if(JSON.parse(localStorage.getItem("cartItems"))===null){
            updatedcart.push(newItem);
            localStorage.setItem("cartItems",JSON.stringify(updatedcart));
        }else {
            const cartItems = JSON.parse(localStorage.getItem("cartItems"));
            if((index = isExistedInCart(newItem,cartItems))>=0){
                cartItems[index].quantity++;
            }else{
                cartItems.push(newItem);
            }
            localStorage.setItem("cartItems",JSON.stringify(cartItems));
        }
    }else {
        alert("ERROR!");
    }
    updatetotal();
    updateTotalQuantity();
}
function showCart(){
    updatetotal();
    updateTotalQuantity();
    const arrCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    let cartItems = document.getElementsByClassName("cart_product-list")[0];
    cartItems.innerHTML="";
    arrCart.forEach(item => {
        let cartProducttemp = document.createElement("div");
        cartProducttemp.classList.add("cart_product");
        let cartProductContent=`
                        <img class="cart_product-img" src="${item.img}" alt="">
                        <div class="cart_product-content">
                            <p class="cart_product-name">${item.name}</p>
                            <p class="cart_product-price">${item.price}</p>
                            <input type="number" value=${item.quantity} class="cart_product-total-btn placeholder inputmode="numeric"">
                        </div>
                        <div class="cart_product-remove">
                            <i class="fa-solid fa-trash btn-remove"></i>
                        </div>`;
        cartProducttemp.innerHTML = cartProductContent;
        cartItems.append(cartProducttemp);
        cartProducttemp
            .getElementsByClassName("btn-remove")[0]
            .addEventListener("click", removeCartItem);
        cartProducttemp
            .getElementsByClassName("cart_product-total-btn")[0]
            .addEventListener("change", quantityChanged);
    });
}
// cập nhật so luong san pham
function updateTotalQuantity(){
    const arrCart =JSON.parse(localStorage.getItem("cartItems")) || [];
    let cartProduct =document.getElementsByClassName("cart_product");
    let totalCard = document.getElementsByClassName("total_card")[0];
    totalCard.innerText = arrCart.length;
}

//cap nhat tong thanh toan
function updatetotal(){
    const cartProducts = JSON.parse(localStorage.getItem("cartItems")) || []; 
    let total=0;
    for(let i=0;i<cartProducts.length;i++){
        let cartProduct= cartProducts[i];
        let cartProductPrice = cartProduct.price;
        let cartProductQuantity = cartProduct.quantity;
        if (typeof cartProductPrice !== 'string') {
            cartProductPrice = String(cartProductPrice);
        }
        let price = parseFloat(cartProductPrice.replace(/[^0-9]/g,""));
        let quantity =parseInt (cartProductQuantity) || 0;
        total=total + (price* quantity);
    }
    total= Math.round(total * 100) / 100;
    document.getElementsByClassName("total-price")[0].innerText=total.toLocaleString('vi-VN', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) +'đ';
}
// -----------------------------------------------------------------------------------------
//acount 

// -----------------------------------------------------------------
//sldider of shop
let sliderImgs = document.getElementsByClassName("slider-img");
let currentIndex = 0;

function showSlide(index){
    for(let i=0;i<sliderImgs.length;i++){
        if(i === index){
            sliderImgs[i].classList.add("fade");
            sliderImgs[i].classList.remove("black-opaciy");
        } 
        else{
            sliderImgs[i].classList.remove("fade");
            sliderImgs[i].classList.add("black-opaciy");

        } 
    }
    
}

function runSlider(){
    showSlide(currentIndex);
    setInterval(function(){
        currentIndex=(currentIndex+1) % sliderImgs.length;
        showSlide(currentIndex);
    },3000);
}
runSlider();
//--------------------------------------

// hiệu ứng cuộn lên đầu trang
const btnBacktotop = document.querySelector("#btn_backtotop");
window.addEventListener("scroll", function(){
    if(window.scrollY > 600){
        btnBacktotop.style.display="block";
    }else{
        btnBacktotop.style.display="none";
    }
});

btnBacktotop.addEventListener("click", function(){
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
// -----------------------------------------
// classify shop page
let products =  document.getElementsByClassName("product");
let classifyLinks = document.getElementsByClassName("classify_list-link");
classifyLinks[0].classList.add("active");
Array.from(classifyLinks).forEach(link => {
    link.addEventListener("click", classifyLinkClicked);
});

function classifyLinkClicked(event){
    event.preventDefault();
    Array.from(classifyLinks).forEach(link => {
        link.classList.remove("active");
    });
    event.target.classList.add("active");
    let type = event.target.getAttribute("data-type");
    Array.from(products).forEach(product => {
        if(product.getAttribute("data-type")!==type){
            product.style.display="none";
        }
        else{
            product.style.display="";
        }
        
    });
    if(type==="allproducts"){
        Array.from(products).forEach(product => {
            product.style.display="";
        })
    }
}
// -----------------------------------------------

// homepgae

// ------------------------------------



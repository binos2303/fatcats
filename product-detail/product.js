let slides = document.getElementsByClassName('slider__list--slide');
let mainIndex = 2; // Index của ảnh ở giữa (lớn nhất)

document.getElementById('btn__next').addEventListener('click', () => shiftSlides(1));
document.getElementById('btn__previous').addEventListener('click', () => shiftSlides(-1));

function shiftSlides(direction) {
    mainIndex = (mainIndex + direction + slides.length) % slides.length;
    updateSlidePositions();
}

function updateSlidePositions() {
    let positions = new Array();
    Array.from(slides).forEach(function (slide, index) {
        slide.classList.remove('leftmost', 'left', 'center', 'right', 'rightmost');

        const position = (index - mainIndex + slides.length) % slides.length;
        if (position === 0) slide.classList.add('leftmost');
        else if (position === 1) slide.classList.add('left');
        else if (position === 2) slide.classList.add('center');
        else if (position === 3) slide.classList.add('right');
        else if (position === 4) slide.classList.add('rightmost');
        
    });
}
updateSlidePositions();
 
//Lấy tham số từ url của trang đối chiếu với dữ liệu trong file JSON
// để lấy thêm dữ liệu cho từng sản phẩm

const urlParams=new URLSearchParams(window.location.search);
const productId= urlParams.get("id");
//lấy dữ liệu trong file JSON

fetch("products.json")
    .then(response => response.json())
    .then(product =>{
        const result= product.find(item => item.id == productId);
        let sliderList = document.getElementsByClassName("slider__list--slide");
        
        if(result){
            document.getElementsByTagName("title")[0].innerText=result.name;
            for(let i=0;i<sliderList.length;i++){
                sliderList[i].src=result.img[i];
                sliderList[i].alt=result.name;
            }
            const price= (result.price).toLocaleString('vi-VN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
            document.getElementsByClassName("main__content")[0].innerHTML=`
                <h1 id="product__name">${result.name}</h1>
                <p id="product__id"><em>MSP: </em><em>${result.id}</em></p>
                <h2 id="product__price">${price}</h2>`
            document.getElementsByClassName("product__description--content")[0].innerHTML=`
                <p id="height"><em>Chiều cao(cm): </em><strong>${result.description.height}</strong></p>
                <p id="weight"><em>Trọng lượng(gram): </em><strong>${result.description.weight}</strong></p>
                <p id="material"><em>Chất liệu: </em><strong>${result.description.material}</strong></p>
                <p id="condition"><em>Tình trạng: </em><strong>${result.description.status}</strong></p>
                <p id="style"><em>Kiểu: </em><strong>${result.description.style}</strong></p>
                <p id="origin"><em>Xuất xứ: </em><strong>${result.description.origin}</strong></p>`;
        }else{
            console.error;
        }
    }) 

    //thêm thuộc tính vào nút plus minus
    let quantityINput = document.getElementById("quantity");
    quantityINput.addEventListener("change", quantityChangedInput);

    function quantityChangedInput(evt){
        let input =evt.target;
        if (isNaN(input.value) || input.value<=0){
            input.value=1;
        }
    }
    let minusBTN = document.getElementsByClassName("minus-btn")[0];
        minusBTN.addEventListener("click", function(){
            let input=minusBTN.nextElementSibling;
            input.value--;
            if(input.value<=0) input.value=1; 
    });
    let plusBTN = document.getElementsByClassName("plus-btn")[0];
    plusBTN.addEventListener("click", function(){
        let input=plusBTN.previousElementSibling;
        input.value++;
    });

    //thêm sản phẩm vào giỏ hàng kèm theo value của quantity
    let addCartProductDetail = document.getElementsByClassName("btn-cart")[0];
    addCartProductDetail.addEventListener("click", addCartProductDetailClicked);
    function addCartProductDetailClicked(evt){
        let button = evt.target;
        fetch("products.json")
        .then(response => response.json())
        .then(product =>{
            const result = product.find(item => item.id==productId);
            if(typeof Storage !== undefined){
                let titleProduct = result.name;
                let priceProduct = result.price;
                let imgProduct = result.img[4];
                let productId = result.id;
                let productQuantity = quantityINput.value;
                if (typeof priceProduct !== 'string') {
                    priceProduct = String(priceProduct);
                }
                if (typeof productQuantity == 'string') {
                    productQuantity = parseInt(productQuantity);
                }
                let newItem={
                    "id": productId,
                    "name" : titleProduct,
                    "price": priceProduct,
                    "img": imgProduct,
                    "quantity": productQuantity
                }
                if(JSON.parse(localStorage.getItem("cartItems"))===null){
                    updatedcart.push(newItem);
                    localStorage.setItem("cartItems",JSON.stringify(updatedcart));
                    updateTotalQuantity();
                }else {
                    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
                    if((index = isExistedInCart(newItem,cartItems))>=0){
                        cartItems[index].quantity+=productQuantity;
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
        });
        
    }
    
    
    
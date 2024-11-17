let NowIndex = 0; // Đánh dấu trang hiện tại
const carousel = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');
const totalItems = document.querySelectorAll('.slides-item').length;

function moveToNext() {
    NowIndex++;

    if (NowIndex === totalItems - 1) { // Khi đến ảnh cuối cùng (ảnh thứ 3), chuyển về ảnh đầu tiên
        setTimeout(() => {
        carousel.style.transition = 'none'; // Tắt hiệu ứng chuyển động
        NowIndex = 0;
        carousel.style.transform = `translateX(-${NowIndex * 100}%)`; // Đưa carousel về ảnh đầu tiên
        // Sau khi đưa về ảnh đầu, bật lại hiệu ứng chuyển động
        setTimeout(() => {
            carousel.style.transition = 'transform 1s ease-in-out';
        }, 0);
        }, 1000); // Chờ 1 giây trước khi reset carousel để tránh hiện tượng nháy
    } else {
        carousel.style.transform = `translateX(-${NowIndex * 100}%)`;
    }
    // Cập nhật trạng thái dấu chấm
    updateDots();
}

function updateDots() {
    dots.forEach((dot, index) => {
      if (index === NowIndex) {
        dot.classList.add('active'); // Đánh dấu dấu chấm hiện tại là màu đen
      } 
      else {
        dot.classList.remove('active'); // Các dấu chấm còn lại trong suốt
      }
})
}
setInterval(moveToNext, 7000); // Chuyển ảnh mỗi 7 giây
updateDots();

// Lấy nút button từ DOM
const button = document.getElementsByClassName('discount-button')[0];

// Thêm class 'blinking' để bắt đầu hiệu ứng chớp đen trắng
setInterval(() => {
  button.classList.toggle('blinking');
}, 1000); // Chuyển đổi mỗi 1 giây
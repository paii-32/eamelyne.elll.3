document.addEventListener('DOMContentLoaded', () => {
const images = document.querySelectorAll('.slider img');
const left = document.querySelector('.left');
const right = document.querySelector('.right');
let current = 0;

function showImage(index) {
    images.forEach(img => img.classList.remove('active'));
    images[index].classList.add('active');
}

left.addEventListener('click', () => {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
});

right.addEventListener('click', () => {
    current = (current + 1) % images.length;
    showImage(current);
});
});



function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');

  // emoji random
  const emojis = ['❤️','💖','💝'];
  heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  // posisi horizontal random
  heart.style.left = Math.random() * 100 + 'vw';

  // ukuran random
  heart.style.fontSize = (Math.random() * 25 + 15) + 'px';

  // arah random ke kiri/kanan
  const randomX = (Math.random() * 200 - 100) + 'px';
  heart.style.setProperty('--moveX', randomX);

  // durasi animasi random 4-8 detik
  const duration = Math.random() * 4 + 4;
  heart.style.animationDuration = duration + 's';

  document.getElementById('hearts-container').appendChild(heart);

  // hapus setelah animasi selesai
  setTimeout(() => heart.remove(), duration * 1000);
}

// loop otomatis bikin banyak heart random
setInterval(() => {
  for (let i = 0; i < 7; i++) { // jumlah heart per interval
    createHeart();
  }
}, 400); // tiap 0.4 detik muncul heart baru

const player = document.getElementById('player');
const startBtn = document.getElementById('startBtn');
const scoreDisplay = document.getElementById('scoree');

let gameStarted = false;
let score = 0;
let obstacles = [];
let gameInterval;
let spawnInterval = 2000; // waktu awal muncul rintangan (2 detik)
let speed = 8; // kecepatan awal rintangan

startBtn.addEventListener('click', () => {
  gameStarted = true;
  startBtn.style.display = 'none';
  score = 0;
  scoreDisplay.innerText = score;

  // Hapus rintangan lama kalau ada
  document.querySelectorAll('.obstacle').forEach(o => o.remove());
  obstacles = [];

  // mulai game loop
  gameInterval = setInterval(updateGame, 20);
  spawnObstacle(); // langsung spawn rintangan pertama
});

// Lompat pemain
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && gameStarted) {
    if (!player.classList.contains('jump')) {
      player.classList.add('jump');
      setTimeout(() => player.classList.remove('jump'), 900);
    }
  }
});

// Fungsi spawn rintangan
function spawnObstacle() {
  const obstacle = document.createElement('img');
  obstacle.src = "c:\\Users\\Rifqia\\Downloads\\nailong-removebg-preview.png";
  obstacle.classList.add('obstacle');
  obstacle.style.position = 'absolute';
  obstacle.style.left = '800px';
  obstacle.style.bottom = '3px';
  obstacle.style.width = '50px';
  obstacle.style.height = '50px';
  document.querySelector('.game-1').appendChild(obstacle);
  obstacles.push(obstacle);

  // spawn rintangan berikutnya secara random
  let randomTime = spawnInterval + Math.random() * 900; // 2-3 detik
  setTimeout(spawnObstacle, randomTime);
}

// Update posisi rintangan dan cek tabrakan
function updateGame() {
  obstacles.forEach((obstacle, index) => {
    let obstaclePos = parseInt(obstacle.style.left);
    obstaclePos -= speed;
    obstacle.style.left = obstaclePos + 'px';

    // tabrakan
    const playerBottom = parseInt(window.getComputedStyle(player).bottom);
    if (obstaclePos < 130 && obstaclePos > 50 && playerBottom < 60) {
      clearInterval(gameInterval);
      alert("Selesai! Skor: " + score);
      location.reload();
    }

    // kalau rintangan keluar layar, hapus dan tambah skor
    if (obstaclePos < -70) {
      obstacle.remove();
      obstacles.splice(index, 1);
      score++;
      scoreDisplay.innerText = score;

      // tingkatkan kecepatan sedikit setiap skor
      speed += 0.2;
      // rintangan muncul lebih cepat
      if (spawnInterval > 800) spawnInterval -= 50;
    }
  });
}

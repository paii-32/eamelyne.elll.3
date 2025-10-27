const basket = document.getElementById('basket');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const countdownDisplay = document.getElementById('countdown');
    const startButton = document.getElementById('startButton');

    let score = 0;
    let gameOver = false;
    let gameStarted = false;
    let timeLeft = 30;

    // ===========================
    // GERAKKAN BASKET DENGAN KURSOR / SENTUHAN
    // ===========================
    document.addEventListener('mousemove', (e) => {
      if (gameStarted && !gameOver) {
        let x = e.clientX - basket.offsetWidth / 2;
        x = Math.max(0, Math.min(window.innerWidth - basket.offsetWidth, x));
        basket.style.left = x + 'px';
      }
    });

    document.addEventListener('touchmove', (e) => {
      if (gameStarted && !gameOver) {
        const touch = e.touches[0];
        let x = touch.clientX - basket.offsetWidth / 2;
        x = Math.max(0, Math.min(window.innerWidth - basket.offsetWidth, x));
        basket.style.left = x + 'px';
      }
    });

    // ===========================
    // TOMBOL START
    // ===========================
    startButton.addEventListener('click', () => {
      startButton.style.display = 'none';
      startCountdown();
    });

    // ===========================
    // COUNTDOWN SEBELUM MULAI
    // ===========================
    function startCountdown() {
      let countdown = 3;
      countdownDisplay.textContent = countdown;

      const countdownInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
          countdownDisplay.textContent = countdown;
        } else if (countdown === 0) {
          countdownDisplay.textContent = 'GO!';
        } else {
          clearInterval(countdownInterval);
          countdownDisplay.style.display = 'none';
          startGame();
        }
      }, 1000);
    }

    // ===========================
    // FUNGSI BIKIN MAKANAN JATUH
    // ===========================
    function createFood(speedMultiplier) {
      if (gameOver || !gameStarted) return;

      const food = document.createElement('div');
      food.classList.add('food');
      const emojis = ['🍎','🍔','🍕','🍩','🍌','🍗','🍒','🍓','🥐','🍪'];
      food.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      food.style.left = Math.random() * (window.innerWidth - 50) + 'px';
      food.style.top = '-60px';
      document.body.appendChild(food);

      let speed = (Math.random() * 3 + 2) * speedMultiplier;

      function fall() {
        if (gameOver) return;
        food.style.top = (parseFloat(food.style.top) + speed) + 'px';

        const foodRect = food.getBoundingClientRect();
        const basketRect = basket.getBoundingClientRect();

        // Deteksi tabrakan
        if (!(foodRect.right < basketRect.left ||
              foodRect.left > basketRect.right ||
              foodRect.bottom < basketRect.top ||
              foodRect.top > basketRect.bottom)) {
          score++;
          scoreDisplay.textContent = 'Score: ' + score;
          food.remove();
          return;
        }

        // Hilang kalau keluar layar
        if (parseFloat(food.style.top) > window.innerHeight) {
          food.remove();
          return;
        }

        requestAnimationFrame(fall);
      }

      requestAnimationFrame(fall);
    }

    // ===========================
    // MULAI GAME
    // ===========================
    function startGame() {
      gameStarted = true;
      scoreDisplay.style.display = 'block';
      timerDisplay.style.display = 'block';

      let speedMultiplier = 1;
      let spawnRate = 700; // awal 0.7 detik

      // Spawn makanan terus
      let foodInterval = setInterval(() => {
        for (let i = 0; i < Math.floor(Math.random() * 3) + 2; i++) {
          createFood(speedMultiplier);
        }
      }, spawnRate);

      // Timer utama
      let timerInterval = setInterval(() => {
        if (gameOver) {
          clearInterval(foodInterval);
          clearInterval(timerInterval);
          return;
        }

        timeLeft--;
        timerDisplay.textContent = 'Waktu: ' + timeLeft;

        // Makin lama makin cepat
        if (timeLeft % 5 === 0) {
          speedMultiplier += 0.3;
          if (spawnRate > 300) spawnRate -= 100;
        }

        if (timeLeft <= 0) {
          gameOver = true;
          clearInterval(foodInterval);
          clearInterval(timerInterval);
          endGame();
        }
      }, 1000);
    }

    // ===========================
    // AKHIR GAME
    // ===========================
    function endGame() {
      if (score < 90) {
        alert(`😢 Game Over! Skor ${score}. Cupuuuu!!!.`);
      } else {
        alert(`🎉 Selamat! Skor ${score}! Kamu menang!`);
      }
      location.reload();
    }
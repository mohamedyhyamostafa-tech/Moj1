const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

let ship = { x: 280, y: 350, size: 30 };
let bullets = [];
let enemies = [];
let score = 0;
let gameOver = false;
let paused = false;

function spawnEnemy() {
  let x = Math.random() * (canvas.width - 30);
  enemies.push({ x, y: 0, size: 30 });
}

function drawShip() {
  ctx.fillStyle = "cyan";
  ctx.fillRect(ship.x, ship.y, ship.size, ship.size);
}

function drawEnemies() {
  ctx.fillStyle = "red";
  enemies.forEach(e => ctx.fillRect(e.x, e.y, e.size, e.size));
}

function drawBullets() {
  ctx.fillStyle = "yellow";
  bullets.forEach(b => ctx.fillRect(b.x, b.y, 5, 10));
}

function update() {
  if (paused || gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawShip();
  drawEnemies();
  drawBullets();

  bullets.forEach(b => b.y -= 5);
  enemies.forEach(e => e.y += 2);

  enemies = enemies.filter(e => e.y < canvas.height);
  bullets = bullets.filter(b => b.y > 0);

  bullets.forEach((b, bi) => {
    enemies.forEach((e, ei) => {
      if (
        b.x < e.x + e.size &&
        b.x + 5 > e.x &&
        b.y < e.y + e.size &&
        b.y + 10 > e.y
      ) {
        enemies.splice(ei, 1);
        bullets.splice(bi, 1);
        score += 10;
        document.getElementById("scoreText").innerText = "Score: " + score;

        if (score % 100 === 0) {
          // gift: faster fire rate
          ship.size += 5;
        }

        if (score >= 1000) {
          gameOver = true;
          document.getElementById("message").innerText = "🎉 Congratulations!";
        }
      }
    });
  });

  requestAnimationFrame(update);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") ship.x -= 10;
  if (e.key === "ArrowRight") ship.x += 10;
  if (e.key === " " && !paused && !gameOver)
    bullets.push({ x: ship.x + ship.size / 2 - 2, y: ship.y });
});

document.getElementById("startBtn").onclick = () => {
  if (gameOver) {
    score = 0;
    enemies = [];
    bullets = [];
    gameOver = false;
    document.getElementById("message").innerText = "";
  }
  paused = false;
  setInterval(spawnEnemy, 1000);
  update();
};

document.getElementById("pauseBtn").onclick = () => {
  paused = !paused;
};

document.getElementById("shareBtn").onclick = () => {
  alert("Your score: " + score);
};

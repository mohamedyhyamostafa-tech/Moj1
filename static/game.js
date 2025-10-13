const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 600;

let ship = { x: 180, y: 520, width: 40, height: 40, speed: 10 };
let bullets = [];
let enemies = [];
let score = 0;
let gameOver = false;
let paused = false;
let power = 1;
let kills = 0;

function drawShip() {
  ctx.fillStyle = "cyan";
  ctx.fillRect(ship.x, ship.y, ship.width, ship.height);
}

function drawEnemies() {
  ctx.fillStyle = "orange";
  enemies.forEach(e => ctx.fillRect(e.x, e.y, e.width, e.height));
}

function drawBullets() {
  ctx.fillStyle = "red";
  bullets.forEach(b => ctx.fillRect(b.x, b.y, b.width, b.height));
}

function spawnEnemy() {
  enemies.push({ x: Math.random() * 360, y: -40, width: 30, height: 30, speed: 3 });
}

function shoot() {
  bullets.push({ x: ship.x + 15, y: ship.y, width: 5 * power, height: 10, speed: 8 });
}

function moveLeft() {
  if (ship.x > 0) ship.x -= ship.speed;
}

function moveRight() {
  if (ship.x + ship.width < canvas.width) ship.x += ship.speed;
}

function pauseGame() {
  paused = !paused;
}

function startGame() {
  score = 0;
  enemies = [];
  bullets = [];
  gameOver = false;
  power = 1;
  kills = 0;
  document.getElementById("message").textContent = "";
}

function update() {
  if (paused || gameOver) return;

  bullets.forEach(b => b.y -= b.speed);
  enemies.forEach(e => e.y += e.speed);

  // التصادم
  enemies.forEach((e, ei) => {
    bullets.forEach((b, bi) => {
      if (b.x < e.x + e.width && b.x + b.width > e.x && b.y < e.y + e.height && b.y + b.height > e.y) {
        enemies.splice(ei, 1);
        bullets.splice(bi, 1);
        score += 10;
        kills++;
        document.getElementById("score").textContent = "Score: " + score;
        if (kills % 10 === 0) {
          power++;
          document.getElementById("message").textContent = "🎁 Power Up!";
        }
        if (score >= 1000) {
          document.getElementById("message").textContent = "🏆 Congratulations!";
          gameOver = true;
        }
      }
    });

    if (e.y > canvas.height) gameOver = true;
  });

  bullets = bullets.filter(b => b.y > 0);
  enemies = enemies.filter(e => e.y < canvas.height);

  if (gameOver) {
    document.getElementById("message").textContent = "💀 Game Over!";
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawShip();
  drawEnemies();
  drawBullets();
}

setInterval(() => {
  if (!paused && !gameOver && Math.random() < 0.1) spawnEnemy();
  update();
  draw();
}, 100);

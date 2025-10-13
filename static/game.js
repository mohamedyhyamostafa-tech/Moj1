const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let ship = { x: 220, y: 550, width: 40, height: 40, speed: 5 };
let bullets = [];
let enemies = [];
let score = 0;
let isRunning = false;
let powerUp = null;
let powerUpTimer = 0;

function drawShip() {
  ctx.fillStyle = "cyan";
  ctx.fillRect(ship.x, ship.y, ship.width, ship.height);
}

function drawBullets() {
  ctx.fillStyle = "yellow";
  bullets.forEach(b => ctx.fillRect(b.x, b.y, 4, 10));
}

function drawEnemies() {
  ctx.fillStyle = "red";
  enemies.forEach(e => ctx.fillRect(e.x, e.y, 40, 40));
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "18px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

function drawPowerUp() {
  if (powerUp) {
    ctx.fillStyle = "lime";
    ctx.fillRect(powerUp.x, powerUp.y, 20, 20);
  }
}

function gameLoop() {
  if (!isRunning) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // move bullets
  bullets.forEach(b => b.y -= 8);
  bullets = bullets.filter(b => b.y > 0);

  // move enemies
  enemies.forEach(e => e.y += 2);
  enemies = enemies.filter(e => e.y < canvas.height);

  // spawn enemies
  if (Math.random() < 0.02) {
    enemies.push({ x: Math.random() * 440, y: 0 });
  }

  // spawn power-up occasionally
  if (!powerUp && Math.random() < 0.001) {
    powerUp = { x: Math.random() * 460, y: 0 };
  }

  if (powerUp) {
    powerUp.y += 3;
    if (powerUp.y > canvas.height) powerUp = null;
  }

  // collisions
  enemies.forEach((e, ei) => {
    bullets.forEach((b, bi) => {
      if (b.x < e.x + 40 && b.x + 4 > e.x && b.y < e.y + 40 && b.y + 10 > e.y) {
        enemies.splice(ei, 1);
        bullets.splice(bi, 1);
        score += 10;
        if (score % 100 === 0) {
          powerUp = { x: Math.random() * 460, y: 0 };
        }
      }
    });
    if (
      ship.x < e.x + 40 && ship.x + ship.width > e.x &&
      ship.y < e.y + 40 && ship.y + ship.height > e.y
    ) {
      isRunning = false;
      alert("💀 Game Over! Final Score: " + score);
    }
  });

  // power-up collection
  if (powerUp && ship.x < powerUp.x + 20 && ship.x + 40 > powerUp.x && ship.y < powerUp.y + 20 && ship.y + 40 > powerUp.y) {
    powerUp = null;
    ship.speed += 1;
    setTimeout(() => (ship.speed = 5), 10000);
  }

  if (score >= 1000) {
    isRunning = false;
    alert("🎉 Congratulations! You won!");
  }

  drawShip();
  drawBullets();
  drawEnemies();
  drawPowerUp();
  drawScore();

  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") ship.x -= ship.speed;
  if (e.key === "ArrowRight") ship.x += ship.speed;
  if (e.key === "ArrowUp") ship.y -= ship.speed;
  if (e.key === "ArrowDown") ship.y += ship.speed;
  if (e.key === " ") bullets.push({ x: ship.x + 18, y: ship.y });
});

function startGame() {
  if (!isRunning) {
    score = 0;
    bullets = [];
    enemies = [];
    isRunning = true;
    gameLoop();
  }
}

function pauseGame() {
  isRunning = !isRunning;
  if (isRunning) gameLoop();
}

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// إعدادات اللعبة
const paddle1 = { x: 20, y: canvas.height / 2 - 50, width: 10, height: 100, speed: 10 };
const paddle2 = { x: canvas.width - 30, y: canvas.height / 2 - 50, width: 10, height: 100, speed: 5 };
const ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 10, speedX: 2, speedY: 1 };

// رسم المضارب
function drawPaddle(paddle, color) {
  ctx.fillStyle = color;
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

  ctx.strokeStyle = '#1f1f1f'; 
  ctx.lineWidth = 2; 
  ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// رسم الكرة
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#1f1f1f";
  ctx.fill();
  ctx.closePath();
}

// تحديث موقع الكرة
function updateBall() {
  ball.x += ball.speedX;
  ball.y += ball.speedY;

  // الارتداد عند الحواف العلوية والسفلية
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.speedY *= -1;
  }

  // الارتداد عند المضارب
  if (
    (ball.x - ball.radius < paddle1.x + paddle1.width &&
      ball.y > paddle1.y &&
      ball.y < paddle1.y + paddle1.height) ||
    (ball.x + ball.radius > paddle2.x &&
      ball.y > paddle2.y &&
      ball.y < paddle2.y + paddle2.height)
  ) {
    ball.speedX *= -1;
  }

  // إذا خرجت الكرة من اليسار أو اليمين
  if (ball.x + ball.radius < 0 || ball.x - ball.radius > canvas.width) {
    showLoseMessage();
    canvas.style.display = 'none';
  }
}

// إعادة تعيين موقع الكرة
function resetBall() {
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.speedX = 3 * (Math.random() > 0.5 ? 1 : -1);
      ball.speedY = 2 * (Math.random() > 0.5 ? 1 : -1);
}

// التحكم في حركة المضارب
function movePaddle(paddle, direction) {
  if (direction === "up" && paddle.y > 0) paddle.y -= paddle.speed;
  if (direction === "down" && paddle.y + paddle.height < canvas.height) paddle.y += paddle.speed;
}

// الذكاء الاصطناعي لتحريك اللاعب الثاني
function movePaddleAI() {
  if (ball.y < paddle2.y + paddle2.height / 2) {
    movePaddle(paddle2, "up");
  } else if (ball.y > paddle2.y + paddle2.height / 2) {
    movePaddle(paddle2, "down");
  }
}

// التحديث والرسم في كل إطار
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle(paddle1, "red");
  drawPaddle(paddle2, "blue");
  drawBall();
  updateBall();
  movePaddleAI();
  requestAnimationFrame(gameLoop);
}

// الاستماع للأزرار لتحريك المضرب الأول
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") movePaddle(paddle1, "up");
  if (e.key === "ArrowDown") movePaddle(paddle1, "down");
  if (e.key === "w") movePaddle(paddle1, "up");
  if (e.key === "s") movePaddle(paddle1, "down");
});



function showLoseMessage() {
  document.getElementById('loseMessage').style.display = 'flex';
}


function checkGameOver() {
  if (ball.y > gameCanvas.height) {
    showLoseMessage();
  }
}


function startGame(){
  document.getElementById('startGame').style.display = 'none';
  canvas.style.display = 'block';
  resetBall();
  gameLoop();
}

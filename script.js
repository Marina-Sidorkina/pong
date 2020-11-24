const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const player = new paddle(5, 200, 25, 100);
const ai = new paddle(610, 200, 25, 100);
const ball = {x: 320, y: 240, radius: 3, xSpeed: 2, ySpeed: 0};

function paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

function renderPaddle(paddle) {
  ctx.fillStyle = 'white';
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)
}

function renderBall(ball) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0.2 * Math.PI, false);
  ctx.fillStyle = 'white';
  ctx.fill();
}

function updateGame() {
  ball.x += ball.xSpeed;
  ball.y += ball.ySpeed;
}

function draw() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 640, 480);
  renderPaddle(player);
  renderPaddle(ai);
  renderBall(ball);
}

function tick() {
  updateGame();
  draw();
  window.setTimeout('tick()', 1000/60);
}

tick();
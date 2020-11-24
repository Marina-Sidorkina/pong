const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const player = new paddle(5, 200, 25, 100);
const ai = new paddle(610, 200, 25, 100);

function tick() {
  draw();
  window.setTimeout('tick()', 1000/60);
}

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

function draw() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 640, 480);
  renderPaddle(player);
  renderPaddle(ai);
}

tick();
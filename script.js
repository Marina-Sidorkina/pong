const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const player = new paddle(5, 200, 25, 100);
const ai = new paddle(610, 200, 25, 100);
const ball = {
  x: 320,
  y: 240,
  radius: 3,
  xSpeed: 5,
  ySpeed: 0,
  reverseX: function() {
    this.xSpeed *= -1;
  },
  reverseY: function() {
    this.ySpeed *= -1;
  }
};
const heldDown = {};

function paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.hasCollideWith = function(ball) {
    const paddleLeftWall = this.x;
    const paddleRightWall = this.x + this.width;
    const papaddleTopWall = this.y;
    const paddleBottomWall = this.y + this.height;

    if(ball.x > paddleLeftWall && ball.x < paddleRightWall
      && ball.y > papaddleTopWall && ball.y < paddleBottomWall) {
        return true;
    }
    return false;
  };

  this.move = function(keyCode) {
    let nextY = this.y;

    if(keyCode === '40') {
      nextY += 5;
    } else if(keyCode === '38') {
      nextY += -5;
    }

    nextY = nextY < 0 ? 0 : nextY;
    nextY = nextY + this.height > 480 ? 480 - this.height : nextY;

    this.y = nextY;
  };
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
  const collideWithPlayer = player.hasCollideWith(ball);
  const collideWithAi = ai.hasCollideWith(ball);

  if(collideWithPlayer || collideWithAi) {
    ball.reverseX();
  }

  for(var keyCode in heldDown) {
    player.move(keyCode);
  }
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

window.addEventListener('keydown', function(keyInfo) {
  heldDown[event.keyCode] = true;
}, false);

window.addEventListener('keyup', function(keyInfo) {
  delete heldDown[event.keyCode];
}, false);

tick();
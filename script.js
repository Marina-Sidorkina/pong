const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function tick() {
  draw();
  window.setTimeout('tick()', 1000/60);
}

function draw() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 640, 480);
}

tick();
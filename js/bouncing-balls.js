var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var numBalls = 100;
var g = 0.1;	// acceleration due to gravity

var balls = new Array();

window.onload = init;

function init() {

  for (var i = 0; i < numBalls; i++) {
    var ball = new Ball(((Math.random() +1) * 4), '#ff0022');
    ball.x = Math.random() * 1200;
    ball.y = 0;
    ball.vx = (Math.random() - 0.5) * 1
    ball.vy = (Math.random() - 0.5) * 12;
    ball.draw(context);
    balls.push(ball);
  }
  setInterval(onEachStep, 1000/60);
  console.log(balls.length);
};

function onEachStep() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  console.log('clear');
  for (var i = 0; i < numBalls; i++) {
    var ball = balls[i];
//    ball.vy += g;
    ball.x += ball.vx;
    ball.y += ball.vy;
    console.log('vy: ' + ball.vy);
    console.log('x: ' + ball.x);
    console.log('y: ' + ball.y);
    if (ball.y > canvas.height - ball.radius) {
      ball.y = -ball.radius;
//      ball.vy *= -0.8;
    }
    if (ball.x > canvas.width - ball.radius) {
      ball.x = -ball.radius;
    }
    ball.draw(context);
  }

}

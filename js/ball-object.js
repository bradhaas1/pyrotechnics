var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var ball = new Ball(50, '#00ff00');
ball.x = 100;
ball.y = 100;
ball.draw(context);
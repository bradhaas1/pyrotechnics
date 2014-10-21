(function () {


  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var radius = 20;
  var color = '#0000ff';

  var g = 0.1;	// accelleration due to gravity
  var x = 50;		// initial horizontal position
  var y = 300;		// initial vertical position
  var vx = 2;		// initial horizontal speed (velocity)
  var vy = 0;		// initial vertical speed (velocity)
  var interval, isDragging = false;

  canvas.addEventListener('mousedown', function () {
    canvas.addEventListener('mousemove', onDrag, false);
    canvas.addEventListener('mouseup', onDrop, false);
  }, false);

  //canvas.addEventListener('mousedown', stopAnim, false);
  //canvas.addEventListener('mouseup', startAnim, false);


  startAnim();

  function onDrag(evt) {
    isDragging = true;
    ball.x = evt.clientX;
    ball.y = event.clientY;

  }

  function onDrop(evt) {
    canvas.removeEventListener('mousemove', onDrag, false);
    canvas.removeEventListener('mouseup', onDrop, false);
  }


  function startAnim() {
    interval = setInterval(onEachStep, 1000 / 60);
  }

  function stopAnim() {
    clearInterval(interval);
    console.log('x: ' + x, ' y: ' + y);
    console.log('vx: ' + vx + ' vy: ' + vy);
  }

  //setInterval(onEachStep, 1000/60);// 60 fps

  function onEachStep() {
    vy += g;		// gravity increased the vertical speed
    x += vx;		// horizontal speed increass horizontal position
    y += vy;		// vertical speed increases verical position ADDING THE NEGATIVE VELOCITY REVERSES POSITION
    if (y > canvas.height - radius) {		// if ball hits the ground
      y = canvas.height - radius;				// reposition it at the ground
      vy *= -0.8;												// then reverse and reduce its vertical speed- NEGATIVE VELOCITY
      //alert(vy);
    }
    if (x > canvas.width - radius) {		// if ball hits edge of canvas
      x = -radius;											// wrap it around
    }
    drawBall();
  }

  function drawBall() {
    with (context) {
      clearRect(0, 0, canvas.width, canvas.height);
      fillStyle = color;
      beginPath();
      arc(x, y, radius, 0, 2 * Math.PI, true);
      closePath();
      fill();
      //console.log(y, vy);
    };
  };


})();
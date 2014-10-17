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

	setInterval(onEachStep, 250);// 60 fps

	function onEachStep() {
		vy += g;		// gravity increased the vertical speed
		x += vx;		// horizontal speed increass horizontal position
		y += vy;		// vertical speed increases verical position ADDING THE NEGATIVE VELOCITY REVERSES POSITION
		if (y > canvas.height - radius) {		// if ball hits the ground
			y = canvas.height - radius;				// reposition it at the ground
			vy *= -0.8;												// then reverse and reduce its vertical speed- NEGATIVE VELOCITY
			alert(vy);
		}
		if (x > canvas.width - radius) {		// if ball hits edge of canvas
			x = -radius;											// wrap it around
		}
		drawBall();
	}

function drawBall() {
    with (context){
        clearRect(0, 0, canvas.width, canvas.height); 
        fillStyle = color;
        beginPath();
        arc(x, y, radius, 0, 2*Math.PI, true);
        closePath();
        fill();
        console.log(y, vy);
    };
};


})();
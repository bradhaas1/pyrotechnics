var canvas = document.getElementById('canvas');var context = canvas.getContext('2d'); var graph = new Graph(context, -4, 4, -10, 10, 275, 210, 450, 350);
graph.drawgrid(1, 0.2, 5, 1);
graph.drawaxes('x', 'y');
var xA = new Array();
var yA = new Array();
for (var i = 0; i <= 100; i++) {
  xA[i] = (i - 50) * 0.08;
  yA[i] = f(xA[i]);
}
graph.plot(xA, yA, '#ff0000', false, true);
function f(x) {
  var y;
  y = 2 * x + 1;
  return y;
}
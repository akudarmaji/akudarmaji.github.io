var c = document.getElementById("c");
var ctx = c.getContext("2d");
​
var bc = document.createElement("canvas");
var bCtx = bc.getContext("2d");
​
var cw = c.width = bc.width = window.innerWidth,
  cx = cw / 2;
var ch = c.height = bc.height = window.innerHeight + 100,
  cy = ch;
​
var frames = 0;
var requestId = null;
var rad = (Math.PI / 180);
var kappa = 0.5522847498;
​
var x, y;
bCtx.strokeStyle = "#abcdef";
bCtx.lineWidth = 1;
​
var balloons = [];
​
function Balloon() {
  this.r = randomIntFromInterval(20, 70);
  this.R = 1.4 * this.r;
  this.x = randomIntFromInterval(this.r, cw - this.r);

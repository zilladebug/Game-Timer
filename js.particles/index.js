var canvas = document.getElementById("canvas");
var parent = document.getElementById("parent");

var ctx = canvas.getContext("2d");

canvas.width = parent.offsetWidth;
canvas.height = parent.offsetHeight;

var width = canvas.width;
var height = canvas.height;

var timeStamp = 0.8;

var ticker = 0;

var colors = ["lightblue", "honeydew", "pink"];

function background(color) {
  ctx.globalCompositeOperation = "normal";
  this.color = color;
  ctx.fillStyle = this.color;
  ctx.fillRect(0, 0, width, height);
}

function background(color2) {
  ctx.globalCompositeOperation = "normal";
  this.color2 = color2;
  ctx.fillStyle2 = this.color2;
  ctx.fillRect(0, 0, width, height);
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function Particle() {
  this.x = width / 2;
  this.y = height / 2;
  this.rad = random(1, 5);
  this.velX = random(-10, 10);
  this.velY = random(-10, 10);
  this.red = random(100, 255);
  this.alpha = 1;


  this.update = function() {
    this.x += (this.velX + random(-4,4))* timeStamp;
    this.y += (this.velY + random(-44,4))* timeStamp;
    this.alpha -= this.aInc * timeStamp;
  };

  this.isDead = function() {
    if (
      this.x > width + this.rad ||
      this.x + this.rad < 0 ||
      this.y > height + this.rad ||
      this.y + this.rad < 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  this.show = function() {
    ctx.globalCompositeOperation = "screen";
    ctx.beginPath();
    ctx.fillStyle2 = "rgba(28,12,176," + this.alpha + ")";
    ctx.fillStyle = "rgba(255,128,0," + this.alpha + ")";
    ctx.arc(this.x, this.y, this.rad, 2 * Math.PI, false);
    ctx.fill();
  };
}

//var particle = new Particle();
var particles = [];

function setup() {
  //5000 the number of particles in the begining
  for (var i = 0; i < 200; i++) {
    particles.push(new Particle());
  }

  ticker = 0;
}

function draw() {
  requestAnimationFrame(draw);
  ticker++;
  console.log(ticker);
  //Changed 40 to 0, the the explosion is not so "aggresive"
  if (ticker > 0 && ticker < 400) {
    timeStamp = 0.1;
  }
  ctx.clearRect(0,0,width,height);
  if (ticker < 450) {
    for (var i = 0; i < 10; i++) {
      particles.push(new Particle());
    }
  } else {
    //Controls the end explison and when it begins again
    timeStamp = 5.8;
  }
  if (ticker % 300 == 0) {
    setup();
  }
  for (var i = particles.length - 1; i >= 0; i--) {
    particles[i].show();
    particles[i].update();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
}

setup();
draw();

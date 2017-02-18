import 'p5'
import Bubble from './bubbles/bubble'

var bubbles = [];
var wind;
var gravity;

window.setup = function () {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  background(0);

  wind = createVector(2, 0);
  gravity = createVector(0, 0.981);
}
window.draw = function () {
  background(0);

  bubbles.forEach(function(bubble) {
    bubble.update();
    bubble.checkCollision(bubbles);
    bubble.draw();
  }, this);
}

window.mouseClicked= function() {
  bubbles.push(new Bubble(createVector(mouseX,mouseY), random(1, 200)));
}

window.keyPressed = function() {
  if(keyCode == 32) {
    bubbles.forEach(function(bubble) {
      bubble.applyForce(gravity.copy().mult(bubble.mass));
      bubble.applyForce(wind.copy());
    }, this);
  }
}
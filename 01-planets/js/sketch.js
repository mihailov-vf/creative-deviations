var system = new System();
var bodyCreator = new BodyCreator(system);
// -------------
// Setup
// -------------
function setup() {
  createCanvas(600, 600);
  frameRate(30);
}

// -------------
// Draw
// -------------
function draw() {
  background(0);
  system.update();
  system.draw();
  bodyCreator.draw();
}

function mouseClicked() {
  console.log('click');
  bodyCreator.onClick(mouseX, mouseY);
}

function mousePressed() {
  console.log('press');
  bodyCreator.onPress(mouseX, mouseY);
}

function mouseDragged() {
  // console.log('drag');
  bodyCreator.onDrag(mouseX, mouseY);
}

function mouseReleased() {
  console.log('release');
  bodyCreator.onRelease(mouseX, mouseY);
}

function mouseMoved() {
  // console.log('move');
  // system.onMove(mouseX, mouseY);
  // bodyCreator.onMove(mouseX, mouseY);
}
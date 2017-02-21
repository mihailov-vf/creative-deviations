import p5 from 'p5'
import 'p5/lib/addons/p5.dom'
import 'p5/lib/addons/p5.sound'

// The midi notes of a scale
var notes = [ 60, 62, 64, 65, 67, 69, 71];

// For automatically playing the song
var index = 0;
var song = [
  { note: 4, duration: 400, display: "D" },
  { note: 0, duration: 200, display: "G" },
  { note: 1, duration: 200, display: "A" },
  { note: 2, duration: 200, display: "B" },
  { note: 3, duration: 200, display: "C" },
  { note: 4, duration: 400, display: "D" },
  { note: 0, duration: 400, display: "G" },
  { note: 0, duration: 400, display: "G" }
];

var osc;

window.setup = function () {
  createCanvas(windowWidth, windowHeight);
  background(0);

  // A triangle oscillator
  osc = new p5.TriOsc();
  // Start silent
  osc.start();
  osc.amp(0);
}

// A function to play a note
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(0.5,0.2);

  // If we sest a duration, fade it out
  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.2);
    }, duration-50);
  }
}

window.keyPressed = function () {
  console.log(keyCode);
  if(keyCode == 65) {
    playNote(60);
  }
  console.log(keyCode);
  if(keyCode == 68) {
    playNote(64);
  }
}

window.keyReleased = function () {
  osc.fade(0,0.5);
}

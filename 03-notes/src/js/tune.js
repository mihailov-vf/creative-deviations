import 'p5'
import 'p5/lib/addons/p5.dom'
import Tone from 'tone'

var synth = new Tone.PolySynth(3, Tone.Synth, {
  "oscillator" : {
    "type" : "fatsawtooth",
    "count" : 3,
    "spread" : 30
  },
  "envelope": {
    "attack": 0.01,
    "decay": 0.1,
    "sustain": 0.5,
    "release": 0.4,
    "attackCurve" : "exponential"
  },
}).toMaster();

Tone.Transport.bpm.value = 60;

var notes = ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#'];
var partNotes = [];

window.setup = function () {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  background(0);

  var button1 = createButton('generate');
  button1.position(150, 65);
  button1.mousePressed(generate);
}

window.draw = function () {
}

function generate() {
  var positionX = random(100, 260);
  var positionY = random(100, 260);

  var noteNumber = Math.floor(random(0, 11));
  var noteOctave = Math.floor(random(1, 8));

  var velocity = random(0.5, 1);
  var duration = Math.floor(random(1, 8));

  var note = {
    "time": frameCount / 30,
    "noteName": notes[noteNumber] + '' + noteOctave,
    "velocity": velocity,
    "duration": duration + 'n'
  };

  synth.triggerAttackRelease(note.noteName, note.duration, note.time, note.velocity);

  fill(random(0, 255), random(0, 255), random(0, 255));

  var xBorder = windowWidth / 10;
  var yBorder = windowHeight / 10;

  var notePosX = map(noteNumber, 0, 11, xBorder, windowWidth - xBorder);
  var notePosY = map(noteOctave, 1, 8, yBorder, windowHeight - yBorder);
  ellipse(notePosX, notePosY, 90 - duration * 10);
}

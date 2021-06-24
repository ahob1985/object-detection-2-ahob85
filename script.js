// Author:

// Global UI Variables
let canvasDiv;
let canvas;
let textDiv;
let textP;

// Global ML Variables
let detector;
let video;
let detections;
let isModelReady;

function setup() {
  // Build UI 
  canvasDiv = createDiv();
  canvas = createCanvas(640, 480);
  canvas.parent(canvasDiv);
  textDiv = createDiv();
  textP = createP("Model loading, please wait...");
  textP.parent(textDiv);
  // Load video 
  video = createCapture(VIDEO, videoReady);
  // Initialize detections array 
  detections = [];
  // Initialize isModelReady to false 
  isModelReady = false;
}

function draw() {
  if(isModelReady) {
    image(video, 0, 0);
    detector.detect(canvas, gotResults);
    for(let i = 0; i < detections.length; i++) {
      drawLabel(detections[i]);
    }
  }
}

function videoReady() {
  video.style("display", "none");
  detector = ml5.objectDetector("cocossd", modelReady);
}

function modelReady() {
  isModelReady = true;
}

function drawLabel(object) {
  // Draw a rectangular outline around the object
  stroke(0, 255, 0);
  noFill();
  rect(object.x, object.y, object.width, object.height);
  // Draw the label and its confidence value near the object
  noStroke();
  fill(255, 0, 0);
  textSize(20);
  let label = object.label;
  let confidence = floor(object.confidence * 100);
  text(label + ": " + confidence + "%", object.x + 10, object.y + 20);
}

function gotResults(error, results) {
  if(error) {
    console.error(error);
  } else {
    textP.html("I detect these objects!");
    detections = results; 
  }
}

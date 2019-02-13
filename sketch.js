let video;
let poseNet;
let skeletons = [];
let noseX = 0;
let noseY = 0;
let interpolation = 0.3;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function (poses) {
		poses.length > 0 && drawNose(poses);
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);
	
	
  // We can call both functions to draw all keypoints and the skeletons
	// drawNose();
  // drawSkeleton();
}
function drawNose(poses){
	poses.forEach( data =>{
		data.pose.keypoints.forEach( ({score, part,position}) =>{
			if(part === "nose" && score > 0.99){
				let {x,y} = position;
				noseX = lerp(noseX,x,interpolation);
				noseY = lerp(noseY,y,interpolation);
				ellipse(noseX, noseY, 50, 50);
				fill(255, 204, 0);
			}
		});
	});
}


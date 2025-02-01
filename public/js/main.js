let pos = {x: 0, y: 0}

function preload() {
  // connect to a p5party server
  partyConnect(
    "wss://demoserver.p5party.org",
    "hello_party"
  );
  
  // tell p5.party to sync the pos object
  pos = partyLoadShared("pos", pos);
  
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(50);
  ellipse(pos.x, pos.y, 100, 100);
}

function mousePressed() {
  pos.x = mouseX;
  pos.y = mouseY;
}
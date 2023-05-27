// setup
"use strict";	
p5.disableFriendlyErrors = true;

// global variables
let toggles = {
	processes: true,
	outputs: true,
} 
let ball1;
let start = false;
let initialVelocity = 12;
let terminalVelocity = -18;
let pipeArray = [];
let firstPipe = false;
let firstPipeCounter = 0;
let pipeGap = 200;
let dead = false;
let deadVelocity = 0;
let deadScenario = 0;
let deadmenu = false;

// Score
let score = 0;
let highScore = 0;

function setup() {
  frameRate = 60
  createCanvas(480, 625);
  ball1 = new ball(width/2, height/2, 45, 0.75, initialVelocity);
}
 
function draw() {
  strokeWeight(3);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
  background(153,235,255,255);

  // stops running functions is toggles are set to false
  if (toggles.outputs) {
    outputs();
  }	 
  if (toggles.processes) {
    processes();
  }
  if (dead) {
    collision()
  } else if (deadmenu) {
    deadMenu()
  }
  if (start == true && deadmenu == false) {
    scoreMenu()
  }
  if (score > highScore) {
    highScore = score;
  }
  if (start == false) {
    startMenu()
  }
}

function outputs() {
  ball1.show()

  for (let i = 0; i < pipeArray.length; i++) {
    let identifier = pipeArray[i]
    identifier.x -= 2
    identifier.show()
  }
}

function processes() {
  // collision
  for (let i = 0; i < pipeArray.length; i++) {
    let identifier = pipeArray[i]
    if ((ball1.x + ball1.diameter - 22.5) > (identifier.x) && (ball1.x - 22.5) < (identifier.x + identifier.width) && (ball1.y + ball1.diameter - 22.5) > (identifier.y) && (ball1.y - 22.5) < (identifier.y + 50)) {
      dead = true
      deadScenario = 0;
    } else if ((ball1.x + ball1.diameter - 22.5) > (identifier.x + 10) && (ball1.x - 22.5) < (identifier.x + 10 + identifier.width - 20) && (ball1.y + ball1.diameter - 22.5) > (identifier.y) && (ball1.y - 22.5) < (identifier.y - 50 + 625)) {
      dead = true
      deadScenario = 0;
    } else if ((ball1.x + ball1.diameter - 22.5) > (identifier.x) && (ball1.x - 22.5) < (identifier.x + identifier.width) && (ball1.y + ball1.diameter - 22.5) > (identifier.y - 200) && (ball1.y - 22.5) < (identifier.y - 50 - 200)) {
      dead = true
      deadScenario = 0;
    } else if ((ball1.x + ball1.diameter - 22.5) > (identifier.x + 10) && (ball1.x - 22.5) < (identifier.x + 10 + identifier.width - 20) && (ball1.y + ball1.diameter - 22.5) > (identifier.y - 200 - 625) && (ball1.y - 22.5) < (identifier.y - 200)) {
      dead = true
      deadScenario = 0;
    } else if (ball1.y + 22.5 >= 625) {
      dead = true
      deadScenario = 1;
    }
  }

  // ball
  if (start && dead == false) {
    if (ball1.velocity <= terminalVelocity) {
      ball1.y -= terminalVelocity
    } else {
      ball1.y -= ball1.velocity;
    }
    ball1.velocity -= ball1.acceleration
  }

  //pipe
  if (start && firstPipe == false) {
    firstPipeCounter++
  }
  if (firstPipe == false && firstPipeCounter >= 60) {
    firstPipe = true
    let pos = 700
    for (let i = 0; i < 2; i++) {
      let num = Math.floor(Math.random() * 306) + 260;
      pipeArray.push(new pipe(pos, num, pipeGap, 120, false))
      pos += 350
    }
  }
  // getting rid of old pipes
  for (let i = 0; i < pipeArray.length; i++) {
    let identifier = pipeArray[i]
    if (identifier.x < -120) {
      let index = pipeArray.length - 1
      let identifier1 = pipeArray[index]
      let pos = identifier1.x
      pos += 350
      let num = Math.floor(Math.random() * 306) + 260;
      pipeArray.push(new pipe(pos, num, pipeGap, 120, false))
      pipeArray.splice(i, 1)
    } 
  }

  // scoring
  for (let i = 0; i < pipeArray.length; i++) {
    let identifier = pipeArray[i]
    if (identifier.scored == false) {
      if (ball1.x > (identifier.x + (identifier.width/2))) {
        score++
        identifier.scored = true
      }
    }
  }
}

function keyPressed() {
  if (keyCode == 32) {
    if (start == false) {
      start = true;
    } else if (start == true && dead == false){
      ball1.velocity = initialVelocity;
    }
    if (deadmenu) {
      reset()
    }
  }
}

function mouseClicked() {
  if (mouseX > 0 && mouseX < 0 + 480 && mouseY > 0 && mouseY < 0 + 625) {
    if (start == false) {
      start = true;
    } else {
      ball1.velocity = initialVelocity;
    }
    if (deadmenu) {
      reset()
    }
  }
}

function collision() {
  toggles = {
    processes: false,
    outputs: false,
  } 
  for (let i = 0; i < pipeArray.length; i++) {
    let identifier = pipeArray[i]
    identifier.show()
  }
  ball1.show()
  if (deadScenario == 0) {
    ball1.y += deadVelocity
    deadVelocity += 0.5
  } else {
    ball1.y -= ball1.velocity;
    ball1.velocity -= ball1.acceleration
  }
  if (ball1.y >= 655) {
    deadmenu = true
    dead = false
  }
}

function scoreMenu() {
  textAlign(LEFT, TOP);
  textSize(25)
  strokeWeight(5)
  stroke(0, 0, 0)
  fill(255, 255, 255)
  text("Score: " + score, 10, 10)
}

function deadMenu() {
  for (let i = 0; i < pipeArray.length; i++) {
    let identifier = pipeArray[i]
    identifier.show()
  }
  strokeWeight(5)
  stroke(0, 0, 0)
  textSize(60)
  fill(255, 255, 255)
  text("Game over", width/2, 200)
  textSize(25)
  text("Score: " + score, width/2, 300)
  text("High score: " + highScore, width/2, 340)
  text("Press spacebar to restart", width/2, 380)
}

function reset() {
  toggles = {
    processes: true,
    outputs: true,
  } 
  start = false;
  firstPipe = false;
  firstPipeCounter = 0;
  dead = false;
  deadVelocity = 0;
  deadScenario = 0;
  deadmenu = false;
  score = 0
  pipeArray = []
  ball1 = new ball(width/2, height/2, 45, 0.75, initialVelocity);
}

function startMenu() {
  strokeWeight(5)
  stroke(0, 0, 0)
  textSize(60)
  fill(255, 255, 255)
  text("Flappy Bird", width/2, 150)

  textSize(25)
  text("High Score: " + highScore, width/2, 450)
  text("Press spacebar to start", width/2, 490)
}
const TILESIZE = 25;
const BUFFER = 0.5;

const documentHeight = window.innerHeight
const documentWidth = window.innerWidth

var restartButton;

var gameBoard = [];
var food = [];

var snake;

var numFood;
var boundingBox;
var score;

function setup() {
  numFood = prompt("Enter The Amount Of Food To Be Displayed");
  boundingBox = prompt("Would you like the edges of the gameboard to be bounded?", "yes/no").toLowerCase() === "yes" ? true : false
  localStorage.removeItem("snakeHighScore")
  if(localStorage.getItem("snakeHighScore") === null) localStorage.setItem("snakeHighScore", 0);
  
  for (i = 0; i < Math.floor(documentWidth / TILESIZE); i++) {
    gameBoard.push([])
    for (j = 0; j < Math.floor(documentHeight / TILESIZE); j++) {
      gameBoard[i][j] = 0;
    }
  }

  createCanvas(25 * gameBoard.length, 25 * gameBoard[0].length); //Width, Height
  background(50, 50, 50);

  while(Array.from(new Set(food.map(JSON.stringify)), JSON.parse).length < numFood) food.push(new Food(Math.floor(Math.random() * gameBoard.length), Math.floor(Math.random() * gameBoard[0].length)));
  snake = new TileSnake(Math.floor(gameBoard.length / 2), Math.floor(gameBoard[0].length / 2), 255, 255, 255, boundingBox);
  score = 0;
  
  frameRate(10);
}

function draw() {
  /*for (i = 0; i < gameBoard.length; i++) {
    for (j = 0; j < gameBoard[0].length; j++) {
      fill(50, 50, 50);
      stroke(50, 50, 50);
      strokeWeight(1);
      rect(i * TILESIZE, j * TILESIZE, TILESIZE, TILESIZE);
    }
  }*/
  background(50, 50, 50);
  if(snake.alive){
    mainGame()
  } else{
    gameOver();
  }
}

function mainGame(){
  if(snake.update(food)){
      score += 1;
      food.push(new Food(Math.floor(Math.random() * gameBoard.length), Math.floor(Math.random() * gameBoard[0].length)));
  }
  
  food.forEach(function(element){
    element.draw();
  })
  snake.draw();
    
  fill(255,255,255)
  textSize(25);
  textAlign(RIGHT, BOTTOM)
  text("SCORE: " + score, TILESIZE * (gameBoard.length - BUFFER), TILESIZE * (gameBoard[0].length - BUFFER));
}

function gameOver() {
  if(score > localStorage.getItem("snakeHighScore")){
    localStorage.setItem("snakeHighScore", score);
  }
  //fill(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256));
  
  fill(255, 255, 255);
  textSize(25);
  textAlign(LEFT, TOP);
  text("High Score: " + localStorage.getItem("snakeHighScore"), TILESIZE * BUFFER, TILESIZE * BUFFER); //textAscent("") + textDescent("") --> Text Height
  
  textSize(100);
  textAlign(CENTER, CENTER);
  text("GAME OVER\n", TILESIZE * Math.floor(gameBoard.length / 2), TILESIZE * Math.floor(gameBoard[0].length / 2));
  
  textSize(25);
  textAlign(CENTER, CENTER);
  text("(PRESS SPACE TO RESTART)", TILESIZE * Math.floor(gameBoard.length / 2), TILESIZE * Math.floor(gameBoard[0].length / 2));
  
  textSize(25);
  textAlign(RIGHT, BOTTOM)
  text("SCORE: " + score, TILESIZE * (gameBoard.length - BUFFER), TILESIZE * (gameBoard[0].length - BUFFER));
}

function resetGame() {
  snake = new TileSnake(Math.floor(gameBoard.length / 2), Math.floor(gameBoard[0].length / 2), 255, 255, 255, boundingBox);
  food = [];
  while(Array.from(new Set(food.map(JSON.stringify)), JSON.parse).length < numFood){
    food.push(new Food(Math.floor(Math.random() * gameBoard.length), Math.floor(Math.random() * gameBoard[0].length))); 
  }
  score = 0;
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      snake.setDirection(0,-1);
      console.log("Up Arrow Pressed");
      break;

    case DOWN_ARROW:
      snake.setDirection(0, 1);
      console.log("Down Arrow Pressed");
      break;

    case RIGHT_ARROW:
      snake.setDirection(1, 0);
      console.log("Right Arrow Pressed");
      break;

    case LEFT_ARROW:
      snake.setDirection(-1, 0);
      console.log("Left Arrow Pressed");
      break;
      
    case 32: //Space Bar
      resetGame();
      break;
  }
}
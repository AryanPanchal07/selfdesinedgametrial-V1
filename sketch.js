var canvas, backgroundImage;

var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;

var invisibleBlockGroup, invisibleBlock;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var obstacle1, obstacle2, obstacle3, obstacle4;
var form, player, game;
var ghosts, ghost1, ghost1Img, ghost2, ghost2Img, ghost3Img, ghost4Img, ghost3, ghost4;
var ghosty;
var ghostGroup;
var bg,bg2;

function preload(){
  bg = loadImage("bghome.jpg");
  bg2 = loadImage("bg2.jpg");
  ghost1Img = loadImage("G1.png");
  ghost2Img = loadImage("G2.png");
  ghost3Img = loadImage("G3.png");
  ghost4Img = loadImage("G4.png");
  obstacle1 = loadImage("obstacle 1.gif");
  obstacle2 = loadImage("obstacle2.gif");
  obstacle3 = loadImage("obstacle 3.gif");
  obstacle4 = loadImage("obstacle4.gif");
  ghostGroup = new Group();
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  background(bg);
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
   if (gameState === 3) {
     game.end1();
   }
    if (gameState === 4) {
      game.end2();
    }
     if (gameState === 5) {
       game.end3();
     }
      if (gameState === 6) {
        game.end4();
      }
}

class Game {
  constructor() {}

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state,
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref("playerCount").once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form();
      form.display();
    }

    ghost1 = createSprite(100, 200);
    ghost1.addImage(ghost1Img);
    ghost1.scale = 0.5;
    ghost2 = createSprite(300, 200);
    ghost2.addImage(ghost2Img);
    ghost2.scale = 0.5;
    ghost3 = createSprite(500, 200);
    ghost3.addImage(ghost3Img);
    ghost3.scale = 0.5;
    ghost4 = createSprite(700, 200);
    ghost4.addImage(ghost4Img);
    ghost4.scale = 0.5;
    ghosts = [ghost1, ghost2, ghost3, ghost4];
  }

  play() {
    form.hide();

    Player.getPlayerInfo();

    if (allPlayers !== undefined) {
      background(rgb(198, 135, 103));
      image(bg2, 0, -displayHeight * 4, displayWidth, displayHeight * 5);

      //var display_position = 100;

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 100;
      var y = 200;

      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        x = 500 - allPlayers[plr].distance;
        y = 500;
        ghosts[index - 1].x = x;
        ghosts[index - 1].y = y;
        // console.log(index, player.index)

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);
          ghosts[index - 1].shapeColor = "red";
          camera.position.x = displayWidth / 2;
          camera.position.y = ghosts[index - 1].y;
        }

        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }

    if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
      player.distance -= 10;
      player.update();
    }
    if (keyIsDown(LEFT_ARROW) && player.index !== null) {
      player.distance += 10;
      player.update();
    }

    if (frameCount % 20 === 0) {
      ghosty = createSprite(random(100, 1000), 0, 100, 100);
      ghosty.velocityY = 6;
      var rand = Math.round(random(1, 4));
      switch (rand) {
        case 1:
          ghosty.addImage("obstacle1", obstacle1);
          ghosty.scale = 0.2;
          break;
        case 2:
          ghosty.addImage("obstacle2", obstacle2);
          ghosty.scale = 0.2;
          break;
        case 3:
          ghosty.addImage("obstacle3", obstacle3);
          ghosty.scale = 0.2;
          break;
        case 4:
          ghosty.addImage("obstacle4", obstacle4);
          ghosty.scale = 0.3;
          break;
      }
      ghostGroup.add(ghosty);
    }

    if (player.index !== null) {
      for (var i = 0; i < ghostGroup.length; i++) {
        if (ghostGroup.get(i).isTouching(ghosts)) {
          ghostGroup.get(i).destroy();
        }
      }
    }

    if (player.distance > 3800) {
      gameState = 2;
    }

    drawSprites();
  }

  end() {
    console.log("Game Ended");
  }
}

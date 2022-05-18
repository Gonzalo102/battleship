import { Player } from "./Player.js";
import { Gameboard } from "./Gameboard.js";
import { Game } from "./Game.js";

function gameLoop() {
  const userGameboard = new Gameboard(7, 7);
  const computerGameboard = new Gameboard(7, 7);
  const user = new Player("User");
  const computer = new Player("Computer");

  const game = new Game(user, computer, userGameboard, computerGameboard);

  game.placeShipsOnGameBoard();

  let round = 0;
  while (
    userGameboard.isGameOver() !== true ||
    computerGameboard.isGameOver() !== true
  ) {
    if (round % 2 === 0) {
      //user turn
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          user.attack(i, j, computerGameboard);
        }
      }
    } else {
      //computer turn
      computer.randomShot(userGameboard);
    }

    round++;
  }

  if (userGameboard.isGameOver()) {
    console.log("computer Wins");
  } else {
    console.log("user Wins");
  }
}

gameLoop();

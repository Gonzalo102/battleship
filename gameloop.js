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
      user.randomShot(computerGameboard);
    } else {
      //computer turn
      computer.randomShot(userGameboard);
    }
    let gameOver = computerGameboard.isGameOver();
    if (gameOver) break;
    round++;
  }

  if (userGameboard.isGameOver()) {
    console.log("computer Wins");
  } else {
    console.log("user Wins");
  }
}

gameLoop();

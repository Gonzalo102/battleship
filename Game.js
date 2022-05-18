export class Game {
  constructor(user, computer, userGameboard, computerGameboard) {
    this.user = user;
    this.computer = computer;
    this.userGameboard = userGameboard;
    this.computerGameboard = computerGameboard;
  }

  placeShipsOnGameBoard() {
    this.userGameboard.placeShip(this.userGameboard.ships[0], 0, 0, false);
    this.userGameboard.placeShip(this.userGameboard.ships[1], 1, 0, false);
    this.userGameboard.placeShip(this.userGameboard.ships[2], 0, 6, true);
    this.userGameboard.placeShip(this.userGameboard.ships[3], 6, 2, false);
    this.userGameboard.placeShip(this.userGameboard.ships[4], 3, 3, true);

    this.computerGameboard.placeShip(this.userGameboard.ships[0], 0, 0, false);
    this.computerGameboard.placeShip(this.userGameboard.ships[1], 1, 0, false);
    this.computerGameboard.placeShip(this.userGameboard.ships[2], 0, 6, true);
    this.computerGameboard.placeShip(this.userGameboard.ships[3], 6, 2, false);
    this.computerGameboard.placeShip(this.userGameboard.ships[4], 3, 3, true);
  }
}

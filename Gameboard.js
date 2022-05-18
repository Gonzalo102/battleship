import { Ship } from "./Ship.js";

export class Gameboard {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.board = [...Array(row)].map((e) => Array(col).fill(""));
    this.ships = [
      new Ship("carrier", 5),
      new Ship("battleship", 4),
      new Ship("cruiser", 3),
      new Ship("submarine", 3),
      new Ship("destroyer", 2),
    ];
    this.missedShots = [...Array(row)].map((e) => Array(col).fill(""));
  }
  placeShip(ship, row, col, isVertical) {
    //check if it fits in the board
    if (!isVertical) {
      if (ship.size + col > this.col) {
        throw new Error("the ship can not fit on this coordinates");
      }
    } else {
      if (ship.size + row > this.row) {
        throw new Error("the ship can not fit on this coordinates");
      }
    }

    //check if there is another ship on that coordinates
    for (let i = 0; i < ship.size; i++) {
      if (!isVertical) {
        if (this.board[row][col + i] !== "") {
          throw new Error("there is another ship on this coordinates");
        }
      } else {
        if (this.board[row + i][col] !== "") {
          throw new Error("there is another ship on this coordinates");
        }
      }
    }

    if (!isVertical) {
      //horizontal placement
      for (let i = 0; i < ship.size; i++) {
        this.board[row][col + i] = ship.name;
      }
    } else {
      //vertical placement
      for (let i = 0; i < ship.size; i++) {
        this.board[row + i][col] = ship.name;
      }
    }
  }

  getShip(shipName) {
    const ship = this.ships.find((data) => data.name === shipName);
    return ship;
  }

  receiveAttack(row, col) {
    if (this.board[row][col] === "") {
      this.missedShots[row][col] = "missed";
      //missed shot
      return false;
    } else {
      //got a hit
      const shipHit = this.getShip(this.board[row][col]);
      //determinate position hit
      let position = -1;
      for (let i = 0; i <= row; i++) {
        for (let j = 0; j <= col; j++) {
          if (this.board[i][j] === shipHit.name) {
            position++;
          }
        }
      }
      shipHit.hit(position);
      return true;
    }
  }
  isGameOver() {
    return this.ships.every((ship) => ship.isSunk() === true);
  }
}

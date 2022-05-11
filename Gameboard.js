import { Ship } from "./Ship";

export class Gameboard {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.board = [...Array(row)].map((e) => Array(col).fill(""));
  }
  placeShip(ship, row, col, isVertical) {
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

    //check if it fits in the board
    if (ship.size + row > this.row || ship.size + col > this.col)
      throw new Error("the ship can not fit on this coordinates");

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
}

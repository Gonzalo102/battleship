import { Gameboard } from "./Gameboard";
import { Ship } from "./Ship";

test("can_I_create_a_gameboard", () => {
  const gameboard = new Gameboard(7, 7);
  expect(gameboard.board).toEqual([
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ]);
});

test("can_I_place_a_ship_in_the_board", () => {
  const gameboard = new Gameboard(7, 7);
  const carrier = new Ship("carrier", 5);
  const battleship = new Ship("battleship", 4);
  gameboard.placeShip(carrier, 1, 1, false);
  expect(gameboard.board).toEqual([
    ["", "", "", "", "", "", ""],
    ["", "carrier", "carrier", "carrier", "carrier", "carrier", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ]);
  gameboard.placeShip(battleship, 0, 0, true);
  expect(gameboard.board).toEqual([
    ["battleship", "", "", "", "", "", ""],
    ["battleship", "carrier", "carrier", "carrier", "carrier", "carrier", ""],
    ["battleship", "", "", "", "", "", ""],
    ["battleship", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ]);

  expect(() => gameboard.placeShip(battleship, 0, 0, true)).toThrow(
    "there is another ship on this coordinates"
  );
  expect(() => gameboard.placeShip(carrier, 3, 1, false)).toThrow(Error);
  expect(() => gameboard.placeShip(carrier, 3, 1, false)).toThrow(
    "the ship can not fit on this coordinates"
  );
});

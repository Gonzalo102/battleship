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
  expect(() => gameboard.placeShip(carrier, 3, 3, false)).toThrow(Error);
  expect(() => gameboard.placeShip(carrier, 3, 3, false)).toThrow(
    "the ship can not fit on this coordinates"
  );
  expect(gameboard.receiveAttack(0, 0)).toBe(true);
  expect(gameboard.receiveAttack(0, 1)).toBe(false);
  expect(gameboard.missedShots).toEqual([
    ["", "missed", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ]);
});

test("can_I_get_a_ship_on_the_board", () => {
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

  const ship = gameboard.getShip("carrier");
  ship.hit(0);
  expect(ship.hits).toEqual(["hit", "", "", "", ""]);
  ship.hit(2);
  expect(ship.hits).toEqual(["hit", "", "hit", "", ""]);
});

test("is_game_over", () => {
  const gameboard = new Gameboard(7, 7);

  gameboard.placeShip(gameboard.ships[0], 1, 1, false);
  expect(gameboard.board).toEqual([
    ["", "", "", "", "", "", ""],
    ["", "carrier", "carrier", "carrier", "carrier", "carrier", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ]);
  gameboard.placeShip(gameboard.ships[1], 0, 0, true);
  expect(gameboard.board).toEqual([
    ["battleship", "", "", "", "", "", ""],
    ["battleship", "carrier", "carrier", "carrier", "carrier", "carrier", ""],
    ["battleship", "", "", "", "", "", ""],
    ["battleship", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ]);

  gameboard.placeShip(gameboard.ships[2], 6, 0, false);
  expect(gameboard.board).toEqual([
    ["battleship", "", "", "", "", "", ""],
    ["battleship", "carrier", "carrier", "carrier", "carrier", "carrier", ""],
    ["battleship", "", "", "", "", "", ""],
    ["battleship", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["cruiser", "cruiser", "cruiser", "", "", "", ""],
  ]);

  gameboard.placeShip(gameboard.ships[3], 5, 0, false);

  expect(gameboard.board).toEqual([
    ["battleship", "", "", "", "", "", ""],
    ["battleship", "carrier", "carrier", "carrier", "carrier", "carrier", ""],
    ["battleship", "", "", "", "", "", ""],
    ["battleship", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["submarine", "submarine", "submarine", "", "", "", ""],
    ["cruiser", "cruiser", "cruiser", "", "", "", ""],
  ]);

  gameboard.placeShip(gameboard.ships[4], 5, 6, true);

  expect(gameboard.board).toEqual([
    ["battleship", "", "", "", "", "", ""],
    ["battleship", "carrier", "carrier", "carrier", "carrier", "carrier", ""],
    ["battleship", "", "", "", "", "", ""],
    ["battleship", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["submarine", "submarine", "submarine", "", "", "", "destroyer"],
    ["cruiser", "cruiser", "cruiser", "", "", "", "destroyer"],
  ]);

  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(1, 0);
  gameboard.receiveAttack(2, 0);
  gameboard.receiveAttack(3, 0);

  expect(gameboard.ships[1].isSunk()).toBe(true);

  gameboard.receiveAttack(1, 1);
  gameboard.receiveAttack(1, 2);
  gameboard.receiveAttack(1, 3);
  gameboard.receiveAttack(1, 4);
  gameboard.receiveAttack(1, 5);

  expect(gameboard.ships[0].isSunk()).toBe(true);

  gameboard.ships[2].hit(0);
  gameboard.ships[2].hit(1);
  gameboard.ships[2].hit(2);

  expect(gameboard.ships[2].isSunk()).toBe(true);

  gameboard.ships[3].hit(0);
  gameboard.ships[3].hit(1);
  gameboard.ships[3].hit(2);

  expect(gameboard.ships[3].isSunk()).toBe(true);

  gameboard.ships[4].hit(0);
  expect(gameboard.isGameOver()).toBe(false);
  gameboard.ships[4].hit(1);

  expect(gameboard.ships[3].isSunk()).toBe(true);

  expect(gameboard.isGameOver()).toBe(true);
});

import { Gameboard } from "./Gameboard";
import { Ship } from "./Ship";
import { Player } from "./Player";

test("can_I_attack_as_a_player", () => {
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

  const player = new Player("user");
  player.attack(0, 0, gameboard);
  expect(() => player.attack(0, 0, gameboard)).toThrow(Error);
  player.attack(1, 0, gameboard);
  player.attack(2, 0, gameboard);
  player.attack(3, 0, gameboard);
  expect(gameboard.ships[1].isSunk()).toBe(true);
  expect(() => player.attack(3, 0, gameboard)).toThrow(Error);
});

import { Ship } from "./Ship";

test("Can_I_create_a_carrier_ship", () => {
  const carrier = new Ship("carrier", 5);

  expect(carrier.hits).toEqual(["", "", "", "", ""]);
  carrier.hit(0);
  expect(carrier.hits).toEqual(["hit", "", "", "", ""]);
  expect(carrier.isSunk()).toBeFalsy();
  carrier.hit(1);
  carrier.hit(2);
  carrier.hit(3);
  carrier.hit(4);
  expect(() => carrier.hit(5)).toThrow(Error);
  expect(carrier.isSunk()).toBe(true);
  expect(carrier.hits).toEqual(["hit", "hit", "hit", "hit", "hit"]);
});

test("Can_I_create_a_battleship_ship", () => {
  const battleship = new Ship("battleship", 4);

  expect(battleship.hits).toEqual(["", "", "", ""]);
  battleship.hit(0);
  expect(battleship.hits).toEqual(["hit", "", "", ""]);
  expect(battleship.isSunk()).toBeFalsy();
  battleship.hit(1);
  battleship.hit(2);
  battleship.hit(3);
  expect(battleship.isSunk()).toBe(true);
  expect(battleship.hits).toEqual(["hit", "hit", "hit", "hit"]);
});

test("Can_I_create_a_cruiser_ship", () => {
  const cruiser = new Ship("cruiser", 3);

  expect(cruiser.hits).toEqual(["", "", ""]);
  cruiser.hit(1);
  expect(cruiser.hits).toEqual(["", "hit", ""]);
  expect(cruiser.isSunk()).toBeFalsy();
  cruiser.hit(0);
  cruiser.hit(2);
  expect(cruiser.isSunk()).toBe(true);
  expect(cruiser.hits).toEqual(["hit", "hit", "hit"]);
});

test("Can_I_create_a_submarine_ship", () => {
  const submarine = new Ship("submarine", 3);

  expect(submarine.hits).toEqual(["", "", ""]);
  submarine.hit(1);
  expect(submarine.hits).toEqual(["", "hit", ""]);
  expect(submarine.isSunk()).toBeFalsy();
  submarine.hit(0);
  submarine.hit(2);
  expect(submarine.isSunk()).toBe(true);
  expect(submarine.hits).toEqual(["hit", "hit", "hit"]);
});

test("Can_I_create_a_destroyer_ship", () => {
  const destroyer = new Ship("destroyer", 2);

  expect(destroyer.hits).toEqual(["", ""]);
  destroyer.hit(1);
  expect(destroyer.hits).toEqual(["", "hit"]);
  expect(destroyer.isSunk()).toBeFalsy();
  destroyer.hit(0);
  expect(destroyer.isSunk()).toBe(true);
  expect(destroyer.hits).toEqual(["hit", "hit"]);
});

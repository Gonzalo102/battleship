export class Ship {
  constructor(name, size) {
    this.name = name;
    this.size = size;
    this.hits = Array.from({ length: size }).fill("");
  }
  hit(position) {
    if (position >= this.size)
      throw new Error(
        "You can not hit a ship on a position greater than its size"
      );
    this.hits[position] = "hit";
  }
  isSunk() {
    if (this.hits.every((item) => item === "hit")) {
      return true;
    }
    return false;
  }
}

export class Ship {
  constructor(name, size) {
    this.name = name;
    this.size = size;
    this.hits = Array.from({ length: size }).fill("");
  }
  hit(position) {
    this.hits[position] = "hit";
  }
  isSunk() {
    if (this.hits.every((item) => item === "hit")) {
      return true;
    }
    return false;
  }
}

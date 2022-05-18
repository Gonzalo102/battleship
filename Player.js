export class Player {
  constructor(name) {
    this.name = name;
    this.alreadyHitCoords = [...Array(7)].map((e) => Array(7).fill(false));
  }

  attack(row, col, computerGameboard) {
    if (this.alreadyHitCoords[row][col] === true) {
      throw new Error("Try another spot, you have already tried there");
    }
    computerGameboard.receiveAttack(row, col);
    this.alreadyHitCoords[row][col] = true;
  }

  randomShot(userGameboard) {
    let rndRow = randomIntFromInterval(0, 6);
    let rndCol = randomIntFromInterval(0, 6);
    while (this.alreadyHitCoords[rndRow][rndCol] === true) {
      rndRow = randomIntFromInterval(0, 6);
      rndCol = randomIntFromInterval(0, 6);
    }
    userGameboard.receiveAttack(rndRow, rndRow);
  }

  randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

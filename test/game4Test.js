const { expect } = require("chai");

describe("Game4", function () {
  async function deployContract() {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();
    return game;
  }

  it("should win the game when conditions are met", async function () {
    const game = await deployContract();

    // Setup accounts
    const [owner, otherAccount] = await ethers.getSigners();

    // owner calls write function with otherAccount's address
    await game.connect(owner).write(otherAccount.address);

    // otherAccount calls win function with owner's address
    await game.connect(otherAccount).win(owner.address);

    // Check if the game is won
    expect(await game.isWon()).to.be.true;
  });

  it("should not win the game when conditions are not met", async function () {
    const game = await deployContract();

    // Setup accounts
    const [owner, otherAccount] = await ethers.getSigners();

    // Trying to win the game without fulfilling the condition
    await expect(game.connect(otherAccount).win(owner.address))
      .to.be.revertedWith("Nope. Try again!");

    // Check if the game is not won
    expect(await game.isWon()).to.be.false;
  });
});

const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert, expect } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };
  }

  it('should not be a winner with a regular address', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // Trying to win with a regular address, expecting a revert
    await expect(game.win()).to.be.revertedWith("Nope. Try again!");

    // Assert that the game has not been won
    assert.isFalse(await game.isWon(), 'Game should not be won');
  });
});


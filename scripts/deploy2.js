const { ethers } = require("hardhat");
//const { ethers } = require("@swisstronik/ethers");

async function main() {
  const perc20 = await ethers.deployContract("PERC20Sample");

  // Wait for the transaction to be mined
  await perc20.waitForDeployment();

  console.log(`PERC20Sample was deployed to ${await perc20.getAddress()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
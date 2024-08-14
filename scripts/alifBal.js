const hre = require("hardhat");
  const { sendSignedShieldedQuery } = require("./utils");
  const ethers = require("ethers");
  
  const PK = "hello";
  const deployedContractAddress = "0xAB4e12eB6B11eCc32Ebf3AE11fE56Ee6FAb74a88";
  
  async function main() {
    const PERC20 = await hre.ethers.getContractFactory("PERC20Sample");
    const perc20 = PERC20.attach(deployedContractAddress);
  
    const provider = new hre.ethers.providers.JsonRpcProvider(hre.network.config.url);
    const wallet = new hre.ethers.Wallet(PK, provider);
    
  
    let encodedFunctionData = perc20.interface.encodeFunctionData("balanceOf", [wallet.address]);
    let req = await sendSignedShieldedQuery( wallet, perc20.address, encodedFunctionData);
  
    let balance = perc20.interface.decodeFunctionResult("balanceOf", req)[0];
    console.log('Balance: ', balance.toString());
  
  }
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

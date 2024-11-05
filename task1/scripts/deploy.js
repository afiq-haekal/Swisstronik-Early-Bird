const hre = require("hardhat");

async function main() {
  const contract = await hre.ethers.deployContract("Swisstronik", ["Hello World, Afiq Haekal Was Here!"]);
  await contract.waitForDeployment();
  console.log(`Swisstronik contract deployed to ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

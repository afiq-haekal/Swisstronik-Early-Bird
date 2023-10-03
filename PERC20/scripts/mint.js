// Import necessary modules from Hardhat, SwisstronikJS contract that been already deployed
const hre = require("hardhat");
const {  encryptDataField,  decryptNodeResponse,} = require("@swisstronik/swisstronik.js");
const pDAISY = "0xc42AD340b36b7f72FEb4311F0818Cc017D13Ab73" //contract PERC20


const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpcLink = hre.network.config.url;
  const [encryptedData] = await encryptDataField(rpcLink, data);

  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const contractAddress = pDAISY;
  const [signer] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory("pDAISY");
  const contract = contractFactory.attach(contractAddress);
  const functionName = "mint";
  const mintToken = await sendShieldedTransaction(
    signer,
    contractAddress,
    contract.interface.encodeFunctionData(functionName),
    0
  );

  await mintToken.wait();

  console.log("Tx: ", mintToken.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
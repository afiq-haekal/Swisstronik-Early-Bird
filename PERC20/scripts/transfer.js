// Import necessary modules from Hardhat and SwisstronikJS
const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/swisstronik.js");
const pDAISY = "0xc42AD340b36b7f72FEb4311F0818Cc017D13Ab73"; //contract PERC20
const recipient = "0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1"; //recipient address
const amount = "1"; //amount transfer


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
  const replace_contractAddress = pDAISY;
  const [signer] = await hre.ethers.getSigners();
  const replace_contractFactory = await hre.ethers.getContractFactory(
    "pDAISY"
  );
  const contract = replace_contractFactory.attach(replace_contractAddress);
  const replace_functionName = "transfer";
  const replace_functionArgs = [ recipient, amount, ];
  const transaction = await sendShieldedTransaction(
    signer,
    replace_contractAddress,
    contract.interface.encodeFunctionData(
      replace_functionName,
      replace_functionArgs
    ),
    0
  );

  await transaction.wait();

  console.log("Tx: ", transaction.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
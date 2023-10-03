require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
const PK = process.env.PRIVATE_KEY

module.exports = {
  defaultNetwork: "swisstronik",
  solidity: "0.8.19",
  networks: {
    swisstronik: {
      url: "https://json-rpc.testnet.swisstronik.com/",
      accounts: [`0x` + `${PK}`],
    },
  },
};
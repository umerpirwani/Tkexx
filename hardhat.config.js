require("@nomiclabs/hardhat-waffle");
const fs = require('fs');
// const privateKey = fs.readFileSync(".secret").toString().trim() || "01234567890123456789";
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";
const ALCHEMY_API_KEY = "A0OZ9ODZJAydl7kYCC_nwLTR0jTccD3G";
const MAINNET_PRIVATE_KEY = "a42c2258c0128d3ee4a77008d71e3be45c5962b7e18d2cdf823559f546616ed8";
module.exports = {
  solidity: "0.8.3",
  networks: {
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${MAINNET_PRIVATE_KEY}`]
    }
  }
};

// module.exports = {
//   defaultNetwork: "hardhat",
//   networks: {
//     mainnet: {
      
//     },
    /*
    mumbai: {
      // Infura
      // url: `https://polygon-mumbai.infura.io/v3/${infuraId}`
      url: "https://rpc-mumbai.matic.today",
      accounts: [privateKey]
    },
    matic: {
      // Infura
      // url: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
      url: "https://rpc-mainnet.maticvigil.com",
      accounts: [privateKey]
    }
    */
//   },
//   solidity: {
//     version: "0.8.4",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 200
//       }
//     }
//   }
// };
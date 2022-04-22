const hre = require("hardhat");
const fs = require('fs');

async function main() {
  // const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
  // const nftMarket = await NFTMarket.deploy();
  // await nftMarket.deployed();
  // console.log("nftMarket deployed to:", nftMarket.address); // set this in config.js marketplaceContractAdress
  // 0xBF50c30a7fC5e0dA4C0A7Bd155FdAE11948Fc699 deployed
  // export const nftmarketaddress = "${nftMarket.address}"
  // const NFT = await hre.ethers.getContractFactory("NFT");
  // const nft = await NFT.deploy("0xBF50c30a7fC5e0dA4C0A7Bd155FdAE11948Fc699");
  // await nft.deployed();
  // console.log("nft deployed to:", nft.address); // set this in config.js nftContractAddress
  let config = `
  export const nftaddress = "${nft.address}"
  export const nftmarketaddress = "${nftMarket.address}"
  `
  let data = JSON.stringify(config)
  fs.writeFileSync('config.js', JSON.parse(data))
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
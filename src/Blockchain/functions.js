import {ethers} from 'ethers'


import{
    handleAccountChange
} from './config.js'
//const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
const ethereum = window.ethereum

export function connect(addressChange) {
    ethereum.request({ method: 'eth_requestAccounts' })
    .then((accounts)=>{
      handleAccountChange(accounts)
      if(accounts.length>0){
        addressChange(accounts[0])
      }   
    })
    .catch((err) => {
      if (err.code === 4001) {
        alert('Please connect to MetaMask.');
      } else {
        alert(err);
      }
    });
}
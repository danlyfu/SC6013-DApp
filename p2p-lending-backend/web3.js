// Import required modules
import 'dotenv/config'; // This is equivalent to require('dotenv').config()
import Web3 from 'web3';
import contractABI from './abis/DecentralizedLendingABI.json';

// Use Infura URL from environment variables
const web3 = new Web3(process.env.INFURA_URL);
const contractAddress = "0x67f4c10C2C1101AAD8F7b02E2284deC633A93d7A";  // v1
const contract = new web3.eth.Contract(contractABI, contractAddress);

export { web3, contract };

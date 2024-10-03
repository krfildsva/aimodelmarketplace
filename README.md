# AI Model Market Place

## About Project
This decentralized application (dApp) allows users to list, purchase, and rate AI models. Made using Hardhat and Holesky.

## Getting Started

- Open Visual Studio
- Run these commands
```Terminal
npm i hardhat
npx hardhat init
```
- In contracts/Lock.sol add your contract
- Create scripts/deploy.js
```JavaScript
const { ethers } = require("hardhat");

async function main() {
  // Get the deployer account
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Get the contract factory and deploy the contract
  const MyContract = await ethers.getContractFactory("AIModelMarketplace"); // Replace with your contract name
  const contract = await MyContract.deploy();

  console.log("Contract deployed to address:", contract.target);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```
- Add Holesky Etherium Url of your project in Alchemy and your secret key from Metamask
- Make sure you have Holesky ETH in your wallet(You can get some in Google Cloud)
- Run these code
  ```Terminal
  npx hardhat compile
  npx hardhat run script/deploy.js --network holesky
  ```
- Next create HTML and JS codes of your site(Add your ABI and Contract Address from your Deployment)

## How to Use
### Open HTML file in your local server
Now You can:
- List Models
- See them on display
- Buy them
- Rate them
- Withdraw your funds
  
![image](https://github.com/user-attachments/assets/b095e158-3363-4701-905b-2a034466bf57)

## Example
### List a Model:
    1. Open the dApp.
    2. Fill in the form with the model’s name, description, and price.
    3. Click the "List Model" button to add it to the marketplace.


## License

This project is licensed under the MIT License - see the LICENSE file for details.

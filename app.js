// Frontend JavaScript using Web3.js
window.addEventListener('load', async () => {
    if (window.ethereum) {
        // Modern dapp browsers...
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable(); // Request account access
    } else {
        alert("Please install MetaMask to use this dApp!");
        return;
    }

    const contractAddress = "0x009c5780BCE12b497041f1018C5f052CCB43d1c2"; // Replace with your contract address
    const contractABI = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "modelId",
              "type": "uint256"
            }
          ],
          "name": "getModelDetails",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "uint8",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            }
          ],
          "name": "listModel",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "models",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "uint8",
              "name": "ratingSum",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "ratingCount",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "nextModelId",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "modelId",
              "type": "uint256"
            }
          ],
          "name": "purchaseModel",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "purchasedModels",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "modelId",
              "type": "uint256"
            },
            {
              "internalType": "uint8",
              "name": "rating",
              "type": "uint8"
            }
          ],
          "name": "rateModel",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "withdrawFunds",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]; // Paste your contract ABI here

    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // List a new AI model
    document.getElementById('listModelForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.getElementById('modelName').value;
        const description = document.getElementById('modelDescription').value;
        const priceInEth = document.getElementById('modelPrice').value;
        const priceInWei = web3.utils.toWei(priceInEth, 'ether');

        const accounts = await web3.eth.getAccounts();
        await contract.methods.listModel(name, description, priceInWei).send({ from: accounts[0] });
        alert('Model listed successfully!');
        displayModels(); // Refresh the model list
    });

    // Buy an AI model
    document.getElementById('purchaseForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const modelId = document.getElementById('modelId').value;

        const accounts = await web3.eth.getAccounts();
        const model = await contract.methods.models(modelId).call();
        const price = model.price;

        await contract.methods.purchaseModel(modelId).send({ from: accounts[0], value: price });
        alert('Model purchased successfully!');
    });

    // Rate an AI model
    // Rate an AI model
document.getElementById('rateModelForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const modelId = document.getElementById('modelIdRate').value;
    const rating = document.getElementById('modelRating').value;

    const accounts = await web3.eth.getAccounts();
    
    try {
        await contract.methods.rateModel(modelId, rating).send({ from: accounts[0], value: 0 }); // Explicitly set value to 0
        alert('Model rated successfully!');
    } catch (error) {
        console.error('Error rating model:', error);
        alert('There was an issue with rating the model.');
    }
});


    // Withdraw funds for creator
    document.getElementById('withdrawButton').addEventListener('click', async () => {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.withdrawFunds().send({ from: accounts[0] });
        alert('Funds withdrawn successfully!');
    });

    // Display available AI models
    async function displayModels() {
        const totalModels = await contract.methods.nextModelId().call();
        const modelList = document.getElementById('models');
        modelList.innerHTML = ''; // Clear the list before displaying

        for (let i = 0; i < totalModels; i++) {
            const model = await contract.methods.models(i).call();
            const averageRating = model.ratingCount > 0 ? (model.ratingSum / model.ratingCount).toFixed(2) : 0;

            const listItem = document.createElement('li');
            listItem.innerText = `ID: ${model.id}, Name: ${model.name}, Price: ${web3.utils.fromWei(model.price, 'ether')} ETH, Rating: ${averageRating}`;
            modelList.appendChild(listItem);
        }
    }

    // Call the display function on load
    await displayModels();
});

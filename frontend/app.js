if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask detected!');
} else {
    alert("Please install MetaMask to use this dApp!");
}

const contractAddress = "0x8fd97936250836892a3b5bc0145a44b390dfca61e154daa2a403bbee4dad8cd0";
const contractABI = [
    [
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "encryptedTitle",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "encryptedContent",
                    "type": "bytes32"
                }
            ],
            "name": "addEntry",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "entryId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "EntryUpdated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "entryId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "NewEntry",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "entryId",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes32",
                    "name": "encryptedTitle",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "encryptedContent",
                    "type": "bytes32"
                }
            ],
            "name": "updateEntry",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getEntriesCount",
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
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "entryId",
                    "type": "uint256"
                }
            ],
            "name": "getEntry",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]

    {
        "constant": false,
        "inputs": [{"name": "_entry", "type": "string"}],
        "name": "addEntry",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getEntries",
        "outputs": [{"name": "", "type": "string[]"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

let web3;
let diaryContract;
let currentAccount;

// DOM elements
const connectButton = document.getElementById("connectWallet");
const submitButton = document.getElementById("submitEntry");
const diaryEntryInput = document.getElementById("diaryEntry");
const entryList = document.getElementById("entryList");
const loadingMessage = document.getElementById("loadingMessage");

connectButton.addEventListener("click", connectWallet);
submitButton.addEventListener("click", submitEntry);

// Initialize Web3 and Contract
async function initializeWeb3() {
    web3 = new Web3(window.ethereum);
    diaryContract = new web3.eth.Contract(contractABI, contractAddress);
    const accounts = await web3.eth.getAccounts();
    currentAccount = accounts[0];
    document.getElementById("connectWallet").innerText = "Wallet Connected";
    loadEntries();
}

// Connect to MetaMask
async function connectWallet() {
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        await initializeWeb3();
    } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        alert("Error connecting to MetaMask.");
    }
}

// Add new entry to the blockchain
async function submitEntry() {
    const entry = diaryEntryInput.value.trim();
    if (!entry) {
        alert("Please write something to submit!");
        return;
    }

    loadingMessage.style.display = "block";
    try {
        await diaryContract.methods.addEntry(entry).send({ from: currentAccount });
        diaryEntryInput.value = ""; // Clear input field
        loadEntries();  // Reload entries after adding
        alert("Diary entry added successfully!");
    } catch (error) {
        console.error("Error adding entry:", error);
        alert("Failed to add entry.");
    } finally {
        loadingMessage.style.display = "none";
    }
}

// Load diary entries from the blockchain
async function loadEntries() {
    const entries = await diaryContract.methods.getEntries().call();
    entryList.innerHTML = ""; // Clear existing entries

    if (entries.length > 0) {
        entries.forEach(entry => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<span>${entry}</span><small>Added by: ${currentAccount}</small>`;
            entryList.appendChild(listItem);
        });
    } else {
        entryList.innerHTML = "<li>No entries found.</li>";
    }
}

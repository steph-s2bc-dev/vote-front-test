const connectWalletMsg = document.querySelector("#connectWalletMessage");
const connectWalletBtn = document.querySelector("#connectWalletbutton");
const votingStation = document.querySelector("#votingStation");
const timerTime = document.querySelector("#time");
const timerMessage = document.querySelector("#timerMessage");
const mainBoard = document.querySelector("#mainBoard");
const voteForm = document.querySelector("#voteForm");
const vote = document.querySelector("#vote");
const voteBtn = document.querySelector("#sendVote");
const showResultContainer = document.querySelector("#showResultContainer");
const showResult = document.querySelector("#showResult");
const result = document.querySelector("#result");
const admin = document.querySelector("#admin");
const addCandidateInput = document.querySelector("#addCandidateInput");
const specifyDuration = document.querySelector("#specifyDuration");
const startElectionButton = document.querySelector("#startElectionButton");
const addCandidateInputBonus = document.querySelector("#addCandidateInputBonus");
const addCandidateButton = document.querySelector("#addCandidateButton");
const resetBtn = document.querySelector("#resetElectionButton");




// configure ethers
const contractAddress = '0x70b3De80feaa3a61151534DAfA7FE2E465842cAB';
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "ElectionFinished",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "ElectionReset",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "startTimestamp",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "endTimestamp",
        "type": "uint256"
      }
    ],
    "name": "ElectionStarted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "candidateId",
        "type": "uint256"
      }
    ],
    "name": "VoteCast",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "ListOfVoters",
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
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "candidates",
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
        "internalType": "uint256",
        "name": "numberOfVotes",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "checkElectionPeriod",
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
    "inputs": [],
    "name": "electionStarted",
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
    "inputs": [],
    "name": "electionTimer",
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
    "name": "emergencyStopElection",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "endElection",
    "outputs": [],
    "stateMutability": "nonpayable",
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
    "inputs": [],
    "name": "removeAllCandidates",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_candidateId",
        "type": "uint256"
      }
    ],
    "name": "removeCandidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "resetAllVoterStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "resetElection",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retrieveVotes",
    "outputs": [
      {
        "components": [
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
            "internalType": "uint256",
            "name": "numberOfVotes",
            "type": "uint256"
          }
        ],
        "internalType": "struct Voting.Candidate[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "_candidates",
        "type": "string[]"
      },
      {
        "internalType": "uint256",
        "name": "_votingDuration",
        "type": "uint256"
      }
    ],
    "name": "startElection",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "voteTo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_voter",
        "type": "address"
      }
    ],
    "name": "voterStatus",
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
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "voters",
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
    "inputs": [],
    "name": "votingEndTimeStamp",
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
    "name": "votingStartTimeStamp",
    "outputs": [
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

let contract;
let signer;


// const provider = new ethers.providers.Web3Provider(window.ethereum, 1287);
// provider.send("eth_requestAccounts", []).then(() => {
//     provider.listAccounts().then((accounts) => {
//         signer = provider.getSigner(accounts[0]);
//         contract = new ethers.Contract(contractAddress, contractABI, signer);
//     });
// });


// Function to connect Metamask
connectWalletBtn.addEventListener("click", async () => {
  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
   // connectWalletBtn.style.display = "none";
   connectWalletBtn.textContent = "Connected";
   connectWalletBtn.style.backgroundColor = "#2ec27eff"; // Change the background color to light green

   const provider = new ethers.providers.Web3Provider(window.ethereum, 1287);

provider.send("eth_requestAccounts", []).then(() => {
    console.log("Accounts requested");
    
    provider.listAccounts().then((accounts) => {
        console.log("List of accounts:", accounts);
        
        signer = provider.getSigner(accounts[0]);
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        
        console.log("Signer and Contract set up");
    });
});

      votingStation.style.display = "block";
  } catch (error) {
      console.error(error);
      console.log("Error connecting to Metamask. Please make sure it's installed and unlocked.");
  }
});

// Function to start the election
startElectionButton.addEventListener("click", async () => {
  try {
      const candidates = addCandidateInput.value.split(",");
      const votingDuration = specifyDuration.value;

      const provider = new ethers.providers.Web3Provider(window.ethereum, 1287);

provider.send("eth_requestAccounts", []).then(() => {
    console.log("Accounts requested");
    
    provider.listAccounts().then((accounts) => {
        console.log("List of accounts:", accounts);
        
        signer = provider.getSigner(accounts[0]);
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        
        console.log("Signer and Contract set up");
    });
});

      await contract.startElection(candidates, votingDuration);
      console.log("Election started successfully!");
  } catch (error) {
      console.error(error);
      console.log("Error starting the election: " + error.message);
  }
});



// Function to vote
voteBtn.addEventListener("click", async () => {
  try {
      const candidateId = vote.value;
      await contract.voteTo(candidateId);
      console.log("Vote cast successfully!");
  } catch (error) {
      console.error(error);
      console.log("Error casting vote: " + error.message);
  }
});

// Function to end the election
endElectionButton.addEventListener("click", async () => {
  try {
      await contract.endElection();
      console.log("Election ended successfully!");
  } catch (error) {
      console.error(error);
      console.log("Error ending the election: " + error.message);
  }
});

// Function to reset Election
resetBtn.addEventListener("click", async () => {
  try {
      await contract.resetElection();
      console.log("Reset successfully!");
  } catch (error) {
      console.error(error);
      console.log("Error reseting: " + error.message);
  }
});


async function displayCandidates() {
  if (contract) {
    const candidates = await contract.retrieveVotes();
    const candidateBoard = document.querySelector("#candidateBoard");
    const rows = candidateBoard.querySelectorAll("tr");
    
    for (let i = 1; i < rows.length; i++) {
      candidateBoard.removeChild(rows[i]);
    }

    if (candidates.length === 0) {
      const noCandidatesRow = document.createElement("tr");
      noCandidatesRow.innerHTML = `
        <td colspan="3">No candidates yet</td>
      `;
      candidateBoard.appendChild(noCandidatesRow);
    } else {
      candidates.forEach(candidate => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <th>${candidate.id || "No ID yet"}</th>
            <th>${candidate.name || "No name yet"}</th>
            <th>${candidate.numberOfVotes || "No vote yet"}</th>
        `;
        candidateBoard.appendChild(row);
      });
    }
  }
}


// Function to Display Candidate
showCandidateList.addEventListener("click", async () => {
  try {
    
      displayCandidates();
      console.log("display successfully!");

  } catch (error) {
      console.error(error);
      console.log("Error display: " + error.message);
  }
});

// Function to Display Results
showResult.addEventListener("click", async () => {
  try {
    
      displayResults();
      console.log("display results successfully!");

  } catch (error) {
      console.error(error);
      console.log("Error display: " + error.message);
  }
});


// Call displayCandidates() to display candidates when the page loads
displayCandidates();

// Function to check if account is already connected
async function checkAccountConnection() {
  try {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length > 0) {
      // Account is already connected
      connectWalletBtn.textContent = "Connected";
      connectWalletBtn.style.backgroundColor = "#00FF00"; // Change the background color
      votingStation.style.display = "block";
    } else {
      // Account is not connected
      // Wait for the user to connect the wallet
    }
  } catch (error) {
    console.error(error);
    alert("Error checking account connection. Please make sure Metamask is installed and unlocked.");
  }
}

// Call checkAccountConnection() at the startup of the page
window.addEventListener('DOMContentLoaded', checkAccountConnection);

// Function to update the timer message
function updateTimerMessage(seconds) {
  const timerMessage = document.getElementById("time");
  timerMessage.textContent = seconds;
  timerMessage.innerHTML = `<span id="time">${seconds}</span> seconds left`;
}

// calling contract.electionTimer() inside an async function
async function showTimer() {
  try {
    let secondsLeft = await contract.electionTimer();
    console.log("Seconds left:", secondsLeft); // Added console.log
    updateTimerMessage(secondsLeft);

    // ...
  } catch (error) {
    console.error("Error:", error); // Added console.error
    // Handle errors
  }
}

console.log("Event listener set up");
document.getElementById("showTimerButton").addEventListener("click", async () => {
  await showTimer();
  console.log("Timer displayed successfully!");
});
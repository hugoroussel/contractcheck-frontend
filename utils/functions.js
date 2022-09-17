import { ethers } from "ethers";

const ContractCheckAddressLocalhost = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const ContractCheckAddressOptimism = '0xB5A49dEB5C8840940c5930cc75E2E175867fb5fb';

let full_abi = `[
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "certificateId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "contractAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "CertificateModified",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "certificateId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "contractAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "NewCertificateCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "certificateId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "validator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "contractAddress",
        "type": "address"
      }
    ],
    "name": "Validated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_certificateId",
        "type": "bytes32"
      }
    ],
    "name": "_validate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32[]",
        "name": "_certificateIds",
        "type": "bytes32[]"
      }
    ],
    "name": "batchValidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "certificateRegistry",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "cid",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "contractAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "chainId",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "valid",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "creationTime",
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
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "certificatesIds",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
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
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "contractAddressToCertificateIds",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_certificateId",
        "type": "bytes32"
      }
    ],
    "name": "getAllValidatorsOfCertificate",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCertificateIds",
    "outputs": [
      {
        "internalType": "bytes32[]",
        "name": "",
        "type": "bytes32[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_contract",
        "type": "address"
      }
    ],
    "name": "getCertificatedIdsForContractAddress",
    "outputs": [
      {
        "internalType": "bytes32[]",
        "name": "",
        "type": "bytes32[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getCertificatedIdsOfCertificatesValidatedByUser",
    "outputs": [
      {
        "internalType": "bytes32[]",
        "name": "",
        "type": "bytes32[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "isValidator",
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
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_contractAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_chainId",
        "type": "uint256"
      }
    ],
    "name": "newCertificate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_certificateId",
        "type": "bytes32"
      }
    ],
    "name": "removeValidity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "userValidatedCertificateIds",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]`

// ABI
let CC_ABI = [
    /*
    `struct Certificate {
        string name;
        address contractAddress;
        address owner;
        uint256 chainId;
        address[] validators;
        bool valid;
        uint256 creationTime;
    }`,
    */
    'function getCertificateIds() public view returns(bytes32[] memory)',
    'function getCertificatedIdsForContractAddress(address _contract) public view returns(bytes32[])',
    'function certificateRegistry(bytes32) public view returns(tuple(string name, address contractAddress, address owner, uint256 chainId, address[] validators, bool valid, uint256 creationTime))',
];


export const getProvider = () => {
    console.log(process.env.NETWORK)
    // check env variable
    if (process.env.NETWORK === 'localhost') {
        return new ethers.providers.JsonRpcProvider('http://localhost:8545');
    } else if (process.env.NETWORK === 'optimism'){
        return new ethers.providers.JsonRpcProvider("https://opt-mainnet.g.alchemy.com/v2/ecpmoryOsL0dCIGSWscHTkh_t1zQ4EYZ");
    }
}


export const getContractAddress = () => {
  // check env variable
  if (process.env.NETWORK === 'localhost') {
      return ContractCheckAddressLocalhost
  } else {
      return ContractCheckAddressOptimism
  }
}


// Write Functions
export const registerNewCertificate = async (name, contractAddress, chainId) => {
  if (window.ethereum.networkVersion !== 10 && process.env.NETWORK !== 'localhost') {
    let cid = 10;
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${cid.toString(16)}` }],
    });
  }
  let contract = getContractCheckContract()
  let res = await contract.populateTransaction.newCertificate(name, contractAddress, chainId)
  res.from = window.ethereum.selectedAddress
  // get signer of the current connected wallet
  let tx = await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [res]
  })
  console.log("tx went through?",tx)
}


export const validateCertificate = async (cid) => {
  if (window.ethereum.networkVersion !== 10 && process.env.NETWORK !== 'localhost') {
    let chainId = 10;
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });
  }
  let contract = getContractCheckContract()
  let res = await contract.populateTransaction.batchValidate([cid])
  // get signer of the current connected wallet
  res.from = window.ethereum.selectedAddress
  let tx = await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [res]
  })
  console.log("tx went through?",tx)
}

// Write Functions
export const invalidateCertificate = async (cid) => {
  if (window.ethereum.networkVersion !== 10 && process.env.NETWORK !== 'localhost') {
    let chainId = 10;
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });
  }
  let contract = getContractCheckContract()
  let res = await contract.populateTransaction.removeValidity(cid)
  res.from = window.ethereum.selectedAddress
  // get signer of the current connected wallet
  let tx = await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [res]
  })
  console.log("tx went through?",tx)
}

// READ Functions
export const getContractCheckContract = () => {
    let provider = getProvider();
    let contractAddress = getContractAddress();
    let contract = new ethers.Contract(contractAddress, full_abi, provider);
    return contract
}

export const getAllIndexed = async () => {
    let contract = getContractCheckContract()
    let cids = await contract.getCertificateIds()
    return cids
}

export const getCertificatesForAddress = async (address) => {
    let contract = getContractCheckContract()
    let cids = await contract.getCertificatedIdsForContractAddress(address)
    return cids
}

export const getCertificateWithCertificateId = async (certifId) => {
    let contract = getContractCheckContract()
    let cid = ethers.utils.hexlify(certifId)    
    console.log("CID", cid)
    let certificate = await contract.certificateRegistry(cid)
    return certificate;
}

export const getAllValidatorsOfContract = async (certifId) => {
  let contract = getContractCheckContract()
  let validators = await contract.getAllValidatorsOfCertificate(certifId)
  return validators;
}


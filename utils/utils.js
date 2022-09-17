export const chainIdToNetworkIcon = (chainId) => {
    chainId = parseInt(chainId.hex, 16);
    switch (chainId.toString()) {
        case "1":
            return 'https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0x0000000000000000000000000000000000000000.png';
        case "56":
            return 'https://storage.googleapis.com/zapper-fi-assets/tokens/binance-smart-chain/0x0000000000000000000000000000000000000000.png';
        case "137":
            return 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912';
        case "43114":
            return 'https://storage.googleapis.com/zapper-fi-assets/tokens/avalanche/0x0000000000000000000000000000000000000000.png';
        case "42161":
            return 'https://chainlist.org/_next/image?url=https%3A%2F%2Fdefillama.com%2Fchain-icons%2Frsz_arbitrum.jpg&w=64&q=75';
        case "250":
            return 'https://assets.coingecko.com/coins/images/4001/small/Fantom.png?1558015016';
        case "10":
            return 'https://storage.googleapis.com/zapper-fi-assets/tokens/optimism/0x4200000000000000000000000000000000000042.png';
        case "42220":
            return 'https://assets.coingecko.com/coins/images/11090/small/icon-celo-CELO-color-500.png?1592293590';
    }
}


export const chainIdToNetworkName = (chainId) => {
    // hex to decimal
    chainId = parseInt(chainId.hex, 16);
    switch (chainId.toString()) {
        case "1":
            return 'Ethereum';
        case "10":
            return 'Optimism';
        case "250":
            return 'Fantom';
        case "42161":
            return 'Arbitrum';
        case "56":
            return 'BSC';
        case "137":
            return 'Polygon';
        case "42220":
            return 'Celo';
        case "43114":
            return 'Avalanche';
    }
}

export const chainIdToExplorer = (chainId) => {
    chainId = parseInt(chainId.hex, 16);
    switch (chainId.toString()) {
        case "1":
            return 'https://etherscan.io';
        case "137":
            return 'https://polygonscan.com';
        case "250":
            return 'https://ftmscan.com';
        case "42161":
            return 'https://arbiscan.io';
        case "56":
            return 'https://bscscan.com';
        case "43114":
            return 'https://snowtrace.io';
        case "10":
            return 'https://optimistic.etherscan.io';
        case "42220":
            return 'https://explorer.celo.org';
    }
}

export const unixTimeStamptoDate = (timestamp) =>{
    timestamp = parseInt(timestamp.hex, 16);
    var date = new Date(timestamp*1000);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var dt = date.getDate();
    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    return (dt+'-'+month+'-'+year);
}
export const chainIdToNetworkIcon = (chainId) => {
    switch (chainId.toString()) {
        case "1":
            return 'https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0x0000000000000000000000000000000000000000.png';
    }
}


export const chainIdToNetworkName = (chainId) => {
    switch (chainId.toString()) {
        case "1":
            return 'Ethereum';
    }
}

export const chainIdToExplorer = (chainId) => {
    switch (chainId.toString()) {
        case "1":
            return 'https://etherscan.io';
    }
}

export const unixTimeStamptoDate = (timestamp) =>{
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
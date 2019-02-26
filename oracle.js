const Web3 = require('web3')
const fs = require('fs')
const path = require('path')
const infura = 'wss://ropsten.infura.io/ws/v3/f7b2c280f3f440728c2b5458b41c663d'
let contractAddress
let contractInstance
let web3
let subscription
let privateKey
let myAddress

function generateAddressesFromSeed(seed) {
    let bip39 = require("bip39");
    let hdkey = require('ethereumjs-wallet/hdkey');
    let hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(seed));
    let wallet_hdpath = "m/44'/60'/0'/0/0";
    let wallet = hdwallet.derivePath(wallet_hdpath).getWallet();
    let address = '0x' + wallet.getAddress().toString("hex");
    let myPrivateKey = wallet.getPrivateKey().toString("hex");
    myAddress = address
    privateKey = '0x' + myPrivateKey
}

// Setup web3 and start listening to events
function start() {
    const mnemonic = fs.readFileSync(".secret").toString().trim()
    generateAddressesFromSeed(mnemonic)

    // Note that we use the WebsocketProvider because the previous HttpProvider is outdated and doesn't allow subscriptions
    web3 = new Web3(new Web3.providers.WebsocketProvider(infura))
    const ABI = JSON.parse(fs.readFileSync(path.join(__dirname, 'build', 'contracts', 'Oracle.json')))
    contractAddress = ABI.networks['3'].address
    contractInstance = new web3.eth.Contract(ABI.abi, contractAddress)

    // startListening()
    generateRandom()
}

function startListening() {
    console.log('Listening to events...')
    subscription = contractInstance.events.GenerateRandom()
    subscription.on('data', newEvent => {
        console.log('New event', newEvent.returnValues)
        console.log('Sequence', newEvent.returnValues.sequence)
        console.log('Timestamp', newEvent.returnValues.timestamp)
        // if (newEvent) generateRandomNumberAndCall()
    })
}

// To send a transaction to run the generateRandom function
function generateRandom() {
    const encodedGenerateRandom = contractInstance.methods.generateRandom().encodeABI()
    const tx = {
        from: myAddress,
        gas: 7e6,
        gasPrice: 5,
        to: contractAddress,
        data: encodedGenerateRandom,
        chainId: 3
    }

    web3.eth.accounts.signTransaction(tx, privateKey).then(signed => {
        console.log('Generating transaction...')
        web3.eth.sendSignedTransaction(signed.rawTransaction)
            .on('receipt', result => {
                console.log('Transaction confirmed!', result)
            })
            .catch(error => console.log(error))
    })
}

// To generate random numbers and execute the __callback function from the smart contract
function callback() {
    const number = Math.random()
    console.log(number)

    const encodedGenerateRandom = contractInstance.methods.generateRandom().encodeABI()
    const tx = {
        from: myAddress,
        gas: 7e6,
        gasPrice: 5,
        to: contractAddress,
        data: encodedGenerateRandom,
        chainId: 3
    }

    web3.eth.accounts.signTransaction(tx, privateKey).then(signed => {
        console.log('Generating transaction...')
        web3.eth.sendSignedTransaction(signed.rawTransaction)
            .on('receipt', result => {
                console.log('Transaction confirmed!', result)
            })
            .catch(error => console.log(error))
    })
}

start()

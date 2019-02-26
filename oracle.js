const Web3 = require('web3')
const fs = require('fs')
const path = require('path')
let web3
let subscription
const smartContractAddress = ''

// Setup web3 and start listening to events
function start() {
    web3 = new Web3('https://ropsten.infura.io/v3/f7b2c280f3f440728c2b5458b41c663d')
    const abi = fs.readFileSync(path.join(__dirname, 'build', 'contracts', 'Oracle.json'))
    console.log('File', JSON.parse(file))
    // subscription = web3.eth.subscribe('logs', {
    //     address: smartContractAddress
    // }, (err, newEvent) => {
    //     if (err) console.log('Error', err)
    //     if (newEvent) generateRandomNumberAndCall()
    // })

    generateRandomNumberAndCall()
}

// To generate random numbers and call the smart contract
function generateRandomNumberAndCall() {
    const number = Math.random()
    console.log(number)
}

start()

const Web3 = require('web3')
let web3
let subscription

// Setup web3 and start listening to events
function start() {
    web3 = new Web3('https://ropsten.infura.io/v3/f7b2c280f3f440728c2b5458b41c663d')
    subscription = web3.eth.subscribe('Random', {
        address: ''
    }, (err, result) => {
        if (err) console.log('Error', err)
    })
}

function generateRandomNumberAndCall() {

}

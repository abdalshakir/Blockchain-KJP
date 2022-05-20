const sha256 = require('sha256');

class Block {
    constructor(timeStamp, data, nonce, prevHash) {
            this.timeStamp = timeStamp,
            this.data = data,
            this.nonce = nonce,
            this.prevHash = prevHash,
            this.hash = this.createHash(timeStamp, data, nonce, prevHash)
    }
    createHash(timeStamp, data, nonce, prevHash) {
        return sha256(timeStamp + JSON.stringify(data) + nonce + prevHash)
    }
}

const newBlock = new Block('5454545', { "value": "adsdsdc" }, 123, "sdhwgfsh");
console.log(newBlock)


class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]
    }

    createGenesisBlock() {
        var time = Date.now().toString();
        var nonce = 1;
        var newBlock = new Block(time, {}, nonce, "1");
        console.log("Genesis Block Created")
        return newBlock;
    }

    addBlock(data) {
        var time = Date.now().toString();
        var nonce = 12;
        var previousHash = this.chain[this.chain.length - 1].hash;
        var newBlocks = new Block(time, data, nonce, previousHash)
        this.chain.push(newBlocks);
        console.log("We got Block " + this.chain.length - 1)
    }
}

var myBlockchain = new Blockchain();
myBlockchain.addBlock({ "transaction": "Successfull" });
console.log(myBlockchain);
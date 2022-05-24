const sha256 = require('sha256');

class Block {
    constructor(timeStamp, transactions, nonce, prevHash, height) {
        this.timeStamp = timeStamp,
            this.transactions = transactions,
            this.nonce = nonce,
            this.prevHash = prevHash,
            this.height = height,
            this.hash = this.createHash(timeStamp, transactions, nonce, prevHash, height)
    }
    createHash(timeStamp, transactions, nonce, prevHash, height) {
        return sha256(timeStamp + JSON.stringify(transactions) + nonce + prevHash, height)
    }

    static proofOfWork(timeStamp, transactions, prevHash, height) {
        let nonce = 0;
        let difficulty = "001";
        let success = false;
        while (!success) {
            nonce++;
            let hash = sha256(timeStamp + JSON.stringify(transactions) + nonce + prevHash, height);
            if (hash.slice(0, 3) == difficulty) {
                success = true;
                console.log("Nonce =====> " + nonce)
            }
        } return nonce;
    }
}

// const newBlock = new Block('5454545', { "value": "adsdsdc" }, 123, "sdhwgfsh", 1);
// console.log(newBlock)


class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.memPool = [];
    }

    createGenesisBlock() {
        var time = Date.now().toString();
        var nonce = Block.proofOfWork(time, this.memPool, "0", 1);
        var newBlock = new Block(time, this.memPool, nonce, "0", 1);
        console.log("Genesis Block Created")
        return newBlock;
    }

    addBlock(transactions) {
        var time = Date.now().toString();
        var nonce = Block.proofOfWork(time, this.memPool, previousHash, this.chain.length + 1);
        var previousHash = this.chain[this.chain.length - 1].hash;
        var newBlocks = new Block(time, this.memPool, nonce, previousHash, this.chain.length + 1)
        this.chain.push(newBlocks);
        console.log("We got Block " + (this.chain.length - 1));
        this.memPool = [];
    }

    createTransactions(fromAddress, toAddress, value) {
        let trans = { "from": fromAddress, "to": toAddress, "amount": value };
        this.memPool.push(trans);
    }
}

var myBlockchain = new Blockchain();
myBlockchain.addBlock();
myBlockchain.createTransactions("Abdal", "Sundus", 50000)
console.log(myBlockchain);
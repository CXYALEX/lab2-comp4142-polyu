const Block = require("./block");
const Blockchain = require('./blockchain');

class Miner {
    constructor(blockchain) {
        this.blockchain = blockchain;
    }
    mine(transactions) {
        let baseBlock = Miner.generateNextBlock(this.blockchain, transactions);

        return baseBlock;
    }
    static generateNextBlock(blockchain, transactions) {
        const previousBlock = blockchain.getLastBlock();
        const index = previousBlock.index + 1;
        const previousHash = previousBlock.hash;
        const timestamp = new Date().getTime() / 1000;
        const nonce = 0;
        let newBlock = new Block(index, timestamp, nonce, transactions, previousHash);
        return newBlock;
    }
}

module.exports = Miner;

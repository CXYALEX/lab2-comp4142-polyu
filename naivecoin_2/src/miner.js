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
        let block = Miner.proveWorkFor(newBlock, blockchain.getDifficulty(index))
        return block;
    }

    static proveWorkFor(block, difficulty) {
        let blockDifficulty = null;
        let start = process.hrtime();

        // INFO: Every cryptocurrency has a different way to prove work, this is a simple hash sequence

        // Loop incrementing the nonce to find the hash at desired difficulty
        do {
            block.nonce++;
            block.hash = block.toHash();
            blockDifficulty = block.getDifficulty();
        } while (blockDifficulty >= difficulty);
        console.info(`Block found: time '${process.hrtime(start)[0]} sec' dif '${difficulty}' hash '${block.hash}' nonce '${block.nonce}'`);
        return block;
    }
}

module.exports = Miner;

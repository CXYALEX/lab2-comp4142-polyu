const R = require('ramda');
const Db = require('../util/db');
const Blocks = require('./blocks');
const Block = require('./block');

// Database settings
const BLOCKCHAIN_FILE = 'blocks.json';

class Blockchain {
    constructor(dbName) {
        this.blocksDb = new Db('data/' + dbName + '/' + BLOCKCHAIN_FILE, new Blocks());

        // INFO: In this implementation the database is a file and every time data is saved it rewrites the file, probably it should be a more robust database for performance reasons
        this.blocks = this.blocksDb.read(Blocks);

        this.init();
    }

    init() {
        // Create the genesis block if the blockchain is empty
        if (this.blocks.length == 0) {
            console.info('Blockchain empty, adding genesis block');
            this.blocks.push(new Block(0, 0, 0, "data: genesis", 0));
            this.blocksDb.write(this.blocks);
        }
    }

    addBlock(newBlock) {
        this.blocks.push(newBlock);
        this.blocksDb.write(this.blocks);

        console.info(`Block added: ${newBlock.hash}`);
        console.debug(`Block added: ${JSON.stringify(newBlock)}`);

        return newBlock;
    }

    getLastBlock() {
        return R.last(this.blocks);
    }
}

module.exports = Blockchain;

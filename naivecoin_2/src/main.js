const Blockchain = require('./blockchain');
const Miner = require('./miner');
const Node = require('./node')
const name = 'naivechain_4142';

let blockchain = new Blockchain(name);
let miner = new Miner(blockchain);
let node = new Node(blockchain);

let newblock = miner.mine("data: comp4142");

node.checkReceivedBlocks(newblock)

newblock = miner.mine("data: comp6701");

node.checkReceivedBlocks(newblock)

newblock = miner.mine("data: comp6703");

node.checkReceivedBlocks(newblock)



console.log(JSON.stringify(blockchain.blocks, null, 4));
const fs = require('fs');
const util = require('util');

const {default: SlippiGame} = require('slp-parser-js');
const AttackTable = require('../AttackTable');
const Combo = require('../Combo');
const ComboFilter = require('../ComboFilter');


const game = new SlippiGame('test.slp');
const meta = game.getSettings();
// console.log(util.inspect(meta, false, null, true));


const frames = game.getFrames();
// console.log(util.inspect(frames, false, null, true));

const stats = game.getStats();
console.log(util.inspect(stats, false, null, true));

try{
    fs.writeFileSync('./stats.json', JSON.stringify(stats));
} catch (err) {
    console.error(err);
}




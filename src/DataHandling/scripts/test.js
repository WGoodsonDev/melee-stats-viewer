const fs = require('fs');
const util = require('util');

const {default: SlippiGame} = require('slp-parser-js');
const AttackTable = require('../AttackTable');
const Combo = require('../Combo');
const ComboFilter = require('../ComboFilter');


const game = new SlippiGame('test.slp');
const settings = game.getSettings();
// console.log(util.inspect(meta, false, null, true));


const frames = game.getFrames();
// console.log(util.inspect(frames, false, null, true));

const stats = game.getStats();
console.log(util.inspect(settings, false, null, true));

// const finalJson = {
//     "settings": settings,
//     "frames": frames,
//     "stats": stats,
// }
//
// try{
//     fs.writeFileSync('./all_data.json', JSON.stringify(finalJson));
// } catch (err) {
//     console.error(err);
// }




const fs = require('fs');

const {default: SlippiGame} = require('slp-parser-js');
const AttackTable = require('./AttackTable');
const Combo = require('./Combo');
const ComboFilter = require('./ComboFilter');



function testScript() {
    const game = new SlippiGame('test.slp');

    const frames = game.getFrames();

    let framesArray = [];

    for(const frame in frames){
        if(frames.hasOwnProperty(frame)){
            framesArray.push(frames[frame]);
        }
    }

    let cleaned = [];
    framesArray.forEach((el, idx) => {
        if(idx !== 0 && el !== ',' && el !== ']'){
            const player1Y = el.players[0]?.pre?.positionY;
            const player2Y = el.players[1]?.pre?.positionY;
            const frameNum = el.frame;
            if(frameNum > 0){
                cleaned.push({player1Y, player2Y, frameNum});
            }
        }
    });

    return cleaned;



    // const stats = game.getStats();
    // const options = {
    //     didKill: true,
    //     minLength: 5,
    //     includedAttacks: [],
    // }
    // return ComboFilter.filterCombos(stats, options);
}

const data = testScript();

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'playerYs.csv',
    header: [
        {id: 'player1Y', title: 'player1Y'},
        {id: 'player2Y', title: 'player2Y'},
        {id: 'frameNum', title: 'frameNum'},
    ]
});

csvWriter
    .writeRecords(data)
    .then(() => console.log('The CSV file was written successfully'));


module.exports = {
    testScript
}
const fs = require('fs');
const util = require('util');

const {default: SlippiGame} = require('slp-parser-js');
const AttackTable = require('../AttackTable');
const Combo = require('../Combo');
const ComboFilter = require('../ComboFilter');



function generateCsv() {
    const game = new SlippiGame('test.slp');

    const frames = game.getFrames();
    const settings = game.getSettings();

    // console.log(util.inspect(frames[3781], false, null, true));

    let framesArray = [];

    for(const frame in frames){
        if(frames.hasOwnProperty(frame)){
            framesArray.push(frames[frame]);
        }
    }

    let cleaned = [];
    framesArray.forEach((el, idx) => {
        if(idx !== 0 && el !== ',' && el !== ']'){
            const player1X = el.players[0]?.pre?.positionX;
            const player1Y = el.players[0]?.pre?.positionY;
            const player2X = el.players[1]?.pre?.positionX;
            const player2Y = el.players[1]?.pre?.positionY;
            const frameNum = el.frame;
            if(frameNum > 0){
                cleaned.push({player1X, player1Y, player2X, player2Y, frameNum});
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

const data = generateCsv();

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'playerPositions.csv',
    header: [
        {id: 'player1X', title: 'player1X'},
        {id: 'player1Y', title: 'player1Y'},
        {id: 'player2X', title: 'player2X'},
        {id: 'player2Y', title: 'player2Y'},
        {id: 'frameNum', title: 'frameNum'},
    ]
});
//
csvWriter
    .writeRecords(data)
    .then(() => console.log('The CSV file was written successfully'));



module.exports = {
    testScript: generateCsv
}
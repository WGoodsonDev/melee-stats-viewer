const fs = require('fs');
const util = require('util');

const {default: SlippiGame} = require('slp-parser-js');
const AttackTable = require('../AttackTable');
const Combo = require('../Combo');
const ComboFilter = require('../ComboFilter');



function generateCsv(filename, outputFilename) {

    let {stageId, frames, combos} = loadData(filename);

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
                cleaned.push({player1X, player1Y, player2X, player2Y, frameNum, stageId});
            }
        }
    });

    motionTrackerCsv(cleaned, outputFilename);
}

function loadData(filename){
    const game = new SlippiGame(`${filename}`);

    const frames = game.getFrames();
    const stageId = game.getSettings().stageId;

    const stats = game.getStats();

    const combos = ComboFilter.filterCombos(stats, {
        didKill: true,
        minLength: 3,
        includedAttacks: null,
    });

    return {stageId, frames, combos};

}

function motionTrackerCsv(data, outputFilename){
    //
    const outputFilenameNoExtension = outputFilename.split('.').slice(0, -1).join('.');
    const csvWriter = require('csv-writer').createObjectCsvWriter({
        path: `./${outputFilenameNoExtension}.csv`,
        header: [
            {id: 'player1X', title: 'player1X'},
            {id: 'player1Y', title: 'player1Y'},
            {id: 'player2X', title: 'player2X'},
            {id: 'player2Y', title: 'player2Y'},
            {id: 'frameNum', title: 'frameNum'},
            {id: 'stageId', title: 'stageId'},
        ]
    });

    try{
        csvWriter
        .writeRecords(data)
        .then(() => console.log('The CSV file was written successfully'));
    } catch (err) {
        console.log(err);
    }

    
}

//
const args = process.argv.slice(2);
if(args.length === 2){
    generateCsv(args[0], args[1]);
} else {
    console.log("Expected 2 arguments: filename outputFilename")
}
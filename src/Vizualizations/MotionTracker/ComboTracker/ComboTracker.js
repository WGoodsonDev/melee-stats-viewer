/*
    Created by Warren Goodson
*/
import React from 'react';

import styles from './ComboTracker.module.css';
import ComboTrackerPath from "../ComboTrackerPath/ComboTrackerPath";
import * as d3 from "d3";

import attackTable from '../../../DataHandling/AttackTable';
import ComboHit from "../ComboTrackerPath/ComboHit/ComboHit";


const comboTracker = (props) => {
    const minComboLength = 3;
    const currentCombo = 4;

    const stageDimensions = {
        0: {
            xMin: -175.7,
            xMax: 173.6,
            yMin: -91,
            yMax: 168
        },
        1: {
            xMin: -198.75,
            xMax: 198.75,
            yMin: -146.25,
            yMax: 202.5
        },
        2: {
            xMin: -230,
            xMax: 230,
            yMin: -111,
            yMax: 180
        },
        3: {
            xMin: -224,
            xMax: 224,
            yMin: -108.8,
            yMax: 200
        },
        4: {
            xMin: -246,
            xMax: 246,
            yMin: -140,
            yMax: 188
        },
        5: {
            xMin: -255,
            xMax: 255,
            yMin: -123,
            yMax: 250
        }
    }

    const svgDimensions = {
        0: {
            xDim: 857.04,
            yDim: 636
        },
        1: {
            xDim: 731.35,
            yDim: 642
        },
        2: {
            xDim: 1013.67,
            yDim: 642
        },
        3: {
            xDim: 930.48,
            yDim: 642
        },
        4: {
            xDim: 966.94,
            yDim: 642
        },
        5: {
            xDim: 877.06,
            yDim: 642
        }
    }

    const xScale = d3.scaleLinear()
        .domain([[stageDimensions[props.stageId].xMin], [stageDimensions[props.stageId].xMax]])
        .range([0, svgDimensions[props.stageId].xDim]) // instead of props.width, use width of background image
    const yScale = d3.scaleLinear()
        .domain([[stageDimensions[props.stageId].yMin], [stageDimensions[props.stageId].yMax]])
        .range([[svgDimensions[props.stageId].yDim], 0]); // height is the same, based on styling

    const p1Line = d3.line()
        .x(d => xScale(d.player1X))
        .y(d => yScale(d.player1Y));

    const p2Line = d3.line()
        .x(d => xScale(d.player2X))
        .y(d => yScale(d.player2Y));

    const p1ComboColorScale = d3.scaleLinear()
        .domain([0, 10])
        .range(["purple", "steelblue"])

    const p2ComboColorScale = d3.scaleLinear()
        .domain([0, 10])
        .range(["green", "red"])


    const generateHitBubbles = () => {


        let p1HitBubbles = [];
        let p2HitBubbles = [];
        if(props.hitBubblesVisibleP1){
            if(props.comboHits){
                p1HitBubbles = props.comboHits.map((hit, idx) => {
                    return (
                        <ComboHit character={hit.character} hit={hit} color={props.color} key={idx} hitNo={idx + 1}/>
                    );
                })
            }
        }
        if(props.hitBubblesVisibleP2){
            if(props.comboHits){
                p2HitBubbles = props.comboHits.map((hit, idx) => {
                    return (
                        <ComboHit character={hit.character} hit={hit} color={props.color} key={idx} hitNo={idx + 1}/>
                    );
                })
            }
        }
        console.log(p1HitBubbles, p2HitBubbles);
        return [p1HitBubbles, p2HitBubbles];
    }

    const makeComboPaths = () => {
        const p1Index = props.combos[0].playerIndex;



        let comboPathsP1 = [];
        let comboPathsP2 = [];



        const positionData = props.frameData.map(frame => {
            return {
                "player1X": frame.player1.PreX,
                "player1Y": frame.player1.PreY,
                "player2X": frame.player2.PreX,
                "player2Y": frame.player2.PreY,
            }
        })

        props.combos.forEach( (combo, idx) => {
            const comboSlice = positionData.slice(combo.startFrame, combo.endFrame);

            let comboSliceOffense = [];

            // const {comboHitsP1, comboHitsP2} = generateHitObjects(combo, positionData);

            let comboHitsP1 = [];
            let comboHitsP2 = [];
            if (combo.moves.length >= minComboLength) {
                comboHitsP1 = combo.moves.map((move) => {
                    return {
                        "frame": move.frame,
                        "move": attackTable[move.moveId],
                        "x": xScale(positionData[move.frame].player1X),
                        "y": yScale(positionData[move.frame].player1Y),
                        "hitCount": move.hitCount,
                        "damage": move.damage.toPrecision(2),
                        "character": props.frameData[0]["player1"].Character
                    };
                });
                console.log(combo.moves);
                comboHitsP2 = combo.moves.map((move) => {
                    return {
                        "frame": move.frame,
                        "move": attackTable[move.moveId],
                        "x": xScale(positionData[move.frame].player2X),
                        "y": yScale(positionData[move.frame].player2Y),
                        "hitCount": move.hitCount,
                        "damage": move.damage.toPrecision(2),
                        "character": props.frameData[0]["player2"].Character
                    };
                });


            }


            comboPathsP1.push(<ComboTrackerPath key={idx}
                                                     d={p1Line(comboSlice)}
                                                     color={p1ComboColorScale(idx)}
                                                     comboLength={combo.moves.length}
                                                     playerIdx={combo.playerIndex}
                                                     comboHits={comboHitsP1}
                                                     didKill={combo.didKill}

            />);

            comboPathsP2.push(<ComboTrackerPath key={idx + 1000}
                                                     d={p2Line(comboSlice)}
                                                     color={p2ComboColorScale(idx)}
                                                     comboLength={combo.moves.length}
                                                     playerIdx={combo.playerIndex}
                                                     hitsTaken={comboHitsP2}
                                                     didKill={combo.didKill}



            />);



        });

        return {comboPathsP1, comboPathsP2};
    }

    const generateComboText = () => {
         return props.combos.moves?.map((hit, idx) => {
                return (<text x={640} y={40 * (idx + 1)}>{idx + 1}: {hit.move}: {hit.damage}%</text>);
            }
        )
    }




        // const {p1ComboPathsOffense, p2ComboPathsDefense, p2ComboPathsOffense, p1ComboPathsDefense} = makeComboPaths();
        //
        // console.log(p1ComboPathsOffense.length, p2ComboPathsDefense.length);


    const {comboPathsP1, comboPathsP2} = makeComboPaths();

    // Conditionally return content based on props (button controls)
    let displayOffense = [];
    let displayDefense = [];
    if (props.displayP1) {
        displayOffense = comboPathsP1;
    }
    if (props.displayP2) {
        displayDefense = comboPathsP2;
    }

    const comboText = generateComboText();
    const {p1Hits, p2Hits} = generateHitBubbles();

    return (
        <g>
            {props.allCombos ? displayOffense : displayOffense[props.currentCombo]}
            {props.allCombos ? displayDefense : displayDefense[props.currentCombo]}
            {/*{props.allCombos ? null : comboText[props.currentCombo]}*/}
            {props.hitBubblesVisibleP1 ? p1Hits : null}
            {props.hitBubblesVisibleP2 ? p2Hits : null}
            {comboText}
        </g>
    );

}

export default comboTracker;
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
        .domain([10, 100])
        .range(["purple", "cyan"])

    const p2ComboColorScale = d3.scaleLinear()
        .domain([10, 100])
        .range(["yellow", "red"])


    const makeComboPaths = () => {

        let comboPathsOffense = [];
        let comboPathsDefense = [];

        let comboHitsOffense = [];
        let comboHitsDefense = [];

        let comboBubblesOffense = [];
        let comboBubblesDefense = [];

        const positionData = props.frameData.map(frame => {
            return {
                "player1X": frame.player1.PreX,
                "player1Y": frame.player1.PreY,
                "player2X": frame.player2.PreX,
                "player2Y": frame.player2.PreY,
            }
        })

        // For each individual combo, do:
        //      make comboSlice: positional data from beginning of combo to end
        //      if this combo's length is above the threshold:
        //
        props.combos.forEach( (combo, idx) => {

            const comboSlice = positionData.slice(combo.startFrame, combo.endFrame);

            if (combo.moves.length >= props.minComboLength) {
                comboHitsOffense = combo.moves.map((move) => {
                    return {
                        "frame": move.frame,
                        "move": attackTable[move.moveId],
                        "x": xScale(positionData[move.frame].player1X),
                        "y": yScale(positionData[move.frame].player1Y),
                        "hitCount": move.hitCount,
                        "damage": move.damage.toPrecision(2),
                        "character": props.frameData[0]["player1"].Character,
                        "playerIdx": combo.playerIndex,
                        "opponentIdx": combo.opponentIndex
                    };
                });
                comboHitsDefense = combo.moves.map((move) => {
                    return {
                        "frame": move.frame,
                        "move": attackTable[move.moveId],
                        "x": xScale(positionData[move.frame].player2X),
                        "y": yScale(positionData[move.frame].player2Y),
                        "hitCount": move.hitCount,
                        "damage": move.damage.toPrecision(2),
                        "character": props.frameData[0]["player2"].Character,
                        "playerIdx": combo.opponentIndex,
                        "opponentIdx": combo.playerIndex
                    };
                });
                comboPathsOffense.push(<ComboTrackerPath key={idx}
                                                         currentCombo={props.currentCombo}
                                                         d={p1Line(comboSlice)}
                                                         color={p1ComboColorScale(combo.endPercent - combo.startPercent)}
                                                         comboLength={combo.moves.length}
                                                         playerIdx={combo.playerIndex}
                                                         comboHits={comboHitsOffense}
                                                         didKill={combo.didKill}
                                                         allCombos={props.allCombos}
                                                         textX={combo.playerIndex < combo.opponentIndex ? 10 : props.svgWidth - 200}
                                                         totalDmg={(combo.endPercent - combo.startPercent).toPrecision(3)}
                />);
                comboPathsDefense.push(<ComboTrackerPath key={idx + 1000}
                                                         currentCombo={props.currentCombo}
                                                         d={p2Line(comboSlice)}
                                                         color={p2ComboColorScale(combo.endPercent - combo.startPercent)}
                                                         comboLength={combo.moves.length}
                                                         playerIdx={combo.playerIndex}
                                                         hitsTaken={comboHitsDefense}
                                                         didKill={combo.didKill}
                                                         allCombos={props.allCombos}
                                                         textX={combo.playerIndex < combo.opponentIndex ? 10 : props.svgWidth - 200}
                                                         totalDmg={(combo.endPercent - combo.startPercent).toPrecision(3)}
                />);



                comboBubblesOffense.push(comboHitsOffense.map((hit, index) => {
                    return (
                        <ComboHit hit={hit} color={p1ComboColorScale(combo.endPercent - combo.startPercent)} key={index} hitNo={index + 1} textX={hit.playerIdx >= hit.opponentIdx ? 0 : props.svgWidth - 220}/>
                    )
                }))
                comboBubblesDefense.push(comboHitsDefense.map((hit, index) => {
                    return (
                        <ComboHit hit={hit} color={p2ComboColorScale(combo.endPercent - combo.startPercent)} key={index + 1000} hitNo={index + 1} textX={hit.playerIdx >= hit.opponentIdx ? 0 : props.svgWidth - 220}/>
                    )
                }))
            }
        });



        return {comboPathsOffense, comboPathsDefense, comboBubblesOffense, comboBubblesDefense};
    }


    // const {p1ComboPathsOffense, p2ComboPathsDefense, p2ComboPathsOffense, p1ComboPathsDefense} = makeComboPaths();
    //
    // console.log(p1ComboPathsOffense.length, p2ComboPathsDefense.length);


    const {comboPathsOffense, comboPathsDefense, comboBubblesOffense, comboBubblesDefense} = makeComboPaths();


    // Conditionally return content based on props (button controls)
    let displayOffense = [];
    let displayDefense = [];
    if (props.displayP2) {
        displayOffense = comboPathsOffense;
    }
    if (props.displayP1) {
        displayDefense = comboPathsDefense;
    }

    let bubblesVisibleOffense = props.hitBubblesVisibleOffense;
    let bubblesVisibleDefense = props.hitBubblesVisibleDefense;
    if(props.allCombos){
        bubblesVisibleOffense = false;
        bubblesVisibleDefense = false;
    }


    return (
        <g>
            {props.allCombos ? displayOffense : displayOffense[props.currentCombo]}
            {props.allCombos ? displayDefense : displayDefense[props.currentCombo]}
            {/*{props.allCombos ? null : comboText[props.currentCombo]}*/}
            {bubblesVisibleOffense ? comboBubblesOffense[props.currentCombo] : null }
            {bubblesVisibleDefense ? comboBubblesDefense[props.currentCombo] : null }
        </g>
    );

}

export default comboTracker;
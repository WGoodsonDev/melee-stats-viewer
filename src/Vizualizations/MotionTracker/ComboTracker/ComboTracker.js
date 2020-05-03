/*
    Created by Warren Goodson
*/
import React from 'react';

import styles from './ComboTracker.module.css';
import MotionTrackerPath from "../MotionTrackerPath/MotionTrackerPath";
import * as d3 from "d3";
import yoshis from "../../../Assets/stages/png/yoshis_downscaled_648.png";
import fountain from "../../../Assets/stages/png/fountain_downscaled_648.png";
import stadium from "../../../Assets/stages/png/stadium_downscaled_648.png";
import battlefield from "../../../Assets/stages/png/battlefield_downscaled_648.png";
import FD from "../../../Assets/stages/png/FD_downscaled_648.png";
import dreamland from "../../../Assets/stages/png/dreamland_downscaled_648.png";

const comboTracker = (props) => {
    const minComboLength = 3;


// stageDimensions[stageId] = {
//      xMin: [number]
//      xMax: [number]
//      yMin: [number]
//      yMax: [number]
//}
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

    const svgProportions = {
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
        .range([0, svgProportions[props.stageId].xDim]) // instead of props.width, use width of background image
    const yScale = d3.scaleLinear()
        .domain([[stageDimensions[props.stageId].yMin], [stageDimensions[props.stageId].yMax]])
        .range([[svgProportions[props.stageId].yDim], 0]); // height is the same, based on styling

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

    const makeComboPaths = () => {
        const p1Index = props.combos[0].playerIndex;

        let p1ComboPathsOffense = [];
        let p2ComboPathsOffense = [];

        let p1ComboPathsDefense = [];
        let p2ComboPathsDefense = [];

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
            if(combo.playerIndex === p1Index){
                if(combo.moves.length >= minComboLength){
                    p1ComboPathsOffense.push(
                        <MotionTrackerPath key={idx}
                                         d={p1Line(comboSlice)}
                                         color={p1ComboColorScale(idx)}
                                         comboLength={combo.moves.length}
                                         playerIdx={combo.playerIndex}
                        />
                    );
                    p2ComboPathsDefense.push(
                        <MotionTrackerPath key={idx + 1000}
                                           d={p2Line(comboSlice)}
                                           color={p2ComboColorScale(idx)}
                                           comboLength={combo.moves.length}
                                           playerIdx={combo.playerIndex + 1}
                        />
                    );
                }
            } else {
                if(combo.moves.length >= minComboLength) {
                    p2ComboPathsOffense.push(<MotionTrackerPath key={idx}
                                                         d={p2Line(comboSlice)}
                                                         color={p2ComboColorScale(idx)}
                                                         comboLength={combo.moves.length}
                                                         playerIdx={combo.playerIndex}
                    />);
                }
            }
        });

        return {p1ComboPathsOffense, p2ComboPathsDefense, p2ComboPathsOffense, p1ComboPathsDefense};
    }


    const {p1ComboPathsOffense, p2ComboPathsDefense, p2ComboPathsOffense, p1ComboPathsDefense} = makeComboPaths();

    console.log(p1ComboPathsOffense.length, p2ComboPathsDefense.length);

    return (
        <g>
            {p1ComboPathsOffense[2]}
            {p2ComboPathsDefense[2]}
            {/*{p2ComboPaths}*/}
        </g>
    );
}

export default comboTracker;
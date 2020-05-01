/**
 Created by Warren Goodson

 Remember:
 // Wrong
 this.state.comment = 'Hello';
 // Correct
 this.setState({comment: 'Hello'});

 // Wrong
 this.setState({
            counter: this.state.counter + this.props.increment,
        });
 // Correct
 this.setState((state, props) => ({
            counter: state.counter + props.increment
        }));


 */

import React from 'react';
import * as d3 from "d3";

import DebugAxes from '../Generic/DebugAxes/DebugAxes';
import StageBackground from "../Generic/StageBkgndComponent/StageBkgndComponent";

import DataPoint from '../Generic/DataPoint/DataPoint';

import styles from './MotionTracker.module.css';

import playerPositions from "../../DataHandling/playerPositions.csv";


import yoshis from "../../Assets/stages/png/yoshis_downscaled_648.png";
import fountain from "../../Assets/stages/png/fountain_downscaled_648.png";
import stadium from "../../Assets/stages/png/stadium_downscaled_648.png";
import battlefield from "../../Assets/stages/png/battlefield_downscaled_648.png";
import FD from "../../Assets/stages/png/FD_downscaled_648.png";
import dreamland from "../../Assets/stages/png/dreamland_downscaled_648.png";



const motionTracker = (props) => {

    const stageSelect = {
        0: {yoshis},
        1: {fountain},
        2: {stadium},
        3: {battlefield},
        4: {FD},
        5: {dreamland}
    }

    const stageSelectString = {
        0: "Yoshi's Story",
        1: "Fountain of Dreams",
        2: "Pokemon Stadium",
        3: "Battlefield",
        4: "Final Destination",
        5: "Dreamland"
    }

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

    const makeDataPoint = (d, idx) => {
        return (<circle key={idx} r={"1"} cx={xScale(d.player1X)} cy={yScale(d.player1Y)} stroke={"black"} strokeWidth={"0.2px"}
                        opacity={"0.2"}/>);
    }

    // const dataPoints = props.data.map((d, idx) => {
    //     return makeDataPoint(d, idx);
    // })

    return (

        <div className={styles.MotionTracker}>
            <StageBackground stageId={props.stageId}/>
            <svg width={svgProportions[props.stageId].xDim}
                  height={svgProportions[props.stageId].yDim}>
                {/*<DebugAxes*/}
                {/*    width={props.width}*/}
                {/*    height={props.height}/>*/}
                <g className={"points"}>
                    {/*{dataPoints}*/}
                    {<path d={p1Line(props.data)} strokeWidth={1.2} stroke={"green"} fill={"none"} />}
                    {<path d={p2Line(props.data)} strokeWidth={1.2} stroke={"blue"} fill={"none"} />}
                </g>
            </svg>


            {/*{<h5>{currentData[2]?.player2X}</h5>}*/}

            {props.children}
        </div>
    );
}

export default motionTracker;
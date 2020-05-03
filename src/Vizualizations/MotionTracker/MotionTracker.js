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

import MotionTrackerPath from './MotionTrackerPath/MotionTrackerPath';

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

    const p1ColorScale = d3.scaleLinear()
        .domain([0, 4])
        .range(["blue", "steelblue"])

    const p2ColorScale = d3.scaleLinear()
        .domain([0, 4])
        .range(["red", "orange"])

    const makeDataPoint = (d, idx) => {
        return (<circle key={idx} r={"1"} cx={xScale(d.player1X)} cy={yScale(d.player1Y)} stroke={"black"} strokeWidth={"0.2px"}
                        opacity={"0.2"}/>);
    }

    const makeStockPaths = () => {
        const stockArray = props.stats["stocks"].map( stock => {
            if(stock.startFrame < 0){
                stock.startFrame = 0;
                return stock;
            }
            return stock;
        });
        console.log(stockArray);

        const p1Index = stockArray[0].playerIndex;

        let p1StockPaths = [];
        let p2StockPaths = [];

         stockArray.forEach( (stock, idx) => {
            const stockSlice = props.frameData.slice(stock.startFrame, stock.endFrame);
            if(stock.playerIndex === p1Index){
                p1StockPaths.push(<MotionTrackerPath key={idx} d={p1Line(stockSlice)} color={p1ColorScale(idx)}/>);
            } else {
                p2StockPaths.push(<MotionTrackerPath key={idx} d={p2Line(stockSlice)} color={p2ColorScale(idx)}/>);
            }
        });
        console.log(p1StockPaths);
         return [p1StockPaths, p2StockPaths];
    }

    const makeComboPaths = () => {
        const p1Index = props.stats["combos"][0].playerIndex;

        let p1ComboPaths = [];
        let p2ComboPaths = [];

        props.stats["combos"].forEach( (combo, idx) => {
            const comboSlice = props.frameData.slice(combo.startFrame, combo.endFrame);
            if(combo.playerIndex === p1Index){
                p1ComboPaths.push(<MotionTrackerPath key={idx} d={p1Line(comboSlice)} color={"blue"}/>)
            } else {
                p2ComboPaths.push(<MotionTrackerPath key={idx} d={p2Line(comboSlice)} color={"green"}/>)
            }
        });

        console.log(p1ComboPaths);
        return [p1ComboPaths, p2ComboPaths];
    }

    const stockPaths = makeStockPaths();
    const p1StockPaths = stockPaths[0];
    const p2StockPaths = stockPaths[1];

    const comboPaths = makeComboPaths();
    const p1ComboPaths = comboPaths[0];
    const p2ComboPaths = comboPaths[1];


    let paths = [];
    switch (props.whichViz) {
        case "combo":
            paths = [p1ComboPaths, p2ComboPaths];
            break;
        case "stock":
            paths = [p1StockPaths, p2StockPaths];
            break;
        default:
            paths = [p1ComboPaths, p2ComboPaths];
            break;
    }

    return (
        <div className={styles.MotionTracker}>


            <div className={styles.svgContainer}>

                <svg width={svgProportions[props.stageId].xDim}
                     height={svgProportions[props.stageId].yDim}>
                    {/*<DebugAxes*/}
                    {/*    width={props.width}*/}
                    {/*    height={props.height}/>*/}

                    {/*{dataPoints}*/}
                    {/*{<path d={p1Line(props.data)} strokeDasharray="2,2" strokeWidth={1.2} stroke={"green"} fill={"none"}/>}*/}
                    {/*{<path d={p2Line(props.data)} strokeDasharray="2,2" strokeWidth={1.2} stroke={"blue"} fill={"none"}/>}*/}
                    {/*{p1StockPaths}*/}
                    {/*{p2StockPaths}*/}

                    {paths}


                </svg>
            </div>

            <StageBackground stageId={props.stageId}/>


            {/*{<h5>{currentData[2]?.player2X}</h5>}*/}

            {props.children}
        </div>
    );
}

export default motionTracker;
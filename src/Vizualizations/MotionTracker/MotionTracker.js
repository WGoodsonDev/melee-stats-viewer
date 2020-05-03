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



export default class motionTracker extends React.Component{

    state = {

    }

    stageSelect = {
        0: {yoshis},
        1: {fountain},
        2: {stadium},
        3: {battlefield},
        4: {FD},
        5: {dreamland}
    }

    stageSelectString = {
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
    stageDimensions = {
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

    svgProportions = {
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

    xScale = d3.scaleLinear()
        .domain([[this.stageDimensions[this.props.stageId].xMin], [this.stageDimensions[this.props.stageId].xMax]])
        .range([0, this.svgProportions[this.props.stageId].xDim]) // instead of props.width, use width of background image
    yScale = d3.scaleLinear()
        .domain([[this.stageDimensions[this.props.stageId].yMin], [this.stageDimensions[this.props.stageId].yMax]])
        .range([[this.svgProportions[this.props.stageId].yDim], 0]); // height is the same, based on styling

    p1Line = d3.line()
        .x(d => this.xScale(d.player1X))
        .y(d => this.yScale(d.player1Y));

    p2Line = d3.line()
        .x(d => this.xScale(d.player2X))
        .y(d => this.yScale(d.player2Y));

    p1ColorScale = d3.scaleLinear()
        .domain([0, 4])
        .range(["blue", "steelblue"])

    p2ColorScale = d3.scaleLinear()
        .domain([0, 4])
        .range(["red", "orange"])

    p1ComboColorScale = d3.scaleLinear()
        .domain([0, 10])
        .range(["purple", "steelblue"])

    p2ComboColorScale = d3.scaleLinear()
        .domain([0, 10])
        .range(["green", "red"])


    makeDataPoint = (d, idx) => {
        return (<circle key={idx} r={"1"} cx={this.xScale(d.player1X)} cy={this.yScale(d.player1Y)} stroke={"black"} strokeWidth={"0.2px"}
                        opacity={"0.2"}/>);
    }

    makeStockPaths = () => {
        const stockArray = this.props.stats["stocks"].map( stock => {
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
            const stockSlice = this.props.frameData.slice(stock.startFrame, stock.endFrame);
            if(stock.playerIndex === p1Index){
                p1StockPaths.push(<MotionTrackerPath key={idx} d={this.p1Line(stockSlice)} color={this.p1ColorScale(idx)}/>);
            } else {
                p2StockPaths.push(<MotionTrackerPath key={idx} d={this.p2Line(stockSlice)} color={this.p2ColorScale(idx)}/>);
            }
        });
        console.log(p1StockPaths);
         return [p1StockPaths, p2StockPaths];
    }

    makeComboPaths = () => {
        const p1Index = this.props.stats["combos"][0].playerIndex;

        let p1ComboPaths = [];
        let p2ComboPaths = [];

        this.props.stats["combos"].forEach( (combo, idx) => {
            const comboSlice = this.props.frameData.slice(combo.startFrame, combo.endFrame);
            if(combo.playerIndex === p1Index){
                if(combo.moves.length > 1){
                    console.log([this.xScale(this.props.frameData[combo.startFrame]), this.yScale(this.props.frameData[combo.startFrame])]);
                    p1ComboPaths.push(<MotionTrackerPath key={idx}
                                                         d={this.p1Line(comboSlice)}
                                                         color={this.p1ComboColorScale(idx)}
                                                         comboStart={[this.xScale(this.props.frameData[combo.startFrame]), this.yScale(this.props.frameData[combo.startFrame])]}
                                                         comboLength={combo.moves.length}
                                                         playerIdx={combo.playerIndex}
                    />)
                }
            } else {
                if(combo.moves.length > 1) {
                    p2ComboPaths.push(<MotionTrackerPath key={idx}
                                                         d={this.p2Line(comboSlice)}
                                                         color={this.p2ComboColorScale(idx)}
                                                         comboStart={[this.xScale(this.props.frameData[combo.startFrame]), this.yScale(this.props.frameData[combo.startFrame])]}
                                                         comboLength={combo.moves.length}
                                                         playerIdx={combo.playerIndex}
                    />)
                }
            }
        });

        console.log(p1ComboPaths);
        return [p1ComboPaths, p2ComboPaths];
    }

    stockPaths = this.makeStockPaths();
    p1StockPaths = this.stockPaths[0];
    p2StockPaths = this.stockPaths[1];

    comboPaths = this.makeComboPaths();
    p1ComboPaths = this.comboPaths[0];
    p2ComboPaths = this.comboPaths[1];

    render() {
        let paths = [];
        switch (this.props.whichViz) {
            case "combo":
                paths = [this.p1ComboPaths, this.p2ComboPaths];
                break;
            case "stock":
                paths = [this.p1StockPaths, this.p2StockPaths];
                break;
            default:
                paths = [this.p1ComboPaths, this.p2ComboPaths];
                break;
        }

        return (
            <div className={styles.MotionTracker}>


                <div className={styles.svgContainer}>

                    <svg width={this.svgProportions[this.props.stageId].xDim}
                         height={this.svgProportions[this.props.stageId].yDim}>
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

                <StageBackground stageId={this.props.stageId}/>


                {/*{<h5>{currentData[2]?.player2X}</h5>}*/}

                {this.props.children}
            </div>
        );
    }



}
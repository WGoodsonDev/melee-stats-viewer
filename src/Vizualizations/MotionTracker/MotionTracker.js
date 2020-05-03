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

import StockTracker from './StockTracker/StockTracker';
import ComboTracker from './ComboTracker/ComboTracker';

import CombosButton from './ControlButtons/CombosButton/CombosButton';
import StocksButton from './ControlButtons/StocksButton/StocksButton'


import styles from './MotionTracker.module.css';

import playerPositions from "../../DataHandling/playerPositions.csv";




export default class motionTracker extends React.Component{

    state = {
        currentTracker: "combos",
        comboIndex: 0
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

    pickTracker = () => {
        switch (this.state.currentTracker) {
            case "combos":
                return (
                    <ComboTracker
                        stageId={this.props.stageId}
                        combos={this.props.stats["combos"]}
                        frameData={this.props.frameData}
                    />
                );

            case "stocks":
                return (
                    <StockTracker
                        stageId={this.props.stageId}
                        stocks={this.props.stats["stocks"]}
                        frameData={this.props.frameData}
                    />
                );
            default:

                break;
        }
    }

    switchToCombos = () => {
        this.setState({currentTracker: "combos"});
    }

    switchToStocks = () => {
        this.setState({currentTracker: "stocks"});
    }


    render() {
        const tracker = this.pickTracker();
        return (
            <div className={styles.MotionTracker}>


                <div className={styles.svgContainer}>

                    <svg width={this.svgProportions[this.props.stageId].xDim}
                         height={this.svgProportions[this.props.stageId].yDim}>
                        {/*<DebugAxes*/}
                        {/*    width={props.width}*/}
                        {/*    height={props.height}/>*/}

                        {tracker}
                    </svg>
                </div>

                <StageBackground stageId={this.props.stageId}/>

                <CombosButton click={this.switchToCombos}/>
                <StocksButton click={this.switchToStocks}/>

            </div>
        );
    }



}
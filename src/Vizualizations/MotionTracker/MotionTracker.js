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

import ControlBar from "./ControlBar/ControlBar";


import styles from './MotionTracker.module.css';

import playerPositions from "../../DataHandling/playerPositions.csv";
import ControlButton from "./ControlButtons/ControlButtonBase/ControlButton";




export default class motionTracker extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentTracker: "combos",
            comboIndex: 0,
            zoomTransform: null,
            displayP1: true,
            displayP2: true,
            allCombos: false
        }
        this.zoom = d3.zoom()
            .scaleExtent([-5, 5])
            .translateExtent([[-100, -100], [this.props.width+100, this.props.height+100]])
            .extent([[-100, -100], [this.props.width+100, this.props.height+100]])
            .on("zoom", this.zoomed.bind(this));
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
                        currentCombo={this.state.comboIndex}
                        zoomTransform={this.state.zoomTransform}
                        zoomType="scale"
                        displayP1={this.state.displayP1}
                        displayP2={this.state.displayP2}
                        allCombos={this.state.allCombos}
                    />
                );

            case "stocks":
                return (
                    <StockTracker
                        stageId={this.props.stageId}
                        stocks={this.props.stats["stocks"]}
                        frameData={this.props.frameData}
                        zoomTransform={this.state.zoomTransform}
                        zoomType="scale"
                        displayP1={this.state.displayP1}
                        displayP2={this.state.displayP2}
                    />
                );
            default:

                break;
        }
    }

    switchToCombos = () => {this.setState({currentTracker: "combos"});}

    switchToStocks = () => {this.setState({currentTracker: "stocks"});}

    nextCombo = () => {
        let newIndex = 0;
        if(this.state.comboIndex >= this.props.stats["combos"].length){
            newIndex = this.props.stats["combos"].length - 1;
        } else {
            newIndex = this.state.comboIndex + 1;
        }
        this.setState({
            comboIndex: newIndex
        }
    )}

    prevCombo = () => {
        let newIndex = 0;
        if(this.state.comboIndex <= 0){
            newIndex = 0;
        } else {
            newIndex = this.state.comboIndex - 1;
        }
        this.setState({
            comboIndex: newIndex
        })
    }

    allCombos = () => {
        this.setState({
            allCombos: !this.state.allCombos
        })
    }

    p1PathToggle = () => {
        this.setState({
            displayP1: !this.state.displayP1,
        })
    }

    p2PathToggle = () => {
        this.setState({
            displayP2: !this.state.displayP2,
        })
    }

    componentDidMount() {
        d3.select(this.refs.svg)
            .call(this.zoom)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        d3.select(this.refs.svg)
            .call(this.zoom)
    }
    zoomed() {
        this.setState({
            zoomTransform: d3.event.transform
        })
    }



    render() {
        const tracker = this.pickTracker();
        return (
            <div className={styles.MotionTracker}>


                <div className={styles.svgContainer}>

                    <svg width={this.svgProportions[this.props.stageId].xDim}
                         height={this.svgProportions[this.props.stageId].yDim}
                         fontWeight={"bold"}
                         ref={"svg"}
                    >
                        {/*<DebugAxes*/}
                        {/*    width={props.width}*/}
                        {/*    height={props.height}/>*/}

                        {tracker}
                    </svg>
                </div>

                <StageBackground stageId={this.props.stageId}/>

                <ControlBar orientation={"horizontal"}>
                    <ControlButton click={null}>Previous Game</ControlButton>
                    <ControlButton click={null}>Next Game</ControlButton>
                    <ControlButton click={this.prevCombo}>Previous Combo</ControlButton>
                    <ControlButton click={this.nextCombo}>Next Combo</ControlButton>
                    <ControlButton click={this.allCombos}>All Combos</ControlButton>
                    <ControlButton click={this.p1PathToggle}>Toggle Player 1</ControlButton>
                    <ControlButton click={this.p2PathToggle}>Toggle Player 2</ControlButton>
                    <ControlButton click={this.switchToCombos}>Switch to Combos</ControlButton>
                    <ControlButton click={this.switchToStocks}>Switch to Stocks</ControlButton>
                </ControlBar>


                {/*<CombosButton click={this.switchToCombos}/>*/}
                {/*<StocksButton click={this.switchToStocks}/>*/}

            </div>
        );
    }



}
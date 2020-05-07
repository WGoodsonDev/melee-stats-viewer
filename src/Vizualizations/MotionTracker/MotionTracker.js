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
            player1Character: this.characterMap[this.props.settings.players[0].characterId],
            player2Character: this.characterMap[this.props.settings.players[1].characterId],
            player1Port: this.props.settings.players[0].port,
            player2Port: this.props.settings.players[1].port,
            displayP1: true,
            displayP2: true,
            allCombos: false,
            hitBubblesVisibleOffense: true,
            hitBubblesVisibleDefense: true,
            minComboLength: 3,
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

    characterMap = {
        0 : "Cpt. Falcon",
        1 : "Donkey Kong",
        2 : "Fox",
        3  : "Mr. Game & Watch",
        4 : "Kirby",
        5 : "Bowser",
        6 : "Link",
        7  : "Luigi",
        8 : "Mario",
        9  : "Marth",
        10 : "Mewtwo",
        11: "Ness",
        12: "Peach",
        13 : "Pikachu",
        14 : "Ice Climbers (Nana)",
        15 : "Jigglypuff",
        16 : "Samus",
        17 : "Yoshi",
        18 : "Zelda",
        19: "Sheik",
        20 : "Falco",
        21 : "Young Link",
        22 : "Dr. Mario",
        23 : "Roy",
        24 : "Pichu",
        25 : "Ganondorf",
        26 : "Master Hand",
        27 : "Male Wireframe",
        28 : "Female Wireframe",
        29 : "Giga Bowser",
        30 : "Crazy Hand",
        31 : "Sandbag",
        32 : "Ice Climbers (Popo)",
    }


    switchToCombos = () => {this.setState({currentTracker: "combos"});}

    switchToStocks = () => {this.setState({currentTracker: "stocks"});}

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

    nextCombo = () => {
        console.log(this.props.stats.combos);
        let newIndex = 0;
        if(this.state.comboIndex >= this.state.comboCount - 1){
            newIndex = this.state.comboCount - 1;
        } else {
            newIndex = this.state.comboIndex + 1;
        }
        this.setState({
            comboIndex: newIndex
        }
    )}

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

    hitBubblesToggleP1 = () => {
        this.setState({
            hitBubblesVisibleOffense: !this.state.hitBubblesVisibleOffense,
        })
    }

    hitBubblesToggleP2 = () => {
        this.setState({
            hitBubblesVisibleDefense: !this.state.hitBubblesVisibleDefense,
        })
    }




    pickTracker = () => {
        const svgWidth = this.svgProportions[this.props.stageId].xDim;
        const svgHeight = this.svgProportions[this.props.stageId].yDim;
        switch (this.state.currentTracker) {
            case "combos":
                return (
                    <ComboTracker
                        stageId={this.props.stageId}
                        combos={this.props.stats.combos}
                        frameData={this.props.frameData}
                        currentCombo={this.state.comboIndex}
                        displayP1={this.state.displayP1}
                        displayP2={this.state.displayP2}
                        allCombos={this.state.allCombos}
                        hitBubblesVisibleOffense={this.state.hitBubblesVisibleOffense}
                        hitBubblesVisibleDefense={this.state.hitBubblesVisibleDefense}
                        p1Character={this.state.player1Character}
                        p2Character={this.state.player2Character}
                        svgWidth={svgWidth}
                        svgHeight={svgHeight}
                        minComboLength={this.state.minComboLength}
                    />
                );

            case "stocks":
                return (
                    <StockTracker
                        stageId={this.props.stageId}
                        stocks={this.props.stats.stocks}
                        frameData={this.props.frameData}
                        zoomTransform={this.state.zoomTransform}
                        zoomType="scale"
                        displayP1={this.state.displayP1}
                        displayP2={this.state.displayP2}
                        svgWidth={svgWidth}
                        svgHeight={svgHeight}
                    />
                );
            default:

                break;
        }
    }

    render() {
        const tracker = this.pickTracker();
        const svgWidth = this.svgProportions[this.props.stageId].xDim;
        const svgHeight = this.svgProportions[this.props.stageId].yDim;
        return (
            <div className={styles.MotionTracker}>
                <div className={styles.svgContainer}>
                    <svg width={svgWidth}
                         height={svgHeight}
                         fontWeight={"bold"}
                    >
                        {tracker}
                        {this.state.displayP1 ? <text x={20} y={25}>Port {this.state.player1Port}: {this.state.player1Character}</text> : null}
                        {this.state.displayP1 ? <text x={20} y={svgHeight - 100}>Total damage: {this.props.stats.overall[0].totalDamage.toPrecision(4)}</text> : null}
                        {this.state.displayP1 ? <text x={20} y={svgHeight - 75}>Damage per opening: {this.props.stats.overall[0].damagePerOpening.ratio.toPrecision(3)}</text> : null}
                        {this.state.displayP1 ? <text x={20} y={svgHeight - 50}>Kill count: {this.props.stats.overall[0].killCount}</text> : null}
                        {this.state.displayP1 ? <text x={20} y={svgHeight - 25}>Openings per kill: {this.props.stats.overall[0].openingsPerKill.ratio.toPrecision(3)}</text> : null}

                        {this.state.displayP2 ? <text x={svgWidth - 200} y={25}>Port {this.state.player2Port}: {this.state.player2Character}</text> : null}
                        {this.state.displayP2 ? <text x={svgWidth - 220} y={svgHeight - 100}>Total damage: {this.props.stats.overall[1].totalDamage.toPrecision(4)}</text> : null}
                        {this.state.displayP2 ? <text x={svgWidth - 220} y={svgHeight - 75}>Damage per opening: {this.props.stats.overall[1].damagePerOpening.ratio.toPrecision(3)}</text> : null}
                        {this.state.displayP2 ? <text x={svgWidth - 220} y={svgHeight - 50}>Kill count: {this.props.stats.overall[1].killCount}</text> : null}
                        {this.state.displayP2 ? <text x={svgWidth - 220} y={svgHeight - 25}>Openings per kill: {this.props.stats.overall[1].openingsPerKill.ratio.toPrecision(3)}</text> : null}


                    </svg>
                </div>
                <StageBackground stageId={this.props.stageId}/>
                <ControlBar orientation={"horizontal"}>
                    <ControlButton click={this.prevCombo}>Previous Combo</ControlButton>
                    <ControlButton click={this.nextCombo}>Next Combo</ControlButton>
                    <ControlButton click={this.allCombos}>Toggle Single Combo / All Combos</ControlButton>
                    <ControlButton click={this.hitBubblesToggleP1}>Toggle Hit Bubbles P1</ControlButton>
                    <ControlButton click={this.hitBubblesToggleP2}>Toggle Hit Bubbles P2</ControlButton>
                    <ControlButton click={this.p1PathToggle}>Toggle Player 1</ControlButton>
                    <ControlButton click={this.p2PathToggle}>Toggle Player 2</ControlButton>
                    {/*<ControlButton click={this.switchToCombos}>Switch to Combos</ControlButton>*/}
                    {/*<ControlButton click={this.switchToStocks}>Switch to Stocks</ControlButton>*/}
                </ControlBar>
            </div>
        );
    }



}
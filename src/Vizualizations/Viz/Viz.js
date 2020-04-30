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

import DebugAxes from '../DebugAxes/DebugAxes';
import StageBackground from "../StageBkgndComponent/StageBkgndComponent";

import DataPoint from '../../containers/VizContainer/DataPoint/DataPoint';

import styles from './Viz.module.css';

import playerPositions from "../../DataHandling/playerPositions.csv";


import yoshis from "../../../public/Assets/png/yoshis.png";
import fountain from "../../../public/Assets/png/fountain.png";
import stadium from "../../../public/Assets/png/stadium.png";
import battlefield from "../../../public/Assets/png/battlefield.png";
import FD from "../../../public/Assets/png/FD.png";
import dreamland from "../../../public/Assets/png/dreamland.png";

export default class Viz extends React.Component {

    state = {
        data: [],
        currentStage: 3
    }


    componentDidMount() {
        // Load data here
        d3.csv(playerPositions).then((data) => {
            console.log("Successfully loaded ", data.length.toString(), " data points");
            console.log("data: ", data)
            this.setState((state, props) => ({
                data: data,
                currentStage: this.props.stageId
            }))
        });
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

    xScale = d3.scaleLinear()
        .domain([-224, 224])
        .range([0, this.props.width])
    yScale = d3.scaleLinear()       // domain: [minimum of the minimum between player y-positions, max of the max of the same
        .domain([ -109, 200])
        .range([this.props.height, 0]);


    render() {

        // console.log(this.state.data);
        const currentData = this.state.data;
        let circles = [];
        if(currentData){
            currentData.forEach((d, idx) => {
                circles.push(<circle key={idx} r={"1"} cx={this.xScale(d.player1X)} cy={this.yScale(d.player1Y)} stroke={"black"} strokeWidth={"0.2px"}
                opacity={"0.2"}/>);
            });
        }


        return (
            <div className={styles.Viz}>
                <StageBackground width={this.props.width} height={this.props.height} stageId={this.state.currentStage || 3}/>
                <svg width={this.props.width} height={this.props.height}>
                    <DebugAxes width={this.props.width} height={this.props.height}/>
                    <g>
                        {circles}
                    </g>
                </svg>

                {<h5>{currentData[2]?.player2X}</h5>}

                {this.props.children}
            </div>
        );
    }
}
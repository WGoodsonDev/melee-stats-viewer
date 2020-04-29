/**
 Created by Warren Goodson
 */

import React from 'react';
import * as d3 from 'd3';

import styles from './VizContainer.module.css';
// import useWindowDimensions from "../../Hooks/useWindowDimensions";
// import { loadAllData } from '../../DataHandling/LoadAllData';
import playerYData from '../../DataHandling/playerYs.csv';

import DataPoint from './DataPoint/DataPoint';




export default class VizContainer extends React.Component {

    state = {
        data: []
    }

    xScale = d3.scaleLinear()
        .domain([0, 15147])
        .range([0, 1000]);
    yScale = d3.scaleLinear()
        .domain([-152, 200])
        .range([500, 0]);

    line = d3.line()
        .x(d => this.xScale(d.frameNum))
        .y(d => this.yScale(d.player1Y));

    line2 = d3.line()
        .x(d => this.xScale(d.frameNum))
        .y(d => this.yScale(d.player2Y));


    componentDidMount() {
        // Load data here
        d3.csv(playerYData).then((data) => {
            console.log("Successfully loaded ", data.length.toString(), " data points");

            console.log(data);
            this.setState({data: data})
        });
    }

    // static getDerivedStateFromProps(props, state){
    //     const newData = props;
    //     if(!newData) return;
    //     let {player1Y, player2Y, frameNum} = state;
    //
    //     const xDomain = d3.extent(data, d => d.player1Y);
    //
    //
    //
    //
    // }

    clickCheck = () => {
        console.log(this.state);
    }

    render() {
        const p1 = this.line(this.state.data);
        const p2 = this.line2(this.state.data);
        return (
            <div onClick={this.clickCheck} className={styles.VizContainer}>
                <svg width={"50%"} height={"100%"}>
                    <circle cx={"50%"}
                            cy={"50%"}
                            fill={"black"}
                            r={"2"}
                    />
                    <rect fill={"transparent"}
                          height={"100%"}
                          width={"100%"}
                          stroke={"black"}
                          strokeWidth={"2"}/>

                    <line x1={"0"} y1={"50%"}
                          x2={"100%"} y2={"50%"}
                          stroke={"black"}
                          strokeWidth={"2"}/>
                    <line x1={"50%"} y1={"0"}
                          x2={"50%"} y2={"100%"}
                          stroke={"black"}
                          strokeWidth={"2"}/>
                    <path d={p1} strokeWidth={"1"} fill={"none"} stroke={"blue"}/>
                    <path d={p2} strokeWidth={"1"} fill={"none"} stroke={"green"}/>
                </svg>
                {this.props.children}
            </div>
        );
    }
}
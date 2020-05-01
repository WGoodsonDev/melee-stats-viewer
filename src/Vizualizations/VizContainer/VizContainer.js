/**
 Created by Warren Goodson
 */

import React from 'react';

import styles from './VizContainer.module.css';

import MotionTracker from "../MotionTracker/MotionTracker";
import Heatmap from "../Heatmap/Heatmap";
import * as d3 from "d3";
import playerPositions from "../../DataHandling/playerPositions.csv";


export default class VizContainer extends React.Component {

    state = {
        currentViz: 0,
        motionTrackerData: [],
        heatmapData: [],
    }

    height = 630;
    width = 1120;


    vizPicker = (id) => {
        // console.log("vizPicker::State: ", this.state); WORKING
        switch(id){
            case 0:
                return (<MotionTracker height={this.height} width={this.width} stageId={0} data={this.state.motionTrackerData}/>);
            case 1:
                return(<Heatmap height={this.height} width={this.width} stageId={0}/>);
            default:
                return (<MotionTracker height={this.height} width={this.width} stageId={0} data={this.state.motionTrackerData}/>);
        }
    }

    componentDidMount() {
        // Load data here
        d3.csv(playerPositions).then((data) => {
            console.log("Successfully loaded ", data.length.toString(), " data points");
            console.log("data: ", data)

            this.motionTracker = (<MotionTracker height={this.height} width={this.width} stageId={0} data={this.state.motionTrackerData}/>);

            this.setState((state, props) => ({
                motionTrackerData: data,
            }))
        });
    }

    render() {
        console.log(this.vizPicker(this.state.currentViz))
        return (
            <div className={styles.VizContainer}>
                {this.state.motionTrackerData && this.vizPicker(this.state.currentViz)}
                <h1>This is a title or something</h1>
                <div>Left Button</div>
                <div>Right Button</div>
                {this.props.children}
            </div>
        );
    }
}


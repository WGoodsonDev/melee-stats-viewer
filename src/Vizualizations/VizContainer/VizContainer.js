/**
 Created by Warren Goodson
 */

import React from 'react';

import styles from './VizContainer.module.css';

import MotionTracker from "../MotionTracker/MotionTracker";
import Heatmap from "../Heatmap/Heatmap";
import * as d3 from "d3";

// DATA SOURCES
import csv from "../../DataHandling/scripts/game_files/csv/Game_20181228T005503.csv";
import stats from '../../DataHandling/scripts/stats.json';


export default class VizContainer extends React.Component {

    state = {
        currentViz: 0,
        motionTrackerData: [],
        heatmapData: [],
        statsData: []

    }

    height = 630;
    width = 1120;


    mapStageId = {
        8: 0,
        2: 1,
        3: 2,
        31: 3,
        32: 4,
        28: 5,
    }

    vizPicker(id){
        // console.log("vizPicker::State: ", this.state); WORKING
        // MotionTracker stageId:
        // this.mapStageId(this.state.motionTrackerData[1]?.stageId)
        let stage = 0;
        if(this.state.motionTrackerData.length){

            stage = this.state.motionTrackerData[54].stageId;
            // console.log(stage);
            // console.log(this.mapStageId[stage]);
            switch(id){
                case 0:
                    return (<MotionTracker height={this.height}
                                           width={this.width}
                                           stageId={this.mapStageId[stage]}
                                           frameData={this.state.motionTrackerData}
                                           stats={this.state.statsData}
                                           whichViz={"stock"}
                    />);
                case 1:
                    return(<Heatmap height={this.height} width={this.width} stageId={0}/>);
                default:
                    return null;
            }
        }

    }

    componentDidMount() {
        // Load data here
        // TODO: load stage information with position data
        d3.csv(csv).then((data) => {
            // console.log("Successfully loaded ", data.length.toString(), " positional data points");
            // console.log("positional data: ", data)

            this.setState((state, props) => ({
                motionTrackerData: data,
            }))
        });

        // Manipulate stats to store what we need
        //


        this.setState((state, props) => ({
            statsData: stats,
        }))


    }

    render() {

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


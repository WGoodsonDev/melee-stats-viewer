/**
 Created by Warren Goodson
 */

import React from 'react';

import styles from './VizContainer.module.css';

import MotionTracker from "../MotionTracker/MotionTracker";

// DATA SOURCES
import allData from '../../DataHandling/scripts/json/Game_20181114T230445.json';
import ControlBar from "../MotionTracker/ControlBar/ControlBar";
import ControlButton from '../MotionTracker/ControlButtons/ControlButtonBase/ControlButton';


export default class VizContainer extends React.Component {

    state = {
        currentViz: 0,
        settings: {},
        frames: {},
        stats: {},
        stageId: 8
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



    componentDidMount() {
        // Manipulate data to store what we need
        const {settings, frames, stats} = allData;

        const framesFiltered = Object.values(frames);
        const framesFilteredMore = framesFiltered.map(frame => {
            return {
                "frame": frame.frame,
                "player1": {
                    "Character": settings.players[0].characterId,
                    "PreActionState": frame.players[0].pre.actionStateId,
                    "PostActionState": frame.players[0].post.actionStateId,
                    "PreX": frame.players[0].pre.positionX,
                    "PreY": frame.players[0].pre.positionY,
                    "PostX": frame.players[0].post.positionX,
                    "PostY": frame.players[0].post.positionY,
                },
                "player2": {
                    "Character": settings.players[1].characterId,
                    "PreActionState": frame.players[1].pre.actionStateId,
                    "PostActionState": frame.players[1].post.actionStateId,
                    "PreX": frame.players[1].pre.positionX,
                    "PreY": frame.players[1].pre.positionY,
                    "PostX": frame.players[1].post.positionX,
                    "PostY": frame.players[1].post.positionY,
                }
            }
        })

        this.setState((state, props) => ({
            settings: settings,
            frames: framesFilteredMore,
            stats: stats,
            stageId: settings.stageId
        }))


    }

    render() {
        return (
            <div className={styles.VizContainer}>
                {this.state.frames.length &&
                <MotionTracker height={this.height}
                               width={this.width}
                               stageId={this.mapStageId[this.state.stageId]}
                               frameData={this.state.frames}
                               stats={this.state.stats}
                               settings={this.state.settings}

                />}


            </div>
        );
    }
}


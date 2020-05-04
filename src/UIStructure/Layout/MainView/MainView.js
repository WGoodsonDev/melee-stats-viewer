/*
    Created by Warren Goodson
*/
import React from 'react';

import VizContainer from "../../../Vizualizations/VizContainer/VizContainer";
import ControlBar from "../../../Vizualizations/MotionTracker/ControlBar/ControlBar";

import styles from './MainView.module.css';

const mainView = (props) => {

    return (
        <div className={styles.MainView}>
            {props.children}
            <ControlBar orientation={"horizontal"}>
                <div className={styles.buttons}></div>
                <div className={styles.buttons}></div>
                <div className={styles.buttons}></div>
                <div className={styles.buttons}></div>
                <div className={styles.buttons}></div>
                <div className={styles.buttons}></div>
                <div className={styles.buttons}></div>
                <div className={styles.buttons}></div>
            </ControlBar>
            <VizContainer/>
        </div>
    );
}

export default mainView;
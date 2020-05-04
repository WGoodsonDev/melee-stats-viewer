/**
 Created by Warren Goodson
 */

import React from 'react';

import styles from './ControlBar.module.css';

const controlBar = (props) => {

    return (
        <div className={props.orientation === "vertical" ? styles.ControlBarVert : styles.ControlBarHoriz}>
            {props.children}
        </div>
    );
}

export default controlBar;
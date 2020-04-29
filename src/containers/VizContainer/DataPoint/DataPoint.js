/*
    Created by Warren Goodson
*/
import React from 'react';

import styles from './DataPoint.module.css';

const dataPoint = (props) => {

    return (
        <div className={styles.DataPoint}>
            <circle r={"2"} stroke={"black"} color={"transparent"}/>
            {props.children}
        </div>
    );
}

export default dataPoint;
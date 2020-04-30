/*
    Created by Warren Goodson
*/
import React from 'react';

import styles from './DataPoint.module.css';

const dataPoint = (props) => {

    return (
        <g>
            <circle cx={props.x.toString()} cy={props.y.toString()} r={"0.2"} stroke={"black"} fill={"black"}/>
        </g>


    );
}

export default dataPoint;
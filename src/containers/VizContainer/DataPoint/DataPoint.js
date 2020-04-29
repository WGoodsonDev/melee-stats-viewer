/*
    Created by Warren Goodson
*/
import React from 'react';

import styles from './DataPoint.module.css';

const dataPoint = (props) => {

    return (
        <g>
            <circle cx={props.x} cy={props.y} r={"3"} stroke={"black"} fill={"black"}/>
        </g>

    );
}

export default dataPoint;
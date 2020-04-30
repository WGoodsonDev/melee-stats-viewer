/*
    Created by Warren Goodson
*/
import React from 'react';

import styles from './DebugAxes.module.css';

const debugAxes = (props) => {

    return (
                <g>
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
                </g>
    );
}

export default debugAxes;
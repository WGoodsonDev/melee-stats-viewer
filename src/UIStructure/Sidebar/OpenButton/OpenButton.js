/*
    Created by Warren Goodson
*/
import React from 'react';

import styles from './OpenButton.module.css';

const openButton = (props) => {

    return (
        <div className={styles.OpenButton}>
            <svg height={"100px"} width={"50px"}>
                <circle cx={"50%"} cy={"50px"} r={"16"} stroke={"#f5b971"} strokeWidth={"2"} fill={"none"}/>
            </svg>
            {props.children}
        </div>
    );
}

export default openButton;
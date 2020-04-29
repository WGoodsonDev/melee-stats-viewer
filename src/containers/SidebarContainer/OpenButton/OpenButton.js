/*
    Created by Warren Goodson
*/
import React from 'react';

import styles from './OpenButton.module.css';

const openButton = (props) => {

    return (
        <div className={styles.OpenButton}>
            <svg>
                <circle cx={"10"} cy={"10"} r={"8"} stroke={"black"} strokeWidth={"2"} fill={"none"}></circle>
            </svg>
            {props.children}
        </div>
    );
}

export default openButton;
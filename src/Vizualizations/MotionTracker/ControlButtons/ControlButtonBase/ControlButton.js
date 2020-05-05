/*
    Created by Warren Goodson
*/
import React from 'react';

import styles from './ControlButton.module.css';

const controlButton = (props) => {

    return (
        <div onClick={props.click} className={styles.ControlButton}>
            {props.children}
        </div>
    );
}

export default controlButton;
/*
    Created by Warren Goodson
*/
import React from 'react';

import styles from './ControlButton.module.css';

const controlButton = (props) => {

    return (
        <div className={styles.ControlButton}>
            {props.children}
        </div>
    );
}

export default controlButton;
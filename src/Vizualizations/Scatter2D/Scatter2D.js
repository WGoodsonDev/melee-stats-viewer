/*
    Created by Warren Goodson
*/
import React from 'react';

import styles from './Scatter2D.module.css';

const scatter2D = (props) => {

    return (
        <div className={styles.Scatter2D}>
            <div></div>
            {props.children}
        </div>
    );
}

export default scatter2D;
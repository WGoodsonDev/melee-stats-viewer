/*
    Created by Warren Goodson
*/
import React from 'react';

import styles from './CombosButton.module.css';

const combosButton = (props) => {

    return (
        <div onClick={props.click} className={styles.CombosButton}>
            <p>COMBOS</p>
        </div>
    );
}

export default combosButton;
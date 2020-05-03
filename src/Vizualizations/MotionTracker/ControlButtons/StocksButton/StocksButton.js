/*
    Created by Warren Goodson
*/
import React from 'react';

import styles from './StocksButton.module.css';

const stocksButton = (props) => {

    return (
        <div onClick={props.click} className={styles.StocksButton}>
            <p>
                STOCKS
            </p>
        </div>
    );
}

export default stocksButton;
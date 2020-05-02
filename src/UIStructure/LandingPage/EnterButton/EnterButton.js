/*
    Created by Warren Goodson
*/
import React from 'react';

import {Link} from "react-router-dom";

import styles from './EnterButton.module.css';

const enterButton = (props) => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.EnterButton}>
                <Link to={"/visualizations"} style={{textDecoration: 'inherit',
                                                    color: 'inherit'}}>ENTER</Link>
            </div>

            {props.children}
        </div>
    );
}

export default enterButton;
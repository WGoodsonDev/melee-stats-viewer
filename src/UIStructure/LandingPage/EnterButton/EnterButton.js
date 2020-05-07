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
                <Link to={"/combo-tracker"}
                      style={{textDecoration: 'inherit',
                                color: 'inherit',
                                width: '100%',
                                height: '100%',
                                display: 'block',
                                position: 'relative',
                                left: 0,
                                top: 0,
                      }
                      }>ENTER</Link>
            </div>

            {props.children}
        </div>
    );
}

export default enterButton;
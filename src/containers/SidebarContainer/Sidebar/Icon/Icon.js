/*
    Created by Warren Goodson
*/
import React from 'react';
import * as d3 from 'd3';

import styles from './Icon.module.css';



const icon = (props) => {

    return (
        <div className={styles.Icon}>
            <img src={""} alt={"Icon"}/>
            {props.children}
        </div>
    );
}

export default icon;
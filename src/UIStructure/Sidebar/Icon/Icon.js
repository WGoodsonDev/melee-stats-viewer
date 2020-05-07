/*
    Created by Warren Goodson
*/
import React from 'react';
import * as d3 from 'd3';

import picture from '../../../Assets/personal_pic/WarrenG.jpg';

import styles from './Icon.module.css';



const icon = (props) => {

    return (
        <div className={styles.Icon}>
            <img src={picture} alt={"Icon"} width={"250px"}/>
            <h3>Warren Goodson</h3>
            <h5>Web Developer, Musician, Melee Marth</h5>

            {props.children}
        </div>
    );
}

export default icon;
/*
    Created by Warren Goodson
*/
import React from 'react';
import * as d3 from 'd3';

import picture from '../../../Assets/personal_pic/WarrenG.jpg';

import styles from './Icon.module.css';

const line1 = "Warren Goodson";
const line2 = "Known in the Melee world as\nBud McChud";
const line3 = "Web Developer, Musician, Melee Marth";

const icon = (props) => {

    return (
        <div className={styles.Icon}>
            <img src={picture} alt={"Icon"} width={"250px"}/>
            <h3>{line1}</h3>
            <h4>{line2}</h4>
            <h5>{line3}</h5>

            {props.children}
        </div>
    );
}

export default icon;
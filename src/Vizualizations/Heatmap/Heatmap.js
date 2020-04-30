/*
    Created by Warren Goodson
*/
import React from 'react';
import * as d3 from 'd3';

import styles from './Heatmap.module.css';

/*
Props:
    width
    height
    heatmap box size
    data = [{xPos, yPos}, ...]
 */
const heatmap = (props) => {

    // let grid = [];
    // props.data.forEach((d) => {
    //     grid[d.xPos + (props.width * d.yPos)] = 1 + grid[d.xPos + (props.width * d.yPos)];
    // });


    return (
        <div className={styles.Heatmap}>
            {props.children}
        </div>
    );
}

export default heatmap;
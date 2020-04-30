/**
 Created by Warren Goodson
 */

import React from 'react';
import * as d3 from 'd3';

import styles from './VizContainer.module.css';
// import useWindowDimensions from "../../Hooks/useWindowDimensions";
// import { loadAllData } from '../../DataHandling/LoadAllData';


import Viz from "../../Vizualizations/Viz/Viz";

import StageComponent from '../../Vizualizations/StageBkgndComponent/StageBkgndComponent';




export default class VizContainer extends React.Component {

    height = 450;
    width = 800;

    render() {

        return (
            <div className={styles.VizContainer}>
                <Viz height={this.height} width={this.width} vizId={0} stageId={3}/>
                <h1>This is a title or something</h1>
                {this.props.children}
            </div>
        );
    }
}


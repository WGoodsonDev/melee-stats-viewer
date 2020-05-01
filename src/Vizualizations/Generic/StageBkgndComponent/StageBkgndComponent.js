/*
    Created by Warren Goodson
*/
import React from 'react';
import * as d3 from 'd3';

import styles from './StageBkgndComponent.module.css';

// import {ReactComponent as StageSVG} from '../../Assets/stages/svg/battlefield.svg';
import battlefield from '../../../Assets/stages/png/battlefield.png';
import dreamland from '../../../Assets/stages/png/dreamland.png';
import FD from '../../../Assets/stages/png/FD.png';
import fountain from '../../../Assets/stages/png/fountain.png';
import stadium from '../../../Assets/stages/png/stadium.png';
import yoshis from '../../../Assets/stages/png/yoshis.png';

// Props: stageID [number]
//          0: Yoshi's Story
//          1: Fountain of Dreams
//          2: Pokemon Stadium
//          3: Battlefield
//          4: Final Destination
//          5: Dreamland
//      height
//      width

const stageSelect = {
    0: yoshis,
    1: fountain,
    2: stadium,
    3: battlefield,
    4: FD,
    5: dreamland
}

const stageSelectString = {
    0: "Yoshi's Story",
    1: "Fountain of Dreams",
    2: "Pokemon Stadium",
    3: "Battlefield",
    4: "Final Destination",
    5: "Dreamland"
}

const stageDimensions = {
    0: {
        xMin: -175.7,
        xMax: 173.6,
        yMin: -91,
        yMax: 168
    },
    1: {
        xMin: -198.75,
        xMax: 198.75,
        yMin: -146.25,
        yMax: 202.5
    },
    2: {
        xMin: -230,
        xMax: 230,
        yMin: -111,
        yMax: 180
    },
    3: {
        xMin: -224,
        xMax: 224,
        yMin: -108.8,
        yMax: 200
    },
    4: {
        xMin: -246,
        xMax: 246,
        yMin: -140,
        yMax: 188
    },
    5: {
        xMin: -255,
        xMax: 255,
        yMin: -123,
        yMax: 250
    }
}

const pngDimensions = {
    0: {
        x: 3593,
        y: 2690
    }
}

const backgroundTransform = {
    0: `(0, -125px)`,
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
}

const backgroundScale = (stageId) => {

}


const stageBkgndComponent = (props) => {
    const { xMin, xMax, yMin, yMax } = stageDimensions[props.stageId];
    const backgroundHeightPct = ((yMax - yMin) / props.height) * 100;

    return (
        <div className={styles.StageBkgndComponent}>
            <img
                 src={yoshis} alt={`${stageSelectString[props.stageId]}`}/>
            {props.children}
        </div>
    );
}

export default stageBkgndComponent;
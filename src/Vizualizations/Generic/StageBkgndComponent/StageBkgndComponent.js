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




const stageBkgndComponent = (props) => {
    return (
        <div className={styles.StageBkgndComponent}>
            <img
                 src={stageSelect[props.stageId]} alt={`${stageSelectString[props.stageId]}`}/>
            {props.children}
        </div>
    );
}

export default stageBkgndComponent;
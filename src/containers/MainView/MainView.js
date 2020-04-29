/*
    Created by Warren Goodson
*/
import React from 'react';

import VizContainer from "../VizContainer/VizContainer";

import styles from './MainView.module.css';

const mainView = (props) => {

    return (
        <div className={props.sidebarVisible ? styles.MainViewSideBarOpen : styles.MainView}>
            {props.children}
            <VizContainer></VizContainer>
        </div>
    );
}

export default mainView;
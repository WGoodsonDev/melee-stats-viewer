/*
    Created by Warren Goodson
*/
import React from 'react';

import SidebarToggle from '../SidebarContainer/SidebarToggle/SidebarToggle';

import styles from './MainView.module.css';

const mainView = (props) => {

    return (
        <div className={props.sidebarVisible ? styles.MainViewSideBarOpen : styles.MainView}>
            {props.children}
        </div>
    );
}

export default mainView;
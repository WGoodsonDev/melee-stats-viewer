/*
    Created by Warren Goodson
*/
import React from 'react';

import styles from './SidebarToggle.module.css';

const sidebarToggle = (props) => {

    return (
        <div className={styles.SideBarToggle}>
            {props.children}
        </div>
    );
}

export default sidebarToggle;
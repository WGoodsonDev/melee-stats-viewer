/*
    Created by Warren Goodson
*/
import React from 'react';

import styles from './NavItem.module.css';

const navItem = (props) => {

    return (
        <div className={styles.NavItem}>
            <a href={"/#"}>{props.text}</a>
        </div>
    );
}

export default navItem;
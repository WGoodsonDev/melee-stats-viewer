/*
    Created by Warren Goodson
*/
import React from 'react';

import styles from './NavItemGroup.module.css';
import NavItem from './NavItem/NavItem'

const navItemGroup = (props) => {

    const navItems = ["LinkedIn", "GitHub", "Other", "Other other"];

    return (
        <div className={styles.NavItemGroup}>
            {navItems.map( (n, idx)=> {
                return (
                    <NavItem text={navItems[idx]} key={idx}/>
                );
            })}
            {props.children}
        </div>
    );
}

export default navItemGroup;
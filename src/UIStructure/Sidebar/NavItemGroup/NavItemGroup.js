/*
    Created by Warren Goodson
*/
import React from 'react';

import styles from './NavItemGroup.module.css';
import NavItem from '../NavItem/NavItem'

const navItemGroup = (props) => {

    const navItems = ["LinkedIn", "GitHub", "Home", "Other"];
    const urls = ["https://www.linkedin.com/in/warren-goodson-ba84b2184/", "https://github.com/whgoodson"];

    return (
        <div className={styles.NavItemGroup}>
            {navItems.map( (n, idx)=> {
                return (
                    <NavItem text={navItems[idx]} url={urls[idx]} openInNewTab={true} key={idx}/>
                );
            })}

            {props.children}
        </div>
    );
}

export default navItemGroup;
/*
    Created by Warren Goodson
*/
import React from 'react';

import styles from './Sidebar.module.css';

import NavItemGroup from './NavItemGroup/NavItemGroup';
import CloseButton from './CloseButton/CloseButton';
import Icon from './Icon/Icon';





const Sidebar = (props) => {

    return (
        <div className={props.isVisible ? styles.Sidebar : styles.SidebarHidden}>
            <CloseButton closeSidebar={props.closeSidebar}>
            </CloseButton>

            <Icon/>
            <NavItemGroup></NavItemGroup>


            {/*<NavItemGroup>*/}
            {/*</NavItemGroup>*/}
            {props.children}
        </div>
    );
}

export default Sidebar;
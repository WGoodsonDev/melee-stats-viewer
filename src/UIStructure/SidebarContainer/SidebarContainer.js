/*
    Created by Warren Goodson
*/
import React from 'react';

import styles from './SidebarContainer.module.css';

import Sidebar from "../Sidebar/Sidebar";
import SidebarToggle from '../SidebarToggle/SidebarToggle';



export default class SidebarContainer extends React.Component{

    state = {
        isSideBarVisible: true
    }

    closeSideBar = () => {
        this.setState((state, props) => ({
            isSideBarVisible: false
        }));
    }
    openSideBar = () => {
        this.setState((state, props) => ({
            isSideBarVisible: true
        }));
    }


    render() {
        return (
            <div className={styles.SidebarContainer}>
                <Sidebar/>
                {this.props.children}
            </div>
        );
    }

}
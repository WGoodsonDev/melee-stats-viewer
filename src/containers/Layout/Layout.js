/*
    Created by Warren Goodson
*/
import React from 'react';
import styles from './Layout.module.css';

import Sidebar from "../SidebarContainer/Sidebar/Sidebar";
import OpenButton from  '../SidebarContainer/OpenButton/OpenButton';
import MainView from "../MainView/MainView";

export default class Layout extends React.Component {

    state = {
        sidebarIsVisible: false
    }

    openSidebar = () => {
        this.setState( (state, props) => ({
            sidebarIsVisible: true
        }));
        console.log("Sidebar opening...");
    }

    closeSidebar = () => {
        this.setState( (state, props) => ({
            sidebarIsVisible: false
        }));
        console.log("Sidebar opening...");
    }

    render() {
        return (
            <div className={styles.Layout}>


                <div onClick={this.openSidebar}
                     className={styles.OpenButton}>
                    <OpenButton/>
                </div>

                <Sidebar
                    isVisible={this.state.sidebarIsVisible}
                    closeSidebar={this.closeSidebar}
                >

                </Sidebar>


                <MainView sidebarVisible={this.state.sidebarIsVisible}>
                    <p>
                        MORE TEST
                    </p>
                    {this.props.children}
                </MainView>
            </div>

        );
    }

}

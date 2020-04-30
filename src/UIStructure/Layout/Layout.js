/*
    Created by Warren Goodson
*/
import React from 'react';
import styles from './Layout.module.css';

import Sidebar from "../Sidebar/Sidebar";
import OpenButton from '../Sidebar/OpenButton/OpenButton';
import MainView from "./MainView/MainView";

export default class Layout extends React.Component {

    state = {
        sidebarIsVisible: false
    }

    openSidebar = () => {
        this.setState((state, props) => ({
            sidebarIsVisible: true
        }));
    }

    closeSidebar = () => {
        this.setState((state, props) => ({
            sidebarIsVisible: false
        }));
    }

    render() {
        return (
            <div className={styles.Layout}>


                <div onClick={this.openSidebar} className={styles.OpenButton}>
                    <OpenButton/>
                </div>

                <Sidebar isVisible={this.state.sidebarIsVisible} closeSidebar={this.closeSidebar}/>

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
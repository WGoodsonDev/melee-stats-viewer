/**
 Created by Warren Goodson
 */

import React from 'react';

import styles from './VizContainer.module.css';

export default class VizContainer extends React.Component {

    state = {
        data: [],
    }

    componentDidMount() {
        /* tick timer setup
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
        */
    }

    componentWillUnmount() {
        // Tear down the timer
        // clearInterval(this.timerID);
    }

    tick() {
        this.setState({});
    }

    static getDerivedStateFromProps(props, state) {

    }


    render() {
        return (
            <div className={styles.VizContainer}>
                <svg width={"100%"} height={"100%"}>
                    <rect width="100" height="100" rx="15" fill={"black"}/>

                </svg>
                {this.props.children}
            </div>
        );
    }
}
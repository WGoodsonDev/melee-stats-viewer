/**
 Created by Warren Goodson
 */

import React from 'react';

import styles from './VizContainer.module.css';
import useWindowDimensions from "../../Hooks/useWindowDimensions";

export default class VizContainer extends React.Component {

    state = {
        data: [],
    }

    componentDidMount() {
        // Load data here
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
                <svg width={"50%"} height={"100%"}>
                    <circle cx={"50%"}
                            cy={"50%"}
                            fill={"black"}
                            r={"2"}
                    />
                    <rect fill={"transparent"}
                          height={"100%"}
                          width={"100%"}
                          stroke={"black"}
                          strokeWidth={"2"}/>

                    <line x1={"0"} y1={"50%"}
                          x2={"100%"} y2={"50%"}
                          stroke={"black"}
                          strokeWidth={"2"}/>
                    <line x1={"50%"} y1={"0"}
                          x2={"50%"} y2={"100%"}
                          stroke={"black"}
                          strokeWidth={"2"}/>


                </svg>
                {this.props.children}
            </div>
        );
    }
}
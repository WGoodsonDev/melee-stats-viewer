/*
    Created by Warren Goodson
*/
import React from 'react';


export default class MotionTrackerStock extends React.Component{

    state = {
        strokeWidth: "3"
    };

    highlight = () => {
        this.setState({strokeWidth: "5"});
    }

    unhighlight = () => {
        this.setState({strokeWidth: "3"});
    }

    render() {
        return (
            <path onMouseOver={this.highlight}
                  onMouseOut={this.unhighlight}
                  d={this.props.d}
                  strokeLinecap={"round"}
                  strokeLinejoin={"round"}
                  strokeWidth={this.state.strokeWidth}
                  stroke={this.props.color}
                  fill={"none"}/>
        );
    }

    // strokeDasharray="4,4"
}
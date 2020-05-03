/*
    Created by Warren Goodson
*/
import React from 'react';


export default class MotionTrackerStock extends React.Component{

    state = {
        strokeWidth: "1.2"
    };

    highlight = () => {
        this.setState({strokeWidth: "4"});
        console.log("mouse over");
    }

    unhighlight = () => {
        this.setState({strokeWidth: "1.2"});
        console.log("mouse left");
    }

    render() {
        return (
            <path onMouseOver={this.highlight}
                  onMouseOut={this.unhighlight}
                  d={this.props.d}
                  strokeDasharray="2,2"
                  strokeWidth={this.state.strokeWidth}
                  stroke={this.props.color}
                  fill={"none"}/>
        );
    }


}
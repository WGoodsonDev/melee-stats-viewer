/*
    Created by Warren Goodson
*/
import React from 'react';
import ComboHit from "./ComboHit/ComboHit";

export default class MotionTrackerPath extends React.Component{
    constructor(props) {
        super(props);
        this.onMouseMove = this.onMouseMove.bind(this);
    }
    state = {
        strokeWidth: "3",
        tooltipOpen: false,
        mouseX: 0,
        mouseY: 0
    };

    highlight = () => {
        this.setState({
            strokeWidth: "5",
            tooltipOpen: true
        });
    }

    unhighlight = () => {
        this.setState({
            strokeWidth: "3",
            tooltipOpen: false
        });
    }

    onMouseMove = (e) => {
        this.setState({
            mouseX: e.nativeEvent.offsetX,
            mouseY: e.nativeEvent.offsetY
        })
    }

    generateComboHits = () =>{
        return this.props.comboHits.map((hit, idx)=> {
            console.log(hit);
            return (
                <ComboHit hit={hit} color={this.props.color} key={idx}/>
                );
        })
    }

    render() {
        const comboHits = this.generateComboHits();
        return (
            <g>
                <path onMouseOver={this.highlight}
                      onMouseOut={this.unhighlight}
                      d={this.props.d}
                      strokeLinecap={"round"}
                      strokeLinejoin={"round"}
                      strokeWidth={this.state.strokeWidth}
                      stroke={this.props.color}
                      fill={"none"}
                      opacity={"0.5"}
                />
                {comboHits}
                <foreignObject x={10} y={10} width={120} height={120}>
                    {this.state.tooltipOpen ?
                        <div className={"tooltip"}>
                            <h5>Player in port: {this.props.playerIdx}</h5>
                            <h5>Combo length: {this.props.comboLength}</h5>
                        </div> : null
                    }

                </foreignObject>
            </g>
        );
    }

    // strokeDasharray="4,4"
}
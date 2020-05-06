/*
    Created by Warren Goodson
*/
import React from 'react';
import ComboHit from "./ComboHit/ComboHit";

export default class ComboTrackerPath extends React.Component{
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



    generateComboText = () => {
        if(this.props.comboHits){
            return this.props.comboHits.map((hit, idx) => {
                return(
                    <text x={640} y={40 * (idx + 1)}>{idx + 1}: {hit.move}: {hit.damage}%</text>
                );
            })
        } else if (this.props.hitsTaken){
            return this.props.hitsTaken.map((hit, idx) => {
                return null;
                    // <text x={640} y={40 * (idx + 1)}>{idx + 1}: {hit.move}: {hit.damage}%</text>

            })
        }

    }

    render() {

        return (
            <g width={"inherit"}>
                <path onMouseOver={this.highlight}
                      onMouseOut={this.unhighlight}
                      d={this.props.d}
                      strokeLinecap={"round"}
                      strokeLinejoin={"round"}
                      strokeWidth={this.state.strokeWidth}
                      stroke={this.props.color}
                      fill={"none"}
                      opacity={"0.7"}
                      filter={"drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))"}
                />
                <foreignObject x={400} y={15} width={160} height={120}>
                    {this.state.tooltipOpen ?
                        <div className={"tooltip"}>
                            <p>Combo length: {this.props.comboLength}</p>
                            <p>{this.props.didKill?` Combo did kill`:`Combo did not kill`}</p>
                        </div> : null
                    }

                </foreignObject>

            </g>
        );
    }

    // strokeDasharray="4,4"
}
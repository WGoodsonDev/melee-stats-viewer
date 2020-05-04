/**
 Created by Warren Goodson
 */

import React from 'react';


export default class ComboHit extends React.Component {
    state = {
        r: 15,
    }

    highlight = () => {
        this.setState({
            r: 20
        });
    }

    unhighlight = () => {
        this.setState({
            r: 15
        });
    }

    render() {
        return (
            <g>
                <circle cx={this.props.hit.x} cy={this.props.hit.y}
                        r={this.state.r.toString()}
                        strokeWidth={"5"}
                        stroke={"transparent"}
                        fill={this.props.color}
                        opacity={"0.5"}
                        onMouseOver={this.highlight}
                        onMouseLeave={this.unhighlight}
                >
                </circle>
                <text x={this.props.hit.x} y={this.props.hit.y + 5} fontSize={"smaller"} textAnchor={"middle"}>{this.props.hitNo}</text>
            </g>




        );
    }
}
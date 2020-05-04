/**
 Created by Warren Goodson
 */

import React from 'react';


export default class ComboHit extends React.Component {
    state = {
        r: 10,
    }

    highlight = () => {
        this.setState({
            r: 16
        });
    }

    unhighlight = () => {
        this.setState({
            r: 10
        });
    }

    render() {
        return (
            <g>
                <circle cx={this.props.hit.x} cy={this.props.hit.y}
                        r={this.state.r.toString()}
                        strokeWidth={"2"}
                        stroke={this.props.color}
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
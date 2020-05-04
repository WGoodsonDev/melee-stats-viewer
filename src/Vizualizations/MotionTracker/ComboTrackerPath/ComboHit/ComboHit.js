/**
 Created by Warren Goodson
 */

import React from 'react';


export default class ComboHit extends React.Component {
    state = {
        r: 15,
        tooltipOpen: false
    }

    highlight = () => {
        this.setState({
            r: 20,
            tooltipOpen: true
        });
    }

    unhighlight = () => {
        this.setState({
            r: 15,
            tooltipOpen: false
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
                <foreignObject x={10} y={10} width={160} height={120}>
                    {this.state.tooltipOpen ?
                        <div className={"tooltip"}>
                            <p>{this.props.hit.move}</p>
                        </div> : null
                    }

                </foreignObject>
            </g>




        );
    }
}
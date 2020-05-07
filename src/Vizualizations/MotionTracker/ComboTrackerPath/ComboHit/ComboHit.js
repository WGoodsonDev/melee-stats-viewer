/**
 Created by Warren Goodson
 */

import React from 'react';
import * as ReactDOM from 'react-dom';
import * as d3 from 'd3';
import {Tooltip} from "react-svg-tooltip";

export default class ComboHit extends React.Component {
    state = {
        r: 15,
        tooltipOpen: false
    }
    radiusScaleFactor = 1.2;

    circleRef = React.createRef();

    highlight = () => {
        this.setState({
            r: (this.state.r * this.radiusScaleFactor),
            tooltipOpen: true
        });
    }

    unhighlight = () => {
        this.setState({
            r: (this.state.r / this.radiusScaleFactor),
            tooltipOpen: false
        });
    }

    radiusScale = d3.scaleLinear()
        .domain([0, 20])
        .range([6,20])

    componentDidMount() {
        this.setState({
            r: this.radiusScale(this.props.hit.damage),
        })
    }

    render() {

        return (
            <g>
                <text x={this.props.hit.x} y={this.props.hit.y + 5} fontSize={"smaller"} textAnchor={"middle"}>{this.props.hitNo}</text>
                <circle ref={this.circleRef} cx={this.props.hit.x} cy={this.props.hit.y}
                        r={this.state.r}
                        strokeWidth={"5"}
                        stroke={"transparent"}
                        fill={this.props.color}
                        opacity={"0.5"}
                        onMouseOver={this.highlight}
                        onMouseLeave={this.unhighlight}
                >
                </circle>
                <Tooltip triggerRef={this.circleRef}>
                    <rect x={10} y={-5}  height={100} rx={5} ry={5} stroke={'black'} fill={this.props.color}/>
                    <text x={10} y={20} fontSize={24} stroke={'black'} fill={'white'}>{this.props.hit.character}</text>
                    <text x={10} y={42} fontSize={24} stroke={'black'} fill={'white'}>{this.props.hit.move}</text>
                    <text x={10} y={64} fontSize={24} stroke={'black'} fill={'white'}>{this.props.hit.damage}%</text>
                </Tooltip>

                {/*<foreignObject x={this.props.textX} y={420} width={160} height={120}>*/}
                {/*    {this.state.tooltipOpen ?*/}
                {/*        <div className={"tooltip"}>*/}
                {/*            <p>{this.props.hit.move}</p>*/}
                {/*        </div> : null*/}
                {/*    }*/}

                {/*</foreignObject>*/}
            </g>




        );
    }
}
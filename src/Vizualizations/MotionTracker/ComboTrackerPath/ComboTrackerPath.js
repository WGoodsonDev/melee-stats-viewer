/*
    Created by Warren Goodson
*/
import React from 'react';

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
        let currentPercent = this.props.startPercent;
        let totalDamage = 0;
        let comboText = [];
        if(this.props.comboHits){
            comboText.push(<text key={100} x={this.props.textX} y={60}>{this.props.didKill ? "Combo did kill" : "Combo did not kill"}</text>)
            comboText.push(<text key={101} x={this.props.textX} y={95}>Enemy % at start: {this.props.startPercent.toPrecision(3)}%</text>)
            this.props.comboHits.forEach((hit, idx) => {
                currentPercent += +hit.damage;
                totalDamage += +hit.damage;
                comboText.push(
                    <text key={idx} x={this.props.textX} y={100 + (35 * (idx + 1))}>{idx + 1}: {hit.move}: {hit.damage}% -> {currentPercent.toPrecision(3)}%</text>
                );
            })
            comboText.push(
                <text key={comboText.length + 1} x={this.props.textX} y={100 + (35 * (comboText.length ))}>Total Damage: {totalDamage.toPrecision(3)}%</text>
            );
        }
        return comboText;
    }

    render() {
        const comboText = this.generateComboText();

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
                      opacity={"0.7"}
                      filter={"drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))"}
                />
                <foreignObject x={400} y={15} width={160} height={120}>
                    {this.state.tooltipOpen ?
                        <div className={"tooltip"}>
                            <p></p>
                        </div> : null
                    }

                </foreignObject>
                {this.props.allCombos ? null : comboText}

            </g>
        );
    }

    // strokeDasharray="4,4"
}
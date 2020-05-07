/*
    Created by Warren Goodson
*/
import React from 'react';

import styles from './StockTracker.module.css';
import StockTrackerPath from "../StockTrackerPath/StockTrackerPath";
import * as d3 from "d3";


const stockTracker = (props) => {

    const stageDimensions = {
        0: {
            xMin: -175.7,
            xMax: 173.6,
            yMin: -91,
            yMax: 168
        },
        1: {
            xMin: -198.75,
            xMax: 198.75,
            yMin: -146.25,
            yMax: 202.5
        },
        2: {
            xMin: -230,
            xMax: 230,
            yMin: -111,
            yMax: 180
        },
        3: {
            xMin: -224,
            xMax: 224,
            yMin: -108.8,
            yMax: 200
        },
        4: {
            xMin: -246,
            xMax: 246,
            yMin: -140,
            yMax: 188
        },
        5: {
            xMin: -255,
            xMax: 255,
            yMin: -123,
            yMax: 250
        }
    }

    const svgProportions = {
        0: {
            xDim: 857.04,
            yDim: 636
        },
        1: {
            xDim: 731.35,
            yDim: 642
        },
        2: {
            xDim: 1013.67,
            yDim: 642
        },
        3: {
            xDim: 930.48,
            yDim: 642
        },
        4: {
            xDim: 966.94,
            yDim: 642
        },
        5: {
            xDim: 877.06,
            yDim: 642
        }
    }

    const xScale = d3.scaleLinear()
        .domain([[stageDimensions[props.stageId].xMin], [stageDimensions[props.stageId].xMax]])
        .range([0, svgProportions[props.stageId].xDim]) // instead of props.width, use width of background image
    const yScale = d3.scaleLinear()
        .domain([[stageDimensions[props.stageId].yMin], [stageDimensions[props.stageId].yMax]])
        .range([[svgProportions[props.stageId].yDim], 0]); // height is the same, based on styling

    const p1ColorScale = d3.scaleLinear()
        .domain([0, 4])
        .range(["blue", "steelblue"])

    const p2ColorScale = d3.scaleLinear()
        .domain([0, 4])
        .range(["red", "orange"])

    const p1Line = d3.line()
        .x(d => xScale(d.player1X))
        .y(d => yScale(d.player1Y));

    const p2Line = d3.line()
        .x(d => xScale(d.player2X))
        .y(d => yScale(d.player2Y));

    const makeStockPaths = () => {
        const stockArray = props.stocks.map(stock => {
            if (stock.startFrame < 0) {
                stock.startFrame = 0;
                return stock;
            }
            return stock;
        });

        const p1Index = stockArray[0].playerIndex;

        let p1StockPaths = [];
        let p2StockPaths = [];

        const positionData = props.frameData.map(frame => {
            return {
                "player1X": frame.player1.PreX,
                "player1Y": frame.player1.PreY,
                "player2X": frame.player2.PreX,
                "player2Y": frame.player2.PreY,
            }
        })

        stockArray.forEach((stock, idx) => {
            const stockSlice = positionData.slice(stock.startFrame, stock.endFrame);
            if (stock.playerIndex === p1Index) {
                p1StockPaths.push(<StockTrackerPath stockData={stock} key={idx} d={p1Line(stockSlice)} color={p1ColorScale(idx)} textX={(props.svgWidth / 2) - 80 }/>);
            } else {
                p2StockPaths.push(<StockTrackerPath stockData={stock} key={idx} d={p2Line(stockSlice)} color={p2ColorScale(idx)} textX={(props.svgWidth / 2) - 80 }/>);
            }
        });
        return {p1StockPaths, p2StockPaths};
    }

        const {p1StockPaths, p2StockPaths} = makeStockPaths();

    return (
        <g>
            {props.displayP1 ? p1StockPaths : null}
            {props.displayP2 ? p2StockPaths : null}
        </g>

    );
}

export default stockTracker;
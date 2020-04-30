import * as d3 from 'd3';
import _ from 'lodash';

const cleanPlayerYs = (d) => {
    return {
        player1Y: +d.player1Y,
        player2Y: +d.player2Y,
        frameNum: +d.frameNum
    }
}
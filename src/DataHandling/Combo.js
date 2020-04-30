const convertComboToStrings = require('./convertComboToStrings');

/**
 *  Wrapper class for built-in SlippiGame ComboType
 */
class Combo {
    constructor(comboObj) {
        this.player = comboObj.playerIndex;
        this.startFrame = comboObj.startFrame;
        this.endFrame = comboObj.endFrame;
        this.totalFrames = comboObj.endFrame - comboObj.startFrame;
        this.startPercent = comboObj.startPercent;
        this.currentPercent = comboObj.currentPercent;
        this.endPercent = comboObj.endPercent;
        this.totalDamage = comboObj.endPercent - comboObj.startPercent;
        this.comboString = convertComboToStrings(comboObj.moves);
        this.didKill = comboObj.didKill;
    }

}

module.exports = Combo;
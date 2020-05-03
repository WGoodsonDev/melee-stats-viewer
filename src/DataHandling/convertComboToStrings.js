const AttackTable = require('./AttackTable');

/**
 * Convert array of attack numbers into their corresponding attack names
 * @param {Array} combo - An array of attack numbers to be converted into corresponding attack names
 * @returns {Array} convertedCombo - An array of attack name strings representing the full combo
 */
function convertComboToStrings(combo) {
    let convertedCombo = [];
    combo.forEach((c) => {
        convertedCombo.push(AttackTable[c.moveId])
    })
    return convertedCombo;
}

module.exports = convertComboToStrings;
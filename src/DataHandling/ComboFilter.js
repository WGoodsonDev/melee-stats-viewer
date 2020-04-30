const {default: SlippiGame} = require('slp-parser-js');
const util = require('util');
const Combo = require('./Combo');

/*
    DESIGN GOALS:
        No filter functions step on the toes of any other
            As a result, order of execution of filters should not matter

 */

/**
 * Master filter function. Calls specified filtering functions and returns completed array.
 * All helper filter functions take array of Combo objects, so they must be built in filterCombos()
 * @param {Object} stats - SlippiGame stats object
 * @param {Object} options - JS object specifying which filters to apply
 *      options - {bool: didKill, number: minLength, string[]: includedAttacks}
 * @returns {Array} filteredCombos - Array of all Combos, filtered based on options
 */
function filterCombos(stats, options) {
    // Build array of Combo objects from stats
    let comboArray = stats?.combos?.map((combo) => {
        return new Combo(combo);
    });
    if(options.didKill){
        comboArray = filterCombosDidKill(comboArray);
    }
    if(options.minLength > 0){
        comboArray = filterCombosMinLength(comboArray, options.minLength);
    }
    if(options.includedAttacks.length){
        comboArray = filterCombosIncludedAttacks(comboArray, options.includedAttacks);
    }

    return comboArray;
}

/**
 * Given a stats object, constructs and returns all Combos that led to death.
 * @param {Combo []} comboArr - SlippiGame Stats object to be filtered
 * @returns {Array} filteredCombos - Array of all Combos that did kill the opponent
 */
function filterCombosDidKill(comboArr){
    return comboArr.filter((combo) => {
        return combo.didKill;
    });
}

/**
 * Given a stats object, constructs and returns all combos that led to death and were at least a minimum length
 * @param {Combo []} comboArr - SlippiGame Stats object to be filtered
 * @param {number} minLength - Minimum length of viable combo
 * @returns {Array} filteredCombos - Array of all Combos whose length is greater than or equal to minLength
 */
function filterCombosMinLength(comboArr, minLength){
    return comboArr.filter((combo) => {
       return combo.comboString.length >= minLength;
    });
}

/**
 * Given a stats object, constructs and returns all combos that led to death and were at least a minimum length
 * @param {Combo []} comboArr - SlippiGame Stats object to be filtered
 * @param {string []} includedAttacks - List of attacks to filter by
 * @returns {Array} filteredCombos - Array of all Combos that did kill the opponent and were
 */
function filterCombosIncludedAttacks(comboArr, includedAttacks){
    let checker = (arr, target) => target.every(v => arr.includes(v));
    return comboArr.filter((combo) => {
        // return combo element iff its comboString includes all attacks in includedAttacks
        return checker(combo.comboString, includedAttacks);
    });
}



module.exports = {
    filterCombos
}

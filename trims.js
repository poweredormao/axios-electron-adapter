/**
 * Left trim string with symbol
 * @param str string
 * @param symbol string
 * @returns string
 */
function StringLTrim(str, symbol){
    while(str.startsWith(symbol)) str = str.substr(1);
    return str
}

/**
 * Right trim string with symbol
 * @param str
 * @param symbol
 * @returns string
 */
function StringRTrim(str, symbol){
    while(str.endsWith(symbol)) str = str.substr(0, str.length - 1);
    return str
}

module.exports = {StringLTrim, StringRTrim};

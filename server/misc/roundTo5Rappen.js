function roundTo5Rappen(balance) {
    var m = Number((Math.abs(balance) * 100).toPrecision(15));
    let twoDecimals = Math.round(m) / 100 * Math.sign(balance);
    
    let rappen = twoDecimals * 100;
    let roundedRappenTo5 = Math.round(rappen/5)*5;
    return roundedRappenTo5 / 100;
}

module.exports = roundTo5Rappen;
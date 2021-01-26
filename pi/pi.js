// Calculating up to 15 decimal places as of the latest update
const bigDecimal = require("js-big-decimal")


class PiToTheNthDigit {
    constructor() {
        this.C = 640320;
    };
    factorial(n){
        if (n===0 || n===1){
            return 1;
        };
        return n*this.factorial(n-1);
    };
    calc(n){  //utilizing js-big-decimal module
        var pi = new bigDecimal(0);
        for (var k=0; k < n; k++) {
            var numerator = new bigDecimal(((-1)**k)*this.factorial(6*k)*(13591409 + 545140134*k));
            var denominator = new bigDecimal(this.factorial(3*k)*(this.factorial(k)**k)*(this.C**(3*k)));
            var pi_flag = numerator.divide(denominator, n);
            pi = pi.add(pi_flag);
        }
        var pi_const = new bigDecimal(12/(this.C**(3/2)));
        var final_pi = pi.multiply(pi_const, n);
        var big_one = new bigDecimal(1);
        return big_one.divide(final_pi, n).round(n - 1).getValue();
    };
    calcOri(n){  //native calculation without external module
        var numerator;
        var denominator;
        var pi = 0;
        for (var k=0; k < n; k++) {
            numerator = ((-1)**k)*this.factorial(6*k)*(13591409 + 545140134*k);
            denominator = this.factorial(3*k)*(this.factorial(k)**k)*(this.C**(3*k));
            pi += numerator/denominator;
        };
        pi = pi * (12/(this.C**(3/2)));
        return parseFloat(1/pi).toPrecision(n);
    };
};


const pi = new PiToTheNthDigit();
var n = 16;
console.log(`Value from js-big-decimal: ${pi.calc(n)}`);
console.log(`Value from native Calc: ${pi.calcOri(n)}`);


var alphabets = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var base = alphabets.length;

function encode(number)
{
    var encoded = "";
    while (number) {
        var remainder = number%base;
        number = Math.floor(number/base);
        encoded = alphabets[remainder].toString() + encoded;
    }
    return encoded;
}

function decode(encodedString)
{
    var decodedNumber = 0;
    while (encodedString)
    {
        var pos = alphabets.indexOf(encodedString[0]);
        decodedNumber = decodedNumber + pos*Math.pow(base, encodedString.length-1);
        encodedString = encodedString.substring(1);  
    }
    return decodedNumber;
}

module.exports.encode = encode;
module.exports.decode = decode;
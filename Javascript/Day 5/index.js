let num = 1256.4567;
//toFixed method helps us to mention number of digits after the decimal point.
let res1 = num.toFixed(2);
console.log(res1);

/*
Number of significant digits. Must be in the range 1 - 21, inclusive.

Returns a string containing a number represented either in exponential or fixed-point notation with a specified number of digits.
*/

let res2 = num.toPrecision(2);
console.log(res2);

//number can be created using another way, here we create number as an object
let num2 = new Number(75);
//but here if we compare it will be compared with memory reference rather than value
let num3 = new Number(75);
//even the data is same it will give false because references are different
console.log(num2 == num3);
//this is why we never use this method maybe only in rare case we use it we do it normally without using new keyword because then we are just talking about value not reference
let num4 = 75;
let num5 = 75;
console.log(num4 == num5);

//Math object in js
console.log(Math.PI);
console.log(Math.SQRT2);
console.log(Math.LN10);
console.log(Math.floor(9.9999));
console.log(Math.ceil(9.0001));
console.log(Math.round(9.4999));
console.log(Math.max(489, 789, 689));
console.log(Math.min(489, 789, 689));


//math.random() method
//generate numbers from 1 to 6 for ludo game
//formula: Math.random()*(max-min+1)+min (or) 
// Math.random()* (how many numbers you want to generate in total) + (offset)
console.log(Math.floor(Math.random()*(6-1+1)+1));

//generate number from 15 to 25
console.log(Math.floor(Math.random()*(25-15+1)+15));

//generate otp(but predictable)(1000-9999)
console.log(Math.floor(Math.random()*(9000)+1000));
//or
console.log(Math.floor(Math.random()*(9999-1000+1)+1000));



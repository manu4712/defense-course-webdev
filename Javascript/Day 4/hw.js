let num1 = "123.4";
let num2 = "0.56789";

console.log("original:------------------");
console.log(num1);
console.log(num2);

//aligning numbers properly 
let count1 = 0;
let count2 = 0;
while (num1[count1] !== ".") {
  ++count1;
}
while (num2[count2] !== ".") {
  ++count2;
}

if (count1 > count2) {
  num2 = num2.padStart(num2.length + (count1-count2), "0");
} else if (count2 > count1) {
  num1 = num1.padStart(num1.length + (count2-count1), "0");
}
console.log("adding at start:------------------");
console.log(num1);
console.log(num2);


if (num1.length > num2.length) {
  num2 = num2.padEnd(num1.length, "0");
} else if(num2.length > num1.length) {
  num1 = num1.padEnd(num2.length, "0");
}
console.log("adding at end:------------------");
console.log(num1);
console.log(num2);

//main logic
let res = "";
let i = num1.length - 1;
let carry = 0;

for (i; i > -1; i--) {
  if (num1[i] == "." && num2[i] == ".") {
    res = "." + res;
    continue;
  }
  let sum = Number(num1[i]) + Number(num2[i]) + carry;
  if (sum >= 10) {
    res = String(sum % 10) + res;
    carry = 1;
  } else {
    res = String(sum) + res;
    carry = 0;
  }
}
console.log("Final answer:------------------");
if(carry!==0)
{
    res = String(carry)+res;
}
console.log(Number(res));

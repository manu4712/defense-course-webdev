// instead of creating multiple values we can use an array
let age = [23, 45, 67, 89];

// we can use any data type inside an array
let mixedArr = ["manu", 23, "web developer", true];

console.log(typeof mixedArr);

//we can mutate values inside array
mixedArr[1] = 24;
console.log(mixedArr);

//we can add values at end using push method
mixedArr.push("adabala");
console.log(mixedArr);

//we can delete last element using pop method
mixedArr.pop();
console.log(mixedArr);

//we can add elements at starting of an array using unshift method
mixedArr.unshift("nani");
console.log(mixedArr);

//we can delete elements at starting of an array using unshift method
mixedArr.shift("nani");
console.log(mixedArr);

//can change const array llike this
const nums1 = [1,2,3,4,5,6];
nums1.push(8);
nums1.pop();
console.log(nums1);

//but can't change const array llike this
// const nums2 = [1,2,3,4,5,6];
// nums2 = [4,5];
// console.log(nums2);

//just ;like strings we can slice an array using slice method and it returs the sliced part
let res = nums1.slice(0,3);
console.log(res);


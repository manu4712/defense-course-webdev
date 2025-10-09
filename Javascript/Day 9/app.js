//Defining a function
function addNumbers(num1, num2) {
  //num1,num2 are parameters here
  const sum = num1 + num2;
  console.log(sum);
}
//calling a function
addNumbers(5, 5); //5,5 are arguments here

//to use the same code repeatedly whenever required we use function
console.log(addNumbers(2, 3)); //o/p:5,undefined -->undefined because we are not returning any value if we return any value that will come here then we can use it using variable or just print or do whatever we like.

function addNumbers2(num1, num2) {
  return num1 + num2;
}

console.log(addNumbers2(2, 3)); //now we get the return value instead of undefined as we are returning a value.

/*How to handle infinite arguments or when we don't know how many arguments will come */
//for that we can use rest operator
function addNumbers3(...nums) {
  let sum = 0;
  for (let val of nums) {
    sum = sum + val;
  }
  return sum;
}

console.log(addNumbers3(4, 5, 6, 8, 4, 2, 5));
console.log(addNumbers3(4));

//in this way we can handle any no of arguments

/*Difference between rest and spread operator even though it looks similar */

let arr = [1, 2, 3, 4, 5, 6];
const [firstVal, secondVal, ...remVal] = arr; //we use rest operator to catch the values
console.log(firstVal, secondVal, remVal);

let arr2 = [7, 8, 9, 10];
let arr3 = [...arr, ...arr2]; //we use spread operator to open any array and object we directly use it on array or object...it is to open them and spread those values inside it.

/*we can create function in another way also function:expression */
//in js,we can store a function in a variable

const personDetails = function (name, age) {
  //this is function expression
  console.log(`my name is ${name} and i am ${age} years old`);
};

personDetails("manu", 23); //we can only call function after function expression declaration we cannot access before it

personDetails2("manu", 23); //we can access before declaration here with normal function declaration.
function personDetails2(name, age) {
  //this is normal function declaration
  console.log(`my name is ${name} and i am ${age} years old`);
}


/*we have another way to create function is using arrow function */
 //here we did not even used function keyword  we jus used => (arrow)
let arrFun = (name,age)=>{
  console.log(`my name is ${name} and i am ${age} years old`);
}

arrFun("arun",1000);

//we have seen this while sorting an array
let arrFun2 = [14,48,56,89,12,56];
console.log(arrFun2.sort((a,b)=>a-b)); //here we used an arrow function to correctly sort

//if we have only one parameter we don't need () and if we have only one statement we don't even need return keuyword.
let arrFun3 = name => `my name is ${name}`;
console.log(arrFun3("rohit"));

//we can even return an object but here below when we use curly braces it this we should return somethinf from inside cirly braces that's why it give error
// let arrFun4 = () => {name:"manu",age:23};

//to rectify this we can use () to return one object as a single statement
let arrFun4 = () => ({name:"manu",age:23});
console.log(arrFun4()); 

/*we can create another type of function that is IIFE (immediately invoked function expression) */
//here we use ()() second one is for calling function,first one is to define function inside that

((name)=>{
    console.log(`my name is ${name}`);
})("manoj");

//----------this is about normal functions-----------

/*now we are going to learn about call back function */
//we call it a call back function if we pass a function as a paramenter in an other function
function greet(){
    console.log("hello guys,how are you?");
}

function meet(callback){
    callback();
    console.log("let's meet at a hotel today?");
}

//i want to call meet first then greet
meet(greet);

//but we can do this like below also
// greet();
// meet();

//let's take an example to understand this
function zomatoOrder()
{
    console.log("Your food is being prepared.");
}

function blinkitOrder()
{
    console.log('Your items are being packed.');
}
function payment(amount,callback)
{
    console.log(`Payment initialized for ${amount}`);
    console.log("payment successfully received");
    callback(); //instead of hardcoding we are making it flexible using callback function
}

payment(500,zomatoOrder);
payment(800,blinkitOrder);
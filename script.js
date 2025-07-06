console.log("Hello World");

let myString = "a2b3c";
console.log(myString);
console.log(typeof myString);

let myNumVar = 123;
console.log(typeof myNumVar);

console.log(10 + " eggs");
console.log(10 + 5 + " eggs");
console.log("eggs " + 10 + 5);

let EC = 1.9;
if(EC > 1.8){
    console.log("Plant is dying.");
}else{
    console.log("Plant is alive.");
}

// Conditional Statement Format
// Console.log to print out on dev tools console
// Alert to print out on top box
// let age = prompt("Enter your age");
// if(age<18){
//     alert("You are a minor.");
// }else if(age<60){
//     alert("You are an adult.");
// }else{
//     alert("You are a senior.");
// }

function introduction(name, age){
    console.log("Hello my name is " + name + ". I am " + age + " years old.");
}

introduction("Bob", 71);

function education(school, major){
    console.log("I go to " + school + " and I am an " + major + " major.");
}

education("NYIT", "architecture");

var str = "4678.987";
var intVal = parseInt(str);
console.log(intVal);

var floatVal = parseFloat(str);
console.log(floatVal);

var str = "I love tech class.";
console.log(str.toUpperCase);
console.log(str.slice(5,9));
console.log(str.indexOf("c"));

var classGirls = ["Agona", "Anjali", "Bria"];
console.log(classGirls[0]);
// classGirls[1];


var fruits = ["Figs", "Pomegranates", "Lemons", "Cherries", "Watermelons"
     , "Grapes", "Plums", "Mangoes", "Cantalope", "Apricots"];
console.log(fruits.length);
console.log(fruits[1].toLowerCase);



let animals = ['lion', 'elephant', 'tiger', 'giraffe', 'zebra', 'monkey', 'bison', 'bear'];

for (let i = 0; i < animals.length; i++) {
    console.log(animals[i]);
}

// for (let i = 1; i < animals.length; i = 2) {
//     console.log(animals[i]);

for (let i = 1; i < animals.length; i += 2) {
    console.log(animals[i]);
}

let arr = ['horror', 'comedy', 'action', 'romance', 'true-crime', 'contemporary', 'dystopian', 'non-fiction'];

for (let i = 0; i < arr.length; i ++); {
console.log(arr.toUpperCase);
}

let reversed = arr.reverse();
for (let i = 0; i < reversed.length; i ++); {
    console.log(arr.reversed[i])
}


// arrays.js

// Activity 1 - Map
const steps = ["one", "two", "three"];
function listTemplate(step) {return `<li>${step}</li>`;}
const stepsHtml = steps.map(listTemplate);
document.querySelector("#myList").innerHTML = stepsHtml.join("");

// Activity 2 - Map
const letterGrades = ["A", "B", "A"];
function convertToPoint(letter) {
    let point = -1;
    switch (letter) {
        case "A":
            point = 4;
            break;
        case "B":
            point = 3;
            break;
        case "C":
            point = 2;
            break;
        case "D":
            point = 1;
            break;
        case "F":
            point = 0;
            break;
        default:
            console.log("error");
    }
    return point;
}
const pointGrades = letterGrades.map(convertToPoint);
const gradesHtml = letterGrades.map(listTemplate);
document.querySelector("#myGrades").innerHTML = gradesHtml.join("");

// Activity 3 - Reduce
const gpa = pointGrades.reduce(
    (gradePoints, currentPoints) => gradePoints + currentPoints
) / pointGrades.length;
document.querySelector("#gpa").innerText = `GPA: ${gpa}`;

// Activity 4 - Filter
const fruit = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];
const longFruit = fruit.filter(word => word.length > 6);
document.querySelector("#fruit").innerText = 
    `Fruit with more than 6 characters: ${longFruit}`;

// Activity 5 - indexOf
const numbers = [12, 34, 21, 54];
const luckyNumber = 21;
document.querySelector("#lucky").innerText = `The index of ${
    luckyNumber} in [${numbers}] is ${numbers.indexOf(luckyNumber)}.`;

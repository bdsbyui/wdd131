// gpa.js

/*
 * Get user provived grades.
 * @param {selector} selector - The document selector containing user input.
 * @returns {array} The formatted array of valid letter grades.
 * @throws {Error} Throws an errror if the input selector is empty.
 */
function getGrades(selector) {
  try {
    const string = selector.value;
    if (string.length === 0) throw new Error(`Input empty.`);
    const array = string.trim().split(",").map(item => item.trim());
    return array.map(validateInput);
  } catch (error) {
    throw error;
  }
}

/*
 * Display message to #output based on the input to #grades, including any 
 * error messages propogated up the stack.
 */
function generateGPA() {
  const input = document.querySelector("#grades");
  const output = document.querySelector("#output");
  let display = "message";
  try {
    const grades = getGrades(input);
    display = grades;
  } catch(error) {
    display = error.message;
  } finally {
    output.innerHTML = display;
    input.value = "";
  }
}

function validateInput(string) {
  if (string)
  return string;
}

// Event Listeners
document.querySelector("#grades").addEventListener("keypress", function(event) {
    if (event.key === "Enter" || event.keyCode === 13) {generateGPA();}
});
document.querySelector("#submitButton").addEventListener("click", generateGPA);

// events.js

let tasks = [];

function templateTask(task) {
  return `
    <li ${task.completed ? 'class="strike"' : ""}>
      <p>${task.detail}</p>
      <div>
        <span data-action="delete">❎</span>
        <span data-action="complete">✅</span>
      </div>
    </li>
  `;
}

function renderTasks(tasks) {
  const listElement = document.querySelector("#todoList");
  const html = tasks.map(templateTask).join("");
  listElement.innerHTML = html;
}

function addTask() {
  const input = document.querySelector("#todo"); 
  const task = input.value;
  if (task != "") {tasks.push({detail: task, completed: false});}
  renderTasks(tasks);
  input.value = "";
}

function removeTask(taskElement) {
  tasks = tasks.filter(
    (task) => task.detail != taskElement.querySelector('p').innerText
  );
  taskElement.remove();
  renderTasks(tasks);
}

function completeTask(taskElement) {
  const tasksIndex = tasks.findIndex(
    (task) => task.detail === taskElement.querySelector('p').innerText
  );
  tasks[tasksIndex].completed = tasks[tasksIndex].completed ? false : true;
  taskElement.classList.toggle("strike");
  renderTasks(tasks);
}

function manageTasks(event) {
  const parent = event.target.closest("li");
  if (event.target.dataset.action === "delete") {removeTask(parent);}
  if (event.target.dataset.action === "complete") {completeTask(parent);}
}

document.querySelector("#todo").addEventListener("keypress", function(event) {
  if (event.key === "Enter" || event.keyCode === 13) {addTask();}
})
document.querySelector("#submitTask").addEventListener("click", addTask);
document.querySelector("#todoList").addEventListener("click", manageTasks);

renderTasks(tasks);
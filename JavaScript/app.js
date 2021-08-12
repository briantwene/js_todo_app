// Filename: app.js
// Name: Brian Twene
// Date: 10/08/2021

//activate strict mode
"use Strict";
//select all the elements needed
const clearbtn = document.querySelector(".clear");
const todoList = document.querySelector(".todo-list");
const listContainer = document.querySelector(".todo-list-container");
const todoInput = document.querySelector(".todo-input");
const todoAdd = document.querySelector(".todo-add");
const noTask = document.querySelector(".no-tasks");
const todoStorage = window.localStorage;
//create a global array that will hold the items for storage
let todos = [];

//function for getting stored data
const getStorage = function () {
  const ref = todoStorage.getItem("todo");

  if (ref) {
    todos = JSON.parse(ref);
    buildTodos(todos);
  }
};

//function for adding updated data in the global array to the localStorage
const addToStorage = function (todos) {
  todoStorage.setItem("todo", JSON.stringify(todos));
  console.log(todoStorage);
  buildTodos(todos);
};

//function for creating a task
const createTask = function () {
  const task = todoInput.value;
  if (task !== "") {
    const todoInfo = {
      task: task,
      done: false
    };

    todos.push(todoInfo);
    addToStorage(todos);
    todoInput.value = "";
  } else {
    alert("invalid input!");
  }
};

//function for creating the li element around the text for the task
const createListItem = function (task, done) {
  //create elements and store in variables
  const delBtn = createElement("button", "delete");
  const doneBtn = createElement("button", "done");
  const spanText = createElement("span", "text");
  const taskItem = createElement("li", "list-item");

  //add textcontent and append them to the list element
  doneBtn.textContent = "✓";
  delBtn.textContent = "✗";
  spanText.textContent = task;
  if (done) {
    spanText.classList.add("complete");
  }
  taskItem.append(spanText, doneBtn, delBtn);
  todoList.append(taskItem);
};
//function for removing the an item
const removeFromStorage = function () {};

//function for getting the data out and running the previous function
const buildTodos = function (todos) {
  let i;
  todoList.textContent = "";
  for (i = 0; i < todos.length; i++) {
    const task = todos[i].task;
    const done = todos[i].done;
    createListItem(task, done);
  }
  listContainer.classList.remove("hidden");
};
//function for actually creating the elements needed for each li
const createElement = function (elName, clName) {
  const el = document.createElement(elName);
  el.className = clName;
  return el;
};

const toggleDone = function () {};

todoAdd.addEventListener("click", createTask);
getStorage();

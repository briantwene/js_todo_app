// Filename: app.js
// Name: Brian Twene
// Date: 12/08/2021

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
  //get the todo list in the storage
  const ref = todoStorage.getItem("todo");
  //if the storage exists then extract if not the value will be a null
  //which is a falsy value
  if (ref) {
    todos = JSON.parse(ref);
    buildTodos(todos);
  }
};

//function for adding updated data in the global array to the localStorage
const addToStorage = function (todos) {
  //store the array in the localStorage
  //JSON.stringfy allows arrays and objects to go into the localstorage
  todoStorage.setItem("todo", JSON.stringify(todos));
  //display the tasks
  buildTodos(todos);
};

//function for creating a task
const createTask = function () {
  //get the task entered byt the user
  const task = todoInput.value;
  //if its not an empty string
  if (task !== "") {
    //then create the task as an object
    //has two properties the task and if the task is marked as done
    const todoInfo = {
      task: task,
      done: false
    };
    //and put it in the todo array
    todos.push(todoInfo);
    addToStorage(todos);
    //reset the input
    todoInput.value = "";
  } else {
    //display error message if the input is an empty string
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
  //append the span, done and delete button to the list item
  taskItem.append(spanText, doneBtn, delBtn);
  //append the list item to the list itself
  todoList.append(taskItem);
};
//function for removing the an item
const removeFromStorage = function (task) {
  let i;
  for (i = 0; i < todos.length; i++) {
    //if the task matches
    if (todos[i].task === task) {
      //remove the object from the array
      todos.pop(i);
    }
  }
  //update the storage
  addToStorage(todos);
};

//function for getting the data out and running the previous function
const buildTodos = function (todos) {
  let i;
  //empty the list
  todoList.textContent = "";
  for (i = 0; i < todos.length; i++) {
    //get the properties from the object
    const task = todos[i].task;
    const done = todos[i].done;
    //create the list element with that data
    createListItem(task, done);
  }
  //check to see if there is any list items left in the list
  //if there isnt remove the list and display no task message
  //or else display the list.
  if (todoList.querySelectorAll(".list-item").length === 0) {
    noTask.classList.remove("hidden");
    listContainer.classList.add("hidden");
  } else {
    listContainer.classList.remove("hidden");
    noTask.classList.add("hidden");
  }
};
//function for actually creating the elements needed for each li
const createElement = function (elName, clName) {
  //create the element
  const el = document.createElement(elName);
  //give the element a class
  el.className = clName;
  return el;
};

//function that changes toggles the the "done" class for a task
const toggleDone = function (task) {
  let i;
  for (i = 0; i < todos.length; i++) {
    //if the task in the object matches
    if (todos[i].task === task) {
      //change the value of the done property to the opposite
      todos[i].done = !todos[i].done;
    }
  }
  addToStorage(todos);
};

//function for clearing the todo list
const clearAll = function () {
  //clear the localstorage, the todos array and the whole list
  todoStorage.clear();
  todos = [];
  todoList.textContent = "";
  //display the no task message
  listContainer.classList.add("hidden");
  noTask.classList.remove("hidden");
};

//event listener for the add button
todoAdd.addEventListener("click", createTask);
//one for the clear all button
clearbtn.addEventListener("click", clearAll);

//one for the whole ul element that holds the task item
todoList.addEventListener("click", function (e) {
  //store the task itself in a variable
  const task = e.target.parentElement.querySelector("span").textContent;
  //if the button clicked is the done button
  if (e.target.className === "done") {
    toggleDone(task);
    //or if its the delete task button
  } else if (e.target.className === "delete") {
    removeFromStorage(task);
  }
});
//run get storage at the start to load user data if they have any
getStorage();

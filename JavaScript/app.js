// Filename: app.js
// Name: Brian Twene
// Date: 10/08/2021

//actuvate strict mode
"use Strict";
//select all the elements needed
const clearbtn = document.querySelector(".clear");
const todoList = document.querySelector(".todo-list");
const listContainer = document.querySelector(".todo-list-container");
const todoInput = document.querySelector(".todo-input");
const todoAdd = document.querySelector(".todo-add");
const noTask = document.querySelector(".no-tasks");
const hidden = "hidden";

//function for clearing the whole list
const clearAll = function () {
  //while there is still a last child remove it until theres none left
  while (todoList.lastChild) {
    todoList.removeChild(todoList.lastChild);
  }
  //hide the empty list and display message to the user
  toggleHiddenClass();
};

const toggleHiddenClass = function () {
  listContainer.classList.toggle("hidden");
  noTask.classList.toggle("hidden");
};

//function for getting user input from the app
const getInput = function () {
  let input = todoInput.value;
  return input;
};

//function for creating the elements for the task item
const createElement = function (elName, clName) {
  const el = document.createElement(elName);
  el.className = clName;
  return el;
};

//function for putting the elements together
const createTask = function (input) {
  //create elements and store in variables
  const delBtn = createElement("button", "delete");
  const doneBtn = createElement("button", "done");
  const spanText = createElement("span", "text");
  const taskItem = createElement("li", "list-item");

  //add textcontent and append them to the list element
  doneBtn.textContent = "✓";
  delBtn.textContent = "✗";
  spanText.textContent = input;
  taskItem.append(spanText, doneBtn, delBtn);
  todoList.append(taskItem);
};

//function for adding the task to the list
const addTask = function () {
  const input = getInput();
  //if the user entered something then
  //add the task to the list
  if (input !== "") {
    createTask(input);
    listContainer.classList.remove("hidden");
    noTask.classList.add("hidden");
    //otherwise display error message
  } else {
    alert("invalid input");
  }
  todoInput.value = "";
};

//event listener for the clear button
clearbtn.addEventListener("click", clearAll);
//event listener for for when user clicks on add button
todoAdd.addEventListener("click", addTask);

//event listener that checks if the user pressed the complete or delete button
todoList.addEventListener("click", function (e) {
  //if the user clicked the delete button
  if (e.target.className === "delete") {
    //remove the parent (li) from the list
    todoList.removeChild(e.target.parentNode);
    //and check if there is no items left so that a message can be displayed
    if (todoList.querySelectorAll(".list-item").length === 0) {
      toggleHiddenClass();
    }
    //otherwise if the user clicked on the done button
  } else if (e.target.className === "done") {
    //the mark the text as complete
    const span = e.target.parentNode.querySelector("span");
    span.classList.toggle("complete");
  }
});

// descrutured: unpacks objects into variables - saves time down the road
import { createElement, getElement } from "./helpers.js";

export default class ViewTodo {
  constructor(modelList) {
    this.modelList = modelList;
    this.newTodoForm = document.querySelector("[data-new-todo-form]");
    this.todoList = document.querySelector("[data-todo-list]");
    this.delBtn = document.querySelector(".delete");
  }

  //create todo from dom
  clearElement(element) {
    element.innerHTML = "";
  }

  renderTodos(getActiveTodos) {
    // console.log(getActiveTodos);
    const todos = getActiveTodos();
    this.clearElement(this.todoList);
    todos.forEach((todo) => {
      const todoElement = createElement("li");
      todoElement.innerText = todo.title;
      todoElement.id = todo.id;
      todoElement.classList.add("todo-item");
      if (todo.complete) {
        const strike = createElement("s");
        strike.innerText = todo.title;
        todoElement.append(strike);
      } else {
        todoElement.innerText = todo.title;
      }
      const deleteBtn = createElement("button", "delete-todo");
      deleteBtn.textContent = "Delete";
      todoElement.append(deleteBtn);
      this.todoList.appendChild(todoElement);
    });
  }
  // binded to event listeners
  bindTodoSubmit(handler) {
    this.newTodoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newTodoInput = document.querySelector("[data-new-todo-input]");
      const todoTitle = newTodoInput.value.trim();
      if (todoTitle === null || todoTitle === "") return;
      handler(todoTitle);
      newTodoInput.value = null;
    });
  }

  bindToggleTodo(handler) {
    this.todoList.addEventListener("change", (e) => {
      if (e.target.type === "checkbox") {
        const id = parseInt(e.target.parentElement.id);
        handler(id);
      }
    });
  }

  bindDeleteTodo(handler) {
    this.todoList.addEventListener("click", (e) => {
      if (e.target.className === "delete-todo") {
        const id = parseInt(e.target.parentElement.id);
        handler(id);
      }
    });
  }
}

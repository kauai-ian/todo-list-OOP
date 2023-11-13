// descrutured: unpacks objects into variables - saves time down the road
import { createElement, getElement } from "./helpers.js";

export default class ViewTodo {
  constructor(modelList) {
    this.modelList = modelList;
    this.newTodoForm = getElement("[data-new-todo-form]");
    this.todoList = getElement("[data-todo-list]");
    this.delBtn = getElement(".delete");
  }

  //create todo from dom
  clearElement(element) {
    element.innerHTML = "";
  }

  renderTodos(getActiveTodos) {
    const todos = getActiveTodos();
    this.clearElement(this.todoList);

    todos.forEach((todo) => {
      const li = createElement("li");
      li.id = todo.id;
      li.classList.add("todo-item");

      const checkbox = createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.complete;

      const span = createElement("span");
      span.contentEditable = true;
      span.classList.add("editable");

      if (todo.complete) {
        const strike = createElement("s");
        strike.innerText = todo.title;
        span.append(strike);
      } else {
        span.innerText = todo.title;
      }

      const deleteBtn = createElement("button", "delete-todo");
      deleteBtn.textContent = "Delete";
      li.append(checkbox, span, deleteBtn);
      this.todoList.appendChild(li);
    });
  }
  // binded to event listeners
  bindTodoSubmit(handler) {
    this.newTodoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newTodoInput = getElement("[data-new-todo-input]");
      const todoTitle = newTodoInput.value.trim();
      if (todoTitle === null || todoTitle === "") return;
      handler(todoTitle);
      newTodoInput.value = null;
    });
  }

  bindToggleTodo(handler) {
    this.todoList.addEventListener("change", (e) => {
      if (e.target.type === "checkbox") {
        const id = e.target.parentElement.id;
        handler(id);
      }
    });
  }

  bindDeleteTodo(handler) {
    this.todoList.addEventListener("click", (e) => {
      if (e.target.className === "delete-todo") {
        const id = e.target.parentElement.id;
        handler(id);
      }
    });
  }

  bindClearCompleted(handler) {
    const clearCompletedButton = getElement('[data-clear-compl-btn]')
    if(clearCompletedButton) {
        clearCompletedButton.addEventListener('click', handler)
    }
  }
}

import ModelTodo from "./todo.js";
import ModelList from "./list.js";
// descrutured: unpacks objects into variables - saves time down the road
import { createElement, getElement } from "./helpers.js";

class ViewList {
  constructor() {
    this.listsContainer = document.querySelector("[data-lists]");
    this.newListForm = document.querySelector("[data-new-list-form]");
    this.delBtn = document.querySelector("[data-del-btn]");
    this.newListForm.addEventListener("submit", (e) => this.addList(e));
  }

  // shows the lists from the modelList
  renderList(lists) {
    // console.log(lists);
    while (this.listsContainer.firstChild) {
      this.listsContainer.removeChild(this.listsContainer.firstChild);
    }
    if (lists.length === 0) {
      const p = createElement("p");
      p.textContent = "Make a list first to add a todo";
      this.listsContainer.append(p);
    } else {
      lists.forEach((list) => {
        const listElement = document.createElement("li");
        listElement.id = list.id;
        listElement.classList.add("list-title");
        listElement.innerText = list.title;
        const deleteListButton = createElement("button", "delete-list");
        deleteListButton.textContent = "Delete";
        this.listsContainer.appendChild(listElement);
      });
    }
  }
  // add a function that will be called by an event listener to get the form data
  // pass that function to the controller so that it can run in the model
  addList(e) {
    e.preventDefault();
    console.log("list submitted");
    const newListInput = document.querySelector("[data-new-list-input]");
    const listTitle = newListInput.value.trim();
    if (listTitle === null || listTitle === "") return;
    newListInput.value = null;
    this.helper(listTitle);
  }

  // add a list handler that takes a call back to set this.handler to the callback
  addListHandler(callback) {
    this.helper = callback;
  }

  deleteList(handler) {
    this.listsContainer.addEventListener("click", (e) => {
      if (e.target.className === "delete") {
        const id = parseInt(e.target.parentElement.id);
        handler(id);
      }
    });
  }
  // do we need a callback for delete list?
  // addDeleteHandler(callback) {
  //   this.helper = callback
  // }
}

class ViewTodo {
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

class Controller {
  constructor(modelList, modelTodo, viewList, viewTodo) {
    this.modelList = modelList;
    this.modelTodo = modelTodo;
    this.viewList = viewList;
    this.viewTodo = viewTodo;

    //explicit this binding
    // this.viewList.bindDeleteList(this.handleDeleteList);
    this.viewList.renderList(this.handleRenderList);
    this.viewTodo.renderTodos(this.handleRenderTodos);
    this.viewTodo.bindTodoSubmit(this.handleAddTodo);
    this.viewTodo.bindDeleteTodo(this.handleDeleteTodo);
    this.viewTodo.bindToggleTodo(this.handleToggleTodo);
    this.viewList.addListHandler(this.handleAddList);

    //display todos on page load
    this.onChange(this.modelList.lists);
    this.modelList.bindListChanged(this.onChange);
  }
  onChange = () => {
    const lists = this.modelList.lists;
    const todos = this.modelTodo.activeList
      ? this.modelTodo.activeList.todos
      : [];
    this.viewList.renderList(lists);
    this.viewTodo.renderTodos(this.handleRenderTodos);
  };
  // handlers for callbacks
  handleAddList = (listTitle) => {
    this.modelList.newList(listTitle);
  };
  handleAddTodo = (todoTitle) => {
    const activeList = this.modelList.getActiveList();
    this.modelTodo; //set the model list because its not being constructed yet.
    this.modelTodo.newTodo(todoTitle);
    return activeList.todos;
  };
  handleRenderList = () => {
    this.modelList.renderList();
  };
  handleRenderTodos = () => {
    // this.modelTodo.renderTodos();
    // pull activelist.id and that contains the todos, call getActiveList, then
    // pass into viewTodo
    // inside this function grab the items from activeList and return it
    const activeList = this.modelList.getActiveList();
    return activeList.todos;
  };
  handleDeleteList = () => {
    this.modelList.deleteList();
  };
  handleDeleteTodo = (id) => {
    this.modelTodo.deleteTodo(id);
  };
  handleToggleTodo = (id) => {
    this.modelTodo.toggleTodo(id);
  };
}
const modelList = new ModelList();
const modelTodo = new ModelTodo(modelList);
const viewList = new ViewList();
const viewTodo = new ViewTodo();

// console.log({ modelTodo, viewList, viewTodo, modelList });
const app = new Controller(modelList, modelTodo, viewList, viewTodo);

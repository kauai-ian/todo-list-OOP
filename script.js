class ModelList {
  constructor() {
    this.lists = this.getLocalStorage("listsKey") || [
      { id: 1, title: "ProjectA", todos: [] },
      { id: 2, title: "ProjectB", todos: [] },
    ];
    this.activeListId = this.getLocalStorage("activeListKey") || 1;
  }
  bindListChanged(callback) {
    this.onChange = callback; // we want to create a callback to the controller.
  }
  newList(title) {
    const list = {
      id: Date.now(),
      title: title,
      todos: [],
    };
    this.lists.push(list); // we want to push the list object to the array of lists
    this.onChange(this.lists); // calls the onListChange function to render the lists
  }

  getActiveList() {
    return this.lists.find((list) => list.id === this.activeListId); // returns a match
  }

  // need to make sure this is working
  switchLists(id) {
    this.activeListId = id; // render active list
    this.onChange(this.lists);
  }

  deleteList(id) {
    this.lists = this.lists.filter((list) => list.id !== id);
    this.onChange(this.lists);
  }

  getLocalStorage(key) {
    let data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  save() {
    this.onChange(this.lists);
    localStorage.setItem("todos", JSON.stringify(this.lists));
    localStorage.setItem("activeListKey", this.activeListId); // save the currently active list via the id
  }
}

class ModelTodo {
  constructor(modelList) {
    this.modelList = modelList;
  }

  newTodo(title) {
    // loop over lits, find list matching id, list.add todo
    const activeList = this.modelList.getActiveList();
    if (activeList) {
      const todo = {
        id: Date.now().toString(),
        title: title,
        complete: false,
      };
      activeList.todos.push(todo); // pushes the new todo to the active list by default
      this.modelList.save();
    } else {
      console.log("no active list selected--newTodo");
      return;
    }
  }

  deleteTodo(id) {
    const activeList = this.modelList.getActiveList();
    if (activeList) {
      activeList.todos = activeList.todos.filter((todo) => todo.id !== id);
      this.modelList.save();
    } else {
      console.log("no active list selected--deleteTodo");
      return;
    }
  }

  toggleTodo(id) {
    const activeList = this.modelList.getActiveList();
    if (activeList) {
      activeList.todos = activeList.todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      });
      this.modelList.save();
    } else {
      console.log("no active list selected--toggleTodo");
      return;
    }
  }
}

class ViewList {
  constructor() {
    this.listsContainer = document.querySelector("[data-lists]");
    this.newListForm = document.querySelector("[data-new-list-form]");
    this.delBtn = document.querySelector("[data-del-btn]");
    this.newListForm.addEventListener("submit", (e) => this.addList(e));
    this.delBtn.addEventListener("click", () => handleDeleteList());
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }

  renderList(lists) {
    console.log(lists);
    while (this.listsContainer.firstChild) {
      this.listsContainer.removeChild(this.listsContainer.firstChild);
    }
    if (lists.length === 0) {
      const p = this.createElement("p");
      p.textContent = "Make a list first to add a todo";
      this.listsContainer.append(p);
    } else {
      lists.forEach((list) => {
        const listElement = document.createElement("li");
        listElement.id = list.id;
        listElement.classList.add("list-title");
        listElement.innerText = list.title;
        const deleteListButton = this.createElement("button", "delete");
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

  // add a todo handler that takes a call back to set this.handler to the callback
  addListHandler(callback) {
    this.helper = callback;
  }
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
    const todos = getActiveTodos();
    this.clearElement(this.todoList);
    todos.forEach((todo) => {
      const todoElement = this.createElement("li");
      todoElement.innerText = todo.title;
      todoElement.id = todo.id;
      todoElement.classList.add("todo-item");
      const deleteBtn = this.createElement("button", "delete");
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
      if (e.target.className === "delete") {
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
    // this.viewList.bindNewList(this.handleAddList);
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
  // handlers to handle clicks
  handleAddList = (listTitle) => {
    this.modelList.newList(listTitle);
  };
  handleAddTodo = (todoTitle) => {
    this.modelTodo.newTodo(todoTitle);
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

const modelTodo = new ModelTodo();
const viewList = new ViewList();
const viewTodo = new ViewTodo();
const modelList = new ModelList();
console.log({ modelTodo, viewList, viewTodo, modelList });
const app = new Controller(modelList, modelTodo, viewList, viewTodo);

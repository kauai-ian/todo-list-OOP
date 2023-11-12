class ModelList {
  constructor() {
    this.lists = this.getLocalStorage("listsKey") || [];
    this.activeListId = this.getLocalStorage("activeListKey") || "";
  }
  bindListChanged(callback) {
    this.onChange = callback; // we want to create a callback to the controller.
  }
  newList(title) {
    const list = {
      id: Date.now().toString(),
      title: title,
      todos: [],
    };
    this.lists.push(list); // we want to push the list object to the array of lists
    this.onChange(this.lists); // calls the onListChange function to render the lists
  }

  getActiveList() {
    return this.lists.find((list) => list.id === this.activeListId); // returns a match
  }

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
    // this.addBtn = document.querySelector(".create");
    this.listsContainer.addEventListener("click", () => this.bindRenderList())
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

  //create list from dom
  clearElement(element) {
    element.innerHTML = "";
  }

  RenderList() {
    console.log("rendering list called")
      this.clearElement(this.listsContainer);
      const lists = this.modelList.lists
      lists.forEach((list) => {
        const listElement = document.createElement("li");
        listElement.dataset.listId = list.id;
        listElement.classList.add("list-title");
        listElement.innerText = list.title;
        this.listsContainer.appendChild(listElement);
      });
  }

  bindNewList(handler) {
    this.newListForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("list submitted");
      const newListInput = document.querySelector("[data-new-list-input]");
      const listTitle = newListInput.value.trim();
      if (listTitle === null || listTitle === "") return;
      handler(listTitle);
      newListInput.value = null;
    });
  }

  bindDeleteList(handler) {
    this.delBtn.addEventListener("click", () => handler());
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

  renderTodos() {
    this.todoList.addEventListener("click", () => {
    const todos = this.modelList.getActiveList()?.todos;
    this.clearElement(this.todoList);
    // if (todos) {
      todos.forEach((todo) => {
        const todoElement = this.createElement("li");
        todoElement.innerText = todo.title;
        todoElement.dataset.todoId = todo.id;
        todoElement.classList.add("todo-item");
        const deleteBtn = this.createElement("button", "delete");
        deleteBtn.textContent = "Delete";
        todoElement.append(deleteBtn);
        this.todoList.appendChild(todoElement);
      });
    // }
  })
  }

  bindTodoSubmit(handler) {
    this.newTodoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newTodoInput = document.querySelector("[data-new-todo-input]");
      const todoTitle = newTodoInput.value.trim();
      if (todoTitle === null || todoTitle === "") return;
      handler(todoTitle)
      newTodoInput.value = null;
    })
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
    this.viewList.bindNewList(this.handleAddList);
    this.viewList.bindDeleteList(this.handleDeleteList);
    this.viewList.renderList(this.handleRenderList);
    this.viewTodo.renderTodos(this.handleRenderTodos);
    this.viewTodo.bindTodoSubmit(this.handleAddTodo);
    this.viewTodo.bindDeleteTodo(this.handleDeleteTodo);
    this.viewTodo.bindToggleTodo(this.handleToggleTodo);

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
    this.viewTodo.renderTodos(todos);
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
    this.modelTodo.renderTodos();
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
const app = new Controller(
  new ModelList(),
  new ModelTodo(),
  new ViewList(),
  new ViewTodo()
);

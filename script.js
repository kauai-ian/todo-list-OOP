// variables will be contained inside the functions themselves

class Model {
  //manages the data (storage and modifying)
  constructor() {
    this.lists = getLocalStorage("listsKey") || []; // to load the project from memory or start blank
    this.activeList = getLocalStorage("activeListKey");
  }

  newList(title) {
    const list = {
      id: Date.now().toString(),
      title: title,
      todos: [],
    };
    this.lists.push(list); // we want to push the list object to the array of lists
    // when things change run a function with the parameter of the array of lists
  }

  newTodo(title) {
    const todo = {
      id: Date.now().toString(),
      title: title,
      complete: false,
    };
    this.activeList.push(todo); // pushes the new todo to the active list by default
  }

  // switch lists
  switchLists(id) {
    this.activeList = this.lists.find((list) => list.id === id);
  }

  // delete list via filtering out of array of lists
  deleteList(id) {
    this.lists = this.lists.filter((list) => list.id !== id);
  }

  deleteTodo(id) {
    this.todo = this.todo.filter((todo) => todo.id !== id);
  }

  // flip the complete boolean on the specific todo of the active list
  toggleTodo(id) {
    this.activeList.todos = this.activeList.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, complete: !todo.complete };
      } else {
        return todo;
      }
    });
  }
}

class View {
  constructor() {}
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
}
const app = new Controller(new Model(), new View());

// old code

let activeList = getLocalStorage("activeList") || null;
const listsContainer = document.querySelector("[data-lists]");
const todoItems = document.querySelector("[data-todo-items]");
const newListForm = document.querySelector("[data-new-list-form]");
const newTodoForm = document.querySelector("[data-new-todo-form]");
// const addBtn = document.querySelector(".create");

const _activeList = renderActiveList();

listsContainer.addEventListener("click", selectList);

// 3. storage: store information in key value pairs. have a function that runs when storage is needing to get fetched

function getLocalStorage(key) {
  let data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

//function when setting local storage
function setLocalStorage(variable, lists) {
  localStorage.setItem(variable, JSON.stringify(lists));
}
// 5. grab the new list form on submit and run a function that creates a new list.
// prevent refresh of page on submit. extract the value from the input field to a variable, if value is blank return.
// create the list object by running a sepereate function. reset the input field. push the new list to the list array.
// update the list in the dom.
newListForm.addEventListener("submit", handleListSubmit);

function handleListSubmit(e) {
  e.preventDefault();
  const newListInput = document.querySelector("[data-new-list-input]");
  const listTitle = newListInput.value.trim();
  if (listTitle === null || listTitle === "") return;
  const list = newList(listTitle);
  newListInput.value = null;
  lists.push(list);
  setLocalStorage("title", newListInput.value.trim());
  renderList();
}

// 5. create a list that will upon pressing enter or click, add list item. then it will clear the input field. adds the properties like title, id, etc, and appends to list array. make lists array of objects into HTML and identifies which list is selected using an ID. clears the lists container input field
function clearElement(element) {
  element.innerHTML = "";
}

function renderList() {
  clearElement(listsContainer);
  lists.forEach((list) => {
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id;
    listElement.classList.add("list-title");
    listElement.innerText = list.title;
    listsContainer.appendChild(listElement);
  });
}
renderList();

// 5. when the user clicks on a list, it becomes the active list. When that happens, we find the list title that matches the innertext of the list item.  the list title is now changed to the active list title. The todos are now for that list title.
function selectList(e) {
  if (e.target.classList.contains("list-title")) {
    clearActiveLists();
    setActiveList(e.target);
    renderActiveList();
  }
}

function clearActiveLists() {
  const listItems = document.querySelectorAll(".list-title");
  listItems.forEach((item) => item.classList.remove("active-list"));
}

function setActiveList(listItem) {
  listItem.classList.add("active-list");
}

function renderActiveList() {
  const todoContainer = document.querySelector("[data-todo-list-container]");
  const activeListItem = document.querySelector(".active-list");
  if (activeListItem) {
    const selectListTitle = activeListItem.innerText;
    const selectList = lists.find((list) => list.title === selectListTitle);
    if (selectList) {
      showActiveList(todoContainer, selectListTitle, selectList.id);
    } else {
      hideActiveList(todoContainer);
    }
  }
}
function showActiveList(todoContainer, selectListTitle, listId) {
  todoContainer.style.display = "block";
  const displayTitle = document.querySelector("[data-list-title]");
  displayTitle.innerText = selectListTitle;
  // logic for todos here
  const activeList = lists.find((list) => list.id === listId);
  renderTodoList(activeList);
}

function hideActiveList(todoContainer) {
  todoContainer.style.display = "none";
}

// 1. create a todo item that is related to the parent list
// create the todo item data is stored in an object
// todos are going to be objects that are dynamically created using either factories or constructor/classes
newTodoForm.addEventListener("click", handleTodoSubmit);

function newTodo(title) {
  return {
    id: Date.now().toString(),
    title: title,
    complete: false,
  };
}

function renderTodoList(activeList) {
  clearElement(todoItems);
  console.log("creating todo item");
  activeList.todo.forEach((todo) => {
    const todoElement = document.createElement("li");
    todoElement.innerText = todo.title;
    todoElement.dataset.todoId = todo.id;
    todoElement.classList.add("todo-item");
    todoItems.appendChild(todoElement);
  });
}
// 1. create a funtion that will handle the submission of the form and pushing the new object into the array

function handleTodoSubmit(e) {
  e.preventDefault();
  const newTodoInput = document.querySelector("[data-new-todo-input]");
  const todoTitle = newTodoInput.value.trim();
  if (todoTitle === null || todoTitle === "") return;

  const activeList = getActiveList();

  if (activeList) {
    const todo = newTodo(todoTitle);
    activeList.todos.push(todo);
    newTodoInput.value = null;
    showActiveList(todoContainer, activeList.title, activeList);
  }
}

function getActiveList() {
  const activeListItem = document.querySelector(".active-list");
  if (activeListItem) {
    const selectListTitle = activeListItem.innerText;
    return lists.find((list) => list.title === selectListTitle);
  }
  return null;
}

// 1. default todo list that all todos are added to (whatever is default selected)

// 5. user can create new lists of projects
// 5. user can choose which list of projects their todos go into

// seperation of application logic from DOM-related stuff
// creating todos
// setting todos as complete
// changing todo priority

// 4. grab the list name and delete the list along with all its associated todo items
// TODO:

(function () {
  const delBtn = document.querySelector("[data-del-btn]");
  delBtn.addEventListener("click", deleteList);
})();

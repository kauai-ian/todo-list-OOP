// 11/4 1.5 hours to try draw out visually what I want to do.
// 11/5 530am-8am, 830am-1045am
//next steps = pseudocode out the connection between the lists and the todos. how does that work?
// also, how does the add todo items work?

// variables will be contained inside the functions themselves

const listsContainer = document.querySelector("[data-lists]");
const newListForm = document.querySelector("[data-new-list-form]");
const addBtn = document.querySelector(".create");
const lists = [];
const _activeList = renderActiveList();
listsContainer.addEventListener("click", selectList);

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
  setLocalStorage("title", newListInput.value.trim());
  newListInput.value = null;
  lists.push(list);
  render();
}

function newList(title) {
  return {
    id: Date.now().toString(),
    title: title,
    todos: [],
  };
}

// 3. storage: store information in key value pairs. have a function that runs when storage is needing to get fetched
function getLocalStorage(lists) {
  let data;
  if (localStorage.getItem(lists)) {
    data = JSON.parse(localStorage.getItem(lists));
  }
  return data;
}
//function when setting local storage
function setLocalStorage(variable, lists) {
  localStorage.setItem(variable, JSON.stringify(lists));
}

// 5. create a list that will upon pressing enter or click, add list item. then it will clear the input field. adds the properties like title, id, etc, and appends to list array. make lists array of objects into HTML and identifies which list is selected using an ID. clears the lists container input field
function clearElement(element) {
  element.innerHTML = "";
}

function render() {
  clearElement(listsContainer);
  // console.log("render function called");
  lists.forEach((list) => {
    // console.log("new list created");
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id;
    listElement.classList.add("list-title");
    listElement.innerText = list.title;
    listsContainer.appendChild(listElement);
  });
}
render();

// 5. when the user clicks on a list, it becomes the active list. When that happens, we find the list title that matches the innertext of the list item.  the list title is now changed to the active list title. The todos are now for that list title.
function selectList(e) {
  if (e.target.classList.contains("list-title")) {
    clearActiveLists();
    setActiveList(e.target);
    renderActiveList();
    updateDisplay();
  }
}

function clearActiveLists() {
  const listItems = document.querySelectorAll(".list-title");
  listItems.forEach((item) => item.classList.remove("active-list"));
}

function setActiveList(listItem) {
  listItem.classList.add("active-list");
  // const activeListItem = listItem.innerText;
  // console.log(activeListItem, " is the active list");
}

function renderActiveList() {
  // console.log("activeList function is working")
  const todoContainer = document.querySelector("[data-todo-list-container]");
  const activeListItem = document.querySelector(".active-list");
  if (activeListItem) {
    const selectListTitle = activeListItem.innerText;
    const selectList = lists.find((list) => list.title === selectListTitle);
    if (selectList) {
      todoContainer.style.display = "block";
      const listId = selectList.id;
      const displayTitle = document.querySelector("[data-list-title]");
      displayTitle.innerText = selectListTitle;
    } else {
      todoContainer.style.display = "none";
    }
  }
}

// show the todo container if list is active
function updateDisplay() {
  // console.log(todoContainer, "todo container");
  // console.log(lists.length, "li length");
  // if (lists.length !== 0) {
  //   renderActiveList();
  //   todoContainer.style.display = "block";
  // } else {
  //   todoContainer.style.display = "none";
  // }
}
updateDisplay();

// 1. create a todo item that is related to the parent list
// create the todo item data is stored in an object
// todos are going to be objects that are dynamically created using either factories or constructor/classes
function createTodo() {
  console.log("creating todo item");
  lists.forEach((listItem) => {
    // loop through the information added by the user and add to the object
    const todoElement = document.createElement("li");
    todoElement.innerText = listItem;
    //       id: 1.1,
    //       title: "todo 1",
    //       description: "type your description here",
    //       dueDate: "date",
    //       priority: "low priority",
    //     },
    // object add title, desc, duedate, priority, notes
  });
}

// 1. create a funtion that will render the list by pushing the new object into the array
function renderTodo() {
  console.log(lists);
  // push to list
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
function deleteList() {
  // console.log("deleteList");
  // if (renderActiveList()) {
  //   const listId = activeList.id;
  //   lists = lists.filter((list) => list.id !== listId);
  //   render();
  // }
}

(function () {
  const delBtn = document.querySelector("[data-del-btn]");
  delBtn.addEventListener("click", deleteList);
})();

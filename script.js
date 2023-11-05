//next steps = pseudocode out the connection between the lists and the todos. how does that work?
// --the list does not to have any html prebuilt lists and todos on page load. Right now its all click based.
// -- when the user clicks on a list, it becomes the active list. When that happens the list title is now changed to the active list title. The todos are now for that list title.
// 11/4 1.5 hours to try draw out visually what I want to do.

// also, how does the add todo items work?

// variables will be contained inside the functions themselves

const listsContainer = document.querySelector("[data-lists]");
const addBtn = document.querySelector(".create");
const listItems = document.querySelectorAll(".list-title");
const newListForm = document.querySelector("[data-new-list-form]");
const newListInput = document.querySelector("[data-new-list-input]");


// 5. grab the new list form on submit and run a function that creates a new list.
// prevent refresh of page on submit. extract the value from the input field to a variable, if value is blank return.
// create the list object by running a sepereate function. reset the input field. push the new list to the list array.
// update the list in the dom.
newListForm.addEventListener("submit", handleListSubmit);

function handleListSubmit(e) {
  e.preventDefault();
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

// 4. grab the list name and delete the list along with all its associated todo items
// TODO:
function deleteList() {
  console.log("deleteObject");
  if ((listsContainer.classList = "active-list")) {
    listsContainer.remove("title");
  }
  render();
}

function deleteButton() {
  const delBtn = document.querySelector("data-del-btn");
  delBtn.textContent = "Delete List";
  delBtn.addEventListener("click", deleteList);
  return delBtn;
}

// 5. properties of list: (object)
const lists = [
  // {
  //   id: 1,
  //   title: "todo example 1",
  //   todos: [
  //     {
  //       id: 1.1,
  //       title: "todo 1",
  //       description: "type your description here",
  //       dueDate: "date",
  //       priority: "low priority",
  //     },
  //   ],
  // },
  // {
  //   id: 2,
  //   title: "todo example 2",
  //   todos: [
  //     {
  //       id: 2.1,
  //       title: "todo 1",
  //       description: "type your description here",
  //       dueDate: "date",
  //       priority: "low priority",
  //     },
  //   ],
  // },
];

// store information in keys. have a function that runs when storage is needing to get fetched
function getLocalStorage(lists) {
  let data;
  if (localStorage.getItem(lists)) {
    data = JSON.parse(localStorage.getItem(variable));
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
  console.log("render function called");
  lists.forEach((list) => {
    console.log("new list created");
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id;
    listElement.classList.add("list-title");
    listElement.innerText = list.title;
    listsContainer.addEventListener("click", selectList);
    listsContainer.appendChild(listElement);
  });
}
render();

// 5. when the user clicks on a list, it becomes the active list. When that happens, we find the list title that matches the innertext of the list item.  the list title is now changed to the active list title. The todos are now for that list title.
function selectList(e) {
  if (e.target.classList.contains("list-title")) {
    listItems.forEach((item) => item.classList.remove("active-list"));
    const activeList = e.target.innerText;
    e.target.classList.add("active-list");
    console.log(activeList, "is selected");
  }
  updateDisplay();
}

function updateDisplay() {
  const activeList = document.querySelector(".active-list");
  if (activeList) {
    const selectListTitle = activeList.innerText;
    const selectList = lists.find((list) => list.title === selectListTitle);
    if (selectList) {
      const listId = selectList.id;
      console.log("List ID:", listId);
    }
  }
}

// 1. create a todo item that is related to the parent list
// create the todo item data is stored in an object
// todos are going to be objects that are dynamically created using either factories or constructor/classes
function createTodo() {
  console.log("creating todo item");
  listArray.forEach((listItem) => {
    // loop through the information added by the user and add to the object
    const todoElement = document.createElement("li");
    todoElement.innerText = listItem;
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

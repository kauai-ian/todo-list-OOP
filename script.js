//next steps = pseudocode out the connection between the lists and the todos. how does that work? 
// --the list does not to have any html prebuilt lists and todos on page load. Right now its all click based. 
// -- when the user clicks on a list, it becomes the active list. When that happens the list title is now changed to the active list title. The todos are now for that list title. 




// also, how does the add todo items work? 










// variables will be contained inside the functions themselves
// todos are going to be objects that are dynamically created using either factories or constructor/classes

const listsContainer = document.querySelector("[data-lists]");
const addBtn = document.querySelector(".create");
const delBtn = document.querySelector("[data-del-btn]");
const newListForm = document.querySelector("[data-new-list-form]");
const newListInput = document.querySelector("[data-new-list-input]");

// delete a list if clicked
// delBtn.addEventListener("click", () => {
//   deleteList();
// });

// grab the new list form on submit and run a function that creates a new list.
// prevent refresh of page on submit. extract the value from the input field to a variable, if value is blank return.
// create the list object by running a sepereate function. reset the input field. push the new list to the list array.
// update the list in the dom.
newListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const listTitle = newListInput.value.trim();
  console.log(listTitle, "is the listTitle");
  if (listTitle === null || listTitle === "") return;
  const list = newList(listTitle);
  newListInput.value = null;
  lists.push(list);
  render();
});

// create a new list that returns an object.
// this will assign the id and the title of the list
function newList(title) {
  return {
    id: Date.now().toString(),
    title: title,
    todos: [],
  };
}

// grab the list name and delete the list along with all its associated todo items
function deleteList() {}

// properties of todo list: (object)
const lists = [
  {
    id: 1,
    title: "todo example",
    description: "type your description here",
    dueDate: "date",
    priority: "low priority",
    notes: "type notes here",
  },
  {
    id: 2,
    title: "todo example 2",
    description: "type your description here",
    dueDate: "date",
    priority: "low priority",
    notes: "type notes here",
  },
];

// create a list that will upon pressing enter or click, add list item
// then it will clear the input field.
// adds the properties like title, id, etc, and appends to list array
// make lists array of objects into HTML and identifies which list is selected using an ID
function render() {
  clearElement(listsContainer);
  console.log("render function called");
  lists.forEach((list) => {
    console.log("new list created");
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id;
    listElement.classList.add("list-title");
    listElement.innerText = list.title;
    listsContainer.appendChild(listElement);
  });
}

// clears the lists container input field
function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// create a todo item that is related to the parent list
// create the todo item data is stored in an object
function createTodo() {
  console.log("creating todo item");
  listArray.forEach((listItem) => {
    // loop through the information added by the user and add to the object
    const todoElement = document.createElement("li");
    todoElement.innerText = listItem;
    // object add title, desc, duedate, priority, notes
  });
}

// create a funtion that will render the list by pushing the new object into the array
function renderList() {
  console.log(lists);
  // push to list
}

// default todo list that all todos are added to

// user can create new lists of projects
// user can choose which list of projects their todos go into

// seperation of application logic from DOM-related stuff
// creating todos
// setting todos as complete
// changing todo priority

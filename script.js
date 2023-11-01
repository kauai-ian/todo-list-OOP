// variables will be contained inside the functions themselves
// todos are going to be objects that are dynamically created using either factories or constructor/classes



const listContainer = document.querySelector('[data-lists]') 
const addBtn = document.querySelector(".create")
const clearBtn = document.querySelector('[data-clearBtn]')

// clearBtn.addEventListener('click', () => {
//     clearElement()
// })


// properties of todo list: (object)
// seperate lists of projects using an array of objects. 
// const listArray = [{
//     id: 1,
//     title: "todo example",
//     description: "type your description here",
//     dueDate: "date",
//     priority: "low priority",
//     notes: "type notes here",
// }]
const listArray = []

// create a list that will upon pressing enter, add list item
// then it will clear the input field.
// clear and then adds a class to it of list name, and appends to list array

function createList() {
    debugger
    console.log('createlist function called')
    listArray.forEach(list => { // havent figured out how to get this parameter to work. Not sure how to phrase the problem. 
        console.log('new list item created')
        const listElement = document.createElement('li')
        listElement.classList.add("list-name")
        listElement.innerText = list;
        listElement.id = Date.now();
        listArray.push(list)
        listContainer.appendChild(listElement)
       
    });
    
    renderList()
} 
//next step is figure out why this function is not creating the list element upon form submission. 


// create a button that will clear an element when clicked. Also removes everything assocaited with that element. Could be interchangable between lists and list elements.
function clearElement(element) {
    element.children.remove
    element.parent.remove;
// remove any children
// remove the parent list item 
// render the lists
}

// create a todo item that is related to the parent list
// create the todo item data is stored in an object
function createTodo() {
    console.log('creating todo item')
    listArray.forEach(listItem => {  // loop through the information added by the user and add to the object
        const todoElement = document.createElement('li')
        todoElement.innerText = listItem;
        // object add title, desc, duedate, priority, notes
    })
}


// create a funtion that will render the list by pushing the new object into the array 
function renderList() {
    
    console.log(listArray)
    // push to list 
}

// default todo list that all todos are added to 


// user can create new lists of projects
// user can choose which list of projects their todos go into

// seperation of application logic from DOM-related stuff
// creating todos
// setting todos as complete
// changing todo priority
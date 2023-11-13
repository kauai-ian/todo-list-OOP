export default class ModelList {
  constructor() {
    this.lists = this.getLocalStorage("listsKey") || [
      {
        id: 1,
        title: "ProjectA",
        todos: [],
      },
      { id: 2, title: "ProjectB", todos: [] },
    ];
    //fill this in later after todos working.
    // {id: 111220231036, title: "todo1", complete: false, }
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

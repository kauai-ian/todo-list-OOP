export default class ModelList {
  constructor() {
    this.lists = this.getLocalStorage("listsKey") || [
      { id: 1, title: "Inbox", todos: [] },
    ];
    this.activeListId = 1;
  }
  bindListChanged(callback) {
    this.onChange = callback; // create a callback to the controller.
  }
  newList(title) {
    const list = {
      id: Date.now(),
      title: title,
      todos: [],
    };
    this.lists.push(list); 
    this.onChange(this.lists); // render the lists
    this.save();
  }

  getActiveList() {
    return this.lists.find((list) => list.id === this.activeListId); // returns a match
  }

  switchLists(id) {
    this.activeListId = id; 
    this.onChange(this.lists);
  }

  deleteList(id) {
    this.lists = this.lists.filter((list) => list.id !== parseInt(id));
    //if active list is the one deleted, reset 
    if(this.activeListId === parseInt(id)) {
      this.activeListId = 1
    }
    this.onChange(this.lists);
    this.save();
  }

  getLocalStorage(key) {
    let data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  save() {
    this.onChange(this.lists);
    localStorage.setItem("todos", JSON.stringify(this.lists));
  }
}

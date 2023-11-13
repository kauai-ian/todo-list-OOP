export default class ModelTodo {
  constructor(modelList) {
    this.modelList = modelList;
  }

  newTodo(title) {
    // loop over lists, find list matching id, list.add todo
    console.log(this)
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

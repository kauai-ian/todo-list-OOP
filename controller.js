import ModelTodo from "./model-todo.js";
import ModelList from "./model-list.js";
import ViewList from "./view-list.js";
import ViewTodo from "./view-todo.js";

class Controller {
  constructor(modelList, modelTodo, viewList, viewTodo) {
    this.modelList = modelList;
    this.modelTodo = modelTodo;
    this.viewList = viewList;
    this.viewTodo = viewTodo;

    //explicit this binding
    this.viewList.bindDeleteList(this.handleDeleteList);
    this.viewList.renderList(this.handleRenderList);
    this.viewTodo.renderTodos(this.handleRenderTodos);
    this.viewTodo.bindTodoSubmit(this.handleAddTodo);
    this.viewTodo.bindDeleteTodo(this.handleDeleteTodo);
    this.viewTodo.bindToggleTodo(this.handleToggleTodo);
    this.viewList.addListHandler(this.handleAddList);
    this.viewList.bindSwitchLists(this.handleSwitchLists);
    this.viewTodo.bindClearCompleted(this.handleClearCompleted);

    //display todos on page load
    this.onChange(this.modelList.lists);
    this.modelList.bindListChanged(this.onChange);
  }
  onChange = () => {
    const lists = this.modelList.lists;
    const activeList = this.modelList.getActiveList();
    const todos = activeList ? activeList.todos : [];
    this.viewList.renderList(lists);
    this.viewTodo.renderTodos(this.handleRenderTodos);
  };
  // handlers for callbacks
  handleAddList = (listTitle) => {
    this.modelList.newList(listTitle);
  };
  handleAddTodo = (todoTitle) => {
    const activeList = this.modelList.getActiveList();
    this.modelTodo; //set the model list because its not being constructed yet.
    this.modelTodo.newTodo(todoTitle);
    return activeList.todos;
  };
  handleRenderList = () => {
    const activeList = this.modelList.getActiveList();
    this.modelList;
    this.modelList.renderList();
    return activeList.todos;
  };
  handleRenderTodos = () => {
    const activeList = this.modelList.getActiveList();
    return activeList.todos;
  };
  handleDeleteList = (id) => {
    this.modelList.deleteList(id);
  };
  handleDeleteTodo = (id) => {
    this.modelTodo.deleteTodo(id);
  };
  handleToggleTodo = (id) => {
    this.modelTodo.toggleTodo(id);
  };
  handleSwitchLists = (id) => {
    this.modelList.switchLists(id);
  };
  handleClearCompleted = () => {
    this.modelTodo.clearCompletedTodos();
  };
}
const modelList = new ModelList();
const modelTodo = new ModelTodo(modelList);
const viewList = new ViewList(modelList);
const viewTodo = new ViewTodo();

// console.log({ modelTodo, viewList, viewTodo, modelList });
const app = new Controller(modelList, modelTodo, viewList, viewTodo);

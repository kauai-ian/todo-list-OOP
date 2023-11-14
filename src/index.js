import ModelTodo from "./model-todo.js";
import ModelList from "./model-list.js";
import ViewList from "./view-list.js";
import ViewTodo from "./view-todo.js";
import Controller from "./controller";
import "./style.css";

const modelList = new ModelList();
const modelTodo = new ModelTodo(modelList);
const viewList = new ViewList(modelList);
const viewTodo = new ViewTodo();

// console.log({ modelTodo, viewList, viewTodo, modelList });
const app = new Controller(modelList, modelTodo, viewList, viewTodo);

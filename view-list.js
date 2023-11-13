// descrutured: unpacks objects into variables - saves time down the road
import { createElement, getElement } from "./helpers.js";

export default class ViewList {
  constructor() {
    this.listsContainer = document.querySelector("[data-lists]");
    this.newListForm = document.querySelector("[data-new-list-form]");
    this.delBtn = document.querySelector("[data-del-btn]");
    this.newListForm.addEventListener("submit", (e) => this.addList(e));
  }

  // shows the lists from the modelList
  renderList(lists) {
    // console.log(lists);
    while (this.listsContainer.firstChild) {
      this.listsContainer.removeChild(this.listsContainer.firstChild);
    }
    if (lists.length === 0) {
      const p = createElement("p");
      p.textContent = "Make a list first to add a todo";
      this.listsContainer.append(p);
    } else {
      lists.forEach((list) => {
        const listElement = document.createElement("li");
        listElement.id = list.id;
        listElement.classList.add("list-title");
        listElement.innerText = list.title;
        const deleteListButton = createElement("button", "delete-list");
        deleteListButton.textContent = "Delete";
        this.listsContainer.appendChild(listElement);
      });
    }
  }
  // add a function that will be called by an event listener to get the form data
  // pass that function to the controller so that it can run in the model
  addList(e) {
    e.preventDefault();
    console.log("list submitted");
    const newListInput = document.querySelector("[data-new-list-input]");
    const listTitle = newListInput.value.trim();
    if (listTitle === null || listTitle === "") return;
    newListInput.value = null;
    this.helper(listTitle);
  }

  // add a list handler that takes a call back to set this.handler to the callback
  addListHandler(callback) {
    this.helper = callback;
  }

  deleteList(handler) {
    this.listsContainer.addEventListener("click", (e) => {
      if (e.target.className === "delete") {
        const id = parseInt(e.target.parentElement.id);
        handler(id);
      }
    });
  }
  // do we need a callback for delete list?
  // addDeleteHandler(callback) {
  //   this.helper = callback
  // }
}

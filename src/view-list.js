// descrutured: unpacks objects into variables - saves time down the road
import { createElement, getElement } from "./helpers.js";

export default class ViewList {
  constructor(modelList) {
    this.modelList = modelList;
    this.listsContainer = getElement("[data-lists]");
    this.newListForm = getElement("[data-new-list-form]");
    this.delBtn = getElement("[data-del-btn]");
    this.newListForm.addEventListener("submit", (e) => this.addList(e));
  }
  clearElement(element) {
    element.innerHTML = "";
  }
  // shows the lists from the modelList
  renderList(lists) {
    const activeList = this.modelList.getActiveList();
    const activeListId = activeList.id;
    console.log(activeListId);
    this.clearElement(this.listsContainer);
    if (lists.length === 0) {
      const p = createElement("p");
      p.textContent = "Make a list first to add a todo";
      this.listsContainer.append(p);
    } else {
      lists.forEach((list) => {
        const li = document.createElement("li");
        li.id = list.id;
        li.innerText = list.title;
        li.classList.add("list-name");
        if (list.id === activeListId) {
          li.classList.add("active-list");
        }

        //delete button
        if (list.id !== 1) {
          const deleteListButton = createElement("button", "delete-list");
          deleteListButton.textContent = "Delete";
          li.append(deleteListButton);
        }
        this.listsContainer.appendChild(li);
      });
    }
    this.updateActiveListTitle();
  }
  // add a function that will be called by an event listener to get the form data
  // pass that function to the controller so that it can run in the model
  addList(e) {
    e.preventDefault();
    const newListInput = getElement("[data-new-list-input]");
    const listTitle = newListInput.value.trim();
    if (listTitle === null || listTitle === "") return;
    newListInput.value = null;
    this.helper(listTitle);
  }

  // add a list handler that takes a call back to set this.handler to the callback
  addListHandler(callback) {
    this.helper = callback;
  }

  bindDeleteList(handler) {
    this.listsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-list")) {
        const id = parseInt(e.target.parentElement.id);
        handler(id);
      }
    });
  }

  bindSwitchLists(handler) {
    this.listsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("list-name")) {
        const activeListId = parseInt(e.target.id);
        handler(activeListId);
        this.updateActiveListClass(activeListId);
      }
    });
  }

  updateActiveListClass(activeListId) {
    const listItems = this.listsContainer.querySelectorAll(".list-name");
    listItems.forEach((item) => {
      item.classList.toggle("active-list", item.id === activeListId);
    });
  }

  updateActiveListTitle() {
    const activeList = this.modelList.getActiveList();
    const listTitleElement = getElement(".list-title");
    if (activeList && listTitleElement) {
      listTitleElement.innerText = activeList.title;
    }
  }
}

(()=>{"use strict";var t={426:(t,e,n)=>{n.d(e,{Z:()=>r});var i=n(81),o=n.n(i),s=n(645),d=n.n(s)()(o());d.push([t.id,'body {\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  min-width: 375px;\n  width: auto;\n  background: linear-gradient(\n    90deg,\n    rgba(191, 57, 137, 1) 10%,\n    rgba(9, 107, 222, 1) 70%\n  );\n  justify-content: space-between;\n  font-family: arial, serif;\n  font-size: 0.8rem;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n.active-list {\n  font-weight: 800;\n  color: white;\n}\n\n.hidden {\n  display: none;\n}\n\nsection {\n  margin: 10px;\n}\n\nh1 {\n  font-size: 3rem;\n  font-family: "Arial Narrow Bold", sans-serif;\n  color: white;\n  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.7));\n  font-weight: 600;\n  font-stretch: extra-condensed;\n}\n\nform {\n  display: flex;\n  margin-bottom: 2rem;\n}\n\ninput {\n  background-color: #ffffff69;\n  color: rgba(255, 255, 255, 0.512);\n}\n\n::placeholder {\n  color: white;\n  font-style: italic;\n}\n\n[type="text"],\nbutton {\n  display: inline-block;\n  padding: 0.5rem 1rem;\n  font-size: 0.8rem;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\nbutton {\n  cursor: pointer;\n  background: #777777;\n  color: white;\n  margin: 0 0.5rem;\n}\n\n[type="text"] {\n  width: 100%;\n}\n\n[type="text"]:active,\n[type="text"]:focus {\n  outline: 0;\n  border: 2px solid #007bff;\n}\n\n[type="checkbox"] {\n  margin-right: 1rem;\n  font-size: 2rem;\n}\n\nul {\n  padding: 0;\n}\n\nli {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.5rem;\n  margin-bottom: 1rem;\n  background: #7777778b;\n  border-radius: 5px;\n  color: white;\n}\n\nli span {\n  flex: 1;\n  display: inline-block;\n  padding: 0.5rem;\n  width: 250px;\n  border-radius: 5px;\n}\nli span:hover {\n  background: rgba(179, 215, 255, 0.52);\n}\n\nli span:focus {\n  outline: 0;\n  border: 2px solid #007bff;\n  background: rgba(179, 207, 255, 0.52);\n}\n\nfooter {\n  background-color: rgba(173, 216, 230, 0.274);\n  padding: 20px;\n  width: 100vw;\n}\n\n.footerContainer {\n  display: flex;\n  justify-content: center;\n}\n\n.footerContainer a {\n  text-decoration: none;\n  color: white;\n  display: flex;\n  gap: 2rem;\n}\n\n.footerContainer p {\n  color: white;\n}\n',""]);const r=d},645:t=>{t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",i=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),i&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),i&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,i,o,s){"string"==typeof t&&(t=[[null,t,void 0]]);var d={};if(i)for(var r=0;r<this.length;r++){var a=this[r][0];null!=a&&(d[a]=!0)}for(var l=0;l<t.length;l++){var c=[].concat(t[l]);i&&d[c[0]]||(void 0!==s&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=s),n&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=n):c[2]=n),o&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=o):c[4]="".concat(o)),e.push(c))}},e}},81:t=>{t.exports=function(t){return t[1]}},379:t=>{var e=[];function n(t){for(var n=-1,i=0;i<e.length;i++)if(e[i].identifier===t){n=i;break}return n}function i(t,i){for(var s={},d=[],r=0;r<t.length;r++){var a=t[r],l=i.base?a[0]+i.base:a[0],c=s[l]||0,h="".concat(l," ").concat(c);s[l]=c+1;var p=n(h),u={css:a[1],media:a[2],sourceMap:a[3],supports:a[4],layer:a[5]};if(-1!==p)e[p].references++,e[p].updater(u);else{var m=o(u,i);i.byIndex=r,e.splice(r,0,{identifier:h,updater:m,references:1})}d.push(h)}return d}function o(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,o){var s=i(t=t||[],o=o||{});return function(t){t=t||[];for(var d=0;d<s.length;d++){var r=n(s[d]);e[r].references--}for(var a=i(t,o),l=0;l<s.length;l++){var c=n(s[l]);0===e[c].references&&(e[c].updater(),e.splice(c,1))}s=a}}},569:t=>{var e={};t.exports=function(t,n){var i=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}},216:t=>{t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,n)=>{t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:t=>{t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var i="";n.supports&&(i+="@supports (".concat(n.supports,") {")),n.media&&(i+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(i+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),i+=n.css,o&&(i+="}"),n.media&&(i+="}"),n.supports&&(i+="}");var s=n.sourceMap;s&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),e.styleTagTransform(i,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(i){var o=e[i];if(void 0!==o)return o.exports;var s=e[i]={id:i,exports:{}};return t[i](s,s.exports,n),s.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nc=void 0,(()=>{class t{constructor(t){this.modelList=t}newTodo(t){console.log(this);const e=this.modelList.getActiveList();if(e){const n={id:Date.now().toString(),title:t,complete:!1};e.todos.push(n),this.modelList.save()}else console.log("no active list selected--newTodo")}deleteTodo(t){const e=this.modelList.getActiveList();e?(e.todos=e.todos.filter((e=>e.id!==t)),this.modelList.save()):console.log("no active list selected--deleteTodo")}toggleTodo(t){const e=this.modelList.getActiveList();e?(e.todos=e.todos.map((e=>e.id===t?{...e,complete:!e.complete}:e)),this.modelList.save()):console.log("no active list selected--toggleTodo")}clearCompletedTodos(){const t=this.modelList.getActiveList();if(t){const e=t.todos.filter((t=>!t.complete));t.todos=e,this.modelList.save()}}}class e{constructor(){this.lists=this.getLocalStorage("listsKey")||[{id:1,title:"Inbox",todos:[]}],this.activeListId=1}bindListChanged(t){this.onChange=t}newList(t){const e={id:Date.now(),title:t,todos:[]};this.lists.push(e),this.onChange(this.lists),this.save()}getActiveList(){return this.lists.find((t=>t.id===this.activeListId))}switchLists(t){this.activeListId=t,this.onChange(this.lists)}deleteList(t){this.lists=this.lists.filter((e=>e.id!==parseInt(t))),this.activeListId===parseInt(t)&&(this.activeListId=1),this.onChange(this.lists),this.save()}getLocalStorage(t){let e=localStorage.getItem(t);return e?JSON.parse(e):null}save(){this.onChange(this.lists),localStorage.setItem("listsKey",JSON.stringify(this.lists))}}function i(t,e){const n=document.createElement(t);return e&&n.classList.add(e),n}function o(t){return document.querySelector(t)}class s{constructor(t){this.modelList=t,this.listsContainer=o("[data-lists]"),this.newListForm=o("[data-new-list-form]"),this.delBtn=o("[data-del-btn]"),this.newListForm.addEventListener("submit",(t=>this.addList(t)))}clearElement(t){t.innerHTML=""}renderList(t){const e=this.modelList.getActiveList().id;if(console.log(e),this.clearElement(this.listsContainer),0===t.length){const t=i("p");t.textContent="Make a list first to add a todo",this.listsContainer.append(t)}else t.forEach((t=>{const n=document.createElement("li");if(n.id=t.id,n.innerText=t.title,n.classList.add("list-name"),t.id===e&&n.classList.add("active-list"),1!==t.id){const t=i("button","delete-list");t.textContent="Delete",n.append(t)}this.listsContainer.appendChild(n)}));this.updateActiveListTitle()}addList(t){t.preventDefault();const e=o("[data-new-list-input]"),n=e.value.trim();null!==n&&""!==n&&(e.value=null,this.helper(n))}addListHandler(t){this.helper=t}bindDeleteList(t){this.listsContainer.addEventListener("click",(e=>{if(e.target.classList.contains("delete-list")){const n=parseInt(e.target.parentElement.id);t(n)}}))}bindSwitchLists(t){this.listsContainer.addEventListener("click",(e=>{if(e.target.classList.contains("list-name")){const n=parseInt(e.target.id);t(n),this.updateActiveListClass(n)}}))}updateActiveListClass(t){this.listsContainer.querySelectorAll(".list-name").forEach((e=>{e.classList.toggle("active-list",e.id===t)}))}updateActiveListTitle(){const t=this.modelList.getActiveList(),e=o(".list-title");t&&e&&(e.innerText=t.title)}}class d{constructor(t){this.modelList=t,this.newTodoForm=o("[data-new-todo-form]"),this.todoList=o("[data-todo-list]"),this.delBtn=o(".delete")}clearElement(t){t.innerHTML=""}renderTodos(t){const e=t();this.clearElement(this.todoList),e.forEach((t=>{const e=i("li");e.id=t.id,e.classList.add("todo-item");const n=i("input");n.type="checkbox",n.checked=t.complete;const o=i("span");if(o.contentEditable=!0,o.classList.add("editable"),t.complete){const e=i("s");e.innerText=t.title,o.append(e)}else o.innerText=t.title;const s=i("button","delete-todo");s.textContent="Delete",e.append(n,o,s),this.todoList.appendChild(e)}))}bindTodoSubmit(t){this.newTodoForm.addEventListener("submit",(e=>{e.preventDefault();const n=o("[data-new-todo-input]"),i=n.value.trim();null!==i&&""!==i&&(t(i),n.value=null)}))}bindToggleTodo(t){this.todoList.addEventListener("change",(e=>{if("checkbox"===e.target.type){const n=e.target.parentElement.id;t(n)}}))}bindDeleteTodo(t){this.todoList.addEventListener("click",(e=>{if("delete-todo"===e.target.className){const n=e.target.parentElement.id;t(n)}}))}bindClearCompleted(t){const e=o("[data-clear-compl-btn]");e&&e.addEventListener("click",t)}}class r{constructor(t,e,n,i){this.modelList=t,this.modelTodo=e,this.viewList=n,this.viewTodo=i,this.viewList.bindDeleteList(this.handleDeleteList),this.viewList.renderList(this.handleRenderList),this.viewTodo.renderTodos(this.handleRenderTodos),this.viewTodo.bindTodoSubmit(this.handleAddTodo),this.viewTodo.bindDeleteTodo(this.handleDeleteTodo),this.viewTodo.bindToggleTodo(this.handleToggleTodo),this.viewList.addListHandler(this.handleAddList),this.viewList.bindSwitchLists(this.handleSwitchLists),this.viewTodo.bindClearCompleted(this.handleClearCompleted),this.onChange(this.modelList.lists),this.modelList.bindListChanged(this.onChange)}onChange=()=>{const t=this.modelList.lists,e=this.modelList.getActiveList();e&&e.todos,this.viewList.renderList(t),this.viewTodo.renderTodos(this.handleRenderTodos)};handleAddList=t=>{this.modelList.newList(t)};handleAddTodo=t=>{const e=this.modelList.getActiveList();return this.modelTodo,this.modelTodo.newTodo(t),e.todos};handleRenderList=()=>{const t=this.modelList.getActiveList();return this.modelList,this.modelList.renderList(),t.todos};handleRenderTodos=()=>this.modelList.getActiveList().todos;handleDeleteList=t=>{this.modelList.deleteList(t)};handleDeleteTodo=t=>{this.modelTodo.deleteTodo(t)};handleToggleTodo=t=>{this.modelTodo.toggleTodo(t)};handleSwitchLists=t=>{this.modelList.switchLists(t)};handleClearCompleted=()=>{this.modelTodo.clearCompletedTodos()}}const a=new e;new r(a,new t(a),new s(a),new d);var l=n(379),c=n.n(l),h=n(795),p=n.n(h),u=n(569),m=n.n(u),f=n(565),g=n.n(f),v=n(216),L=n.n(v),b=n(589),w=n.n(b),T=n(426),y={};y.styleTagTransform=w(),y.setAttributes=g(),y.insert=m().bind(null,"head"),y.domAPI=p(),y.insertStyleElement=L(),c()(T.Z,y),T.Z&&T.Z.locals&&T.Z.locals;const x=new e;new r(x,new t(x),new s(x),new d)})()})();
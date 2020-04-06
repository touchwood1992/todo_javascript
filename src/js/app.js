import allElements from "./views/allElements";
import { showLoad, hideLoad } from "./views/commonView";
import {
  getInputValue,
  clearInputValue,
  enableBtn,
  disableBtn,
  addTaskBtnHTML,
  UpdateTodoTextValue,
} from "./views/addtaskView";
import { resetAlltodos, showAlltodos } from "./views/listtasksView";
import TaskModel from "./models/Tasks";
import {
  storeToLocalStoage,
  getLocalStoage,
  updateLocalSroge,
  removeLocalStorage,
} from "./models/Tasks";

const demoObj = new TaskModel(5000, "ram");

let state = getLocalStoage();

//get all todos now with sync in localstorage
const syncstorage = () => {
  state = getLocalStoage();
};

//Initially set values
document.addEventListener("DOMContentLoaded", init);
function init() {
  //Initially set task label
  addTaskBtnHTML("Add Todo");
  //Reset if no element is there...
  state.allTodos.length === 0 ? resetAlltodos(true) : resetAlltodos();
  //Clear text field value
  clearInputValue();
  //Load all todos from localStorage
  if (state.allTodos.length > 0) {
    showAlltodos(state.allTodos);
  }
}

//Adding Task
allElements.addTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTaks();
});

const addTaks = () => {
  //Get value of textbox
  const inputValue = getInputValue();
  //Check for empty value
  if (inputValue === "") {
    alert("Please insert value");
    return false;
  }

  //Show loader
  showLoad(allElements.addTaskForm);
  //disable BTN
  disableBtn();

  if (state.currenttoDo) {
    //Update to model
    demoObj.updateValues.call(state.currenttoDo, inputValue);

    state.currenttoDo = null;

    //Update local storage
    updateLocalSroge(state);

    //Resetting state now
    init();
  } else {
    //Add to Model
    const id =
      state.allTodos.length > 0
        ? state.allTodos[state.allTodos.length - 1].id + 1
        : 1;

    const newObj = new TaskModel(id, inputValue);
    //state.allTodos.push(newObj);
    storeToLocalStoage(newObj);
    syncstorage();
  }

  //Remove all todos from UI . Resetting it
  resetAlltodos();
  //Show to ui
  showAlltodos(state.allTodos);
  //Hide loader
  setTimeout(() => {
    hideLoad(allElements.addTaskForm.className);
    //Enable BTN
    enableBtn();
  }, 500);

  //Clear field
  clearInputValue();
};

//Clear all tasks
allElements.clearTasks.addEventListener("click", () => {
  if (confirm("Are you sure?")) {
    state.allTodos = [];
    resetAlltodos(true);
    removeLocalStorage(true);
    init();
  }
});

//Remove TODO and Edit todo
allElements.allTaskContainer.addEventListener("click", (e) => {
  const parentElement = e.target.parentElement;
  if (parentElement.classList.contains("remove-item")) {
    e.preventDefault();
    removeTodo(parentElement.dataset.id);
  } else if (parentElement.classList.contains("edit-item")) {
    e.preventDefault();
    updateTodo(parentElement.dataset.id);
  }
});

// Remove TODO From UI
const removeTodo = (id) => {
  //Remove todo from localstorage
  removeLocalStorage(parseInt(id));
  syncstorage();
  //Reset all todos
  // state.allTodos.length === 0 ? resetAlltodos(true) : resetAlltodos();
  //Show all remained todos
  showAlltodos(state.allTodos);
  init();
};

// update to TODO in UI
const updateTodo = (id) => {
  //Update label of button
  addTaskBtnHTML("Update Todo");
  //Set edit todo into state
  state.currenttoDo =
    state.allTodos[state.allTodos.findIndex((el) => el.id === parseInt(id))];
  //Set todo into form
  UpdateTodoTextValue(state.currenttoDo);
};

//Filter task

allElements.filterClass.addEventListener("keyup", a);
function a(e) {
  const filterValue = e.target.value;
  if (state.allTodos.length > 0) {
    const filterArray = state.allTodos.filter((el) => {
      return el.name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1;
    });
    if (filterArray.length > 0) {
      resetAlltodos();
      showAlltodos(filterArray);
    } else {
      resetAlltodos(true);
    }
  }
}
window.getState = () => state;

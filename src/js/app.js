import allElements from "./views/allElements";
import { showLoad, hideLoad } from "./views/commonView";
import {
  getInputValue,
  clearInputValue,
  enableBtn,
  disableBtn,
  addTaskBtnHTML,
  UpdateTodoTextValue
} from "./views/addtaskView";
import { resetAlltodos, showAlltodos } from "./views/listtasksView";
import TaskModel from "./models/Tasks";

const state = { allTodos: [] };
//Initially set values
document.addEventListener("DOMContentLoaded", init);
function init() {
  //Set current state of what to do
  state.currenttoDo = null;
  //Initially set task label
  addTaskBtnHTML("Add Todo");
  //Reset if no element is there...
  state.allTodos.length === 0 ? resetAlltodos(true) : "";
  //Clear text field value
  clearInputValue();
}
//Adding Task
allElements.addTaskForm.addEventListener("submit", e => {
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

  if (state.currenttoDo !== null) {
    //Update to model
    state.currenttoDo.updateValues(inputValue);
    //Resetting state now
    init();
  } else {
    //Add to Model
    const id =
      state.allTodos.length > 0
        ? state.allTodos[state.allTodos.length - 1].id + 1
        : 1;

    state.allTodos.push(new TaskModel(id, inputValue));
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
  }
});

//Remove TODO and Edit todo

allElements.allTaskContainer.addEventListener("click", e => {
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
const removeTodo = id => {
  //Remove Todo From State
  const indexOfTodo = state.allTodos.findIndex(el => el.id === parseInt(id));

  state.allTodos.splice(indexOfTodo, 1);

  //Reset all todos
  state.allTodos.length === 0 ? resetAlltodos(true) : resetAlltodos();
  //Show all remained todos
  showAlltodos(state.allTodos);
  init();
};

// update to TODO in UI
const updateTodo = id => {
  //Update label of button
  addTaskBtnHTML("Update Todo");
  //Set edit todo into state
  state.currenttoDo =
    state.allTodos[state.allTodos.findIndex(el => el.id === parseInt(id))];
  //Set todo into form
  UpdateTodoTextValue(state.currenttoDo);
};

window.getState = () => state;

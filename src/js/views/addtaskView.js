import allElements from "./allElements";

export const getInputValue = () => {
  return allElements.taskInput.value.trim();
};

export const clearInputValue = () => {
  allElements.taskInput.value = "";
};
export const enableBtn = () =>
  allElements.addTaskBtn.removeAttribute("disabled");

export const disableBtn = () =>
  allElements.addTaskBtn.setAttribute("disabled", true);

export const addTaskBtnHTML = text => {
  allElements.addTaskBtn.innerText = text;
};
export const UpdateTodoTextValue = obj => {
  allElements.taskInput.value = obj.name;
};

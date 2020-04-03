import allElements from "./allElements";
export const showLoad = parentEl => {
  const loadingString = `<div class="loading-icon ${allElements.loadingClass}"><img src="images/refresh.svg"></div>`;

  parentEl.insertAdjacentHTML("beforeend", loadingString);
};
export const hideLoad = parentElClass => {
  const loadingelement = document.querySelector(
    `.${parentElClass} .${allElements.loadingClass}`
  );

  loadingelement.parentNode.removeChild(loadingelement);
};

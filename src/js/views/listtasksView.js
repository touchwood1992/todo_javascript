import allElements from "./allElements";
const todoItem = (itm, idx) => {
  const todoRow = `
    <tr>
        <td>
            ${idx + 1}
        </td>
        <td>
            ${itm.name}
        </td>
        <td>
            <a href="javascript:void(0);" class="edit-item" data-id=${itm.id}>
                        <i class="fa fa-pencil text-white" aria-hidden="true"></i>
            </a>
            <a href="javascript:void(0);" class="remove-item ml-3" data-id=${
              itm.id
            }>
                        <i class="fa fa-remove text-danger" aria-hidden="true"></i>
            </a>
        </td>
    </tr>
    `;
  allElements.allTaskContainer.insertAdjacentHTML("beforeend", todoRow);
};
export const showAlltodos = todos => {
  if (todos.length > 0) {
    todos.forEach((item, index) => todoItem(item, index));
  }
};

export const resetAlltodos = (hardreset = false) => {
  let resetHTML;
  if (hardreset === true) {
    resetHTML = `<tr>
        <td colspan="3" class="text-center">No Task Found</td>
      </tr>`;
  } else {
    resetHTML = ``;
  }

  allElements.allTaskContainer.innerHTML = resetHTML;
};

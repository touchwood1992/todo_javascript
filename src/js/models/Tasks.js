export default class TaskModel {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
  updateValues(name) {
    this.name = name;
  }
}


const setLocalStogeValues = (val) => 
{
  localStorage.setItem("alltodos" , JSON.stringify(val));
}

export const getLocalStoage = () => {
    if(localStorage.getItem("alltodos")!== null)
    {
      return JSON.parse(localStorage.getItem("alltodos"));
    }
    else
    {
      return { allTodos: [] };
    }
}


export const storeToLocalStoage = obj => {
  let newState ;

  if(localStorage.getItem("alltodos") === null)
  {
      //create storage
      newState = {allTodos:[obj]};
  }
  else
  {
    //Update Storage    
    newState = JSON.parse(localStorage.getItem("alltodos"));
    newState.allTodos.push(obj);    

  }
  setLocalStogeValues(newState);
}


export const updateLocalSroge  = state => {
  setLocalStogeValues(state);
}

export const removeLocalStorage = id => 
{  

    if(id === true)
    {
      localStorage.removeItem("alltodos")
      return false;
    }


  const allExistingtoDos = JSON.parse(localStorage.getItem("alltodos"));
  
  const RemoveIndex = allExistingtoDos.allTodos.findIndex(el =>  el.id === id);

   if(RemoveIndex !== -1)
   {
     allExistingtoDos.allTodos.splice(RemoveIndex , 1);
   }

   setLocalStogeValues(allExistingtoDos);
}
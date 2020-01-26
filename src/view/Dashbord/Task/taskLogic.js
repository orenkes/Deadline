import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { updateArraysAction } from "../../../state/actions/updateArraysAction";

const tasksArrays = useSelector(state => state.updateArraysReducer);

const todoArray = tasksArrays.todoArray;
const inProgressArray = tasksArrays.inProgressArray;
const completedTasksArray = tasksArrays.completedTasksArray;

const dispatch = useDispatch();

//---UPDATEING DATABASE---///

export const updatingArraysInDataBase = async (
  arrayToRemoveFrom,
  arrayToAddInto
) => {
  const updatedArrays = {
    arrayToRemoveFrom,
    arrayToAddInto
  };

  const putMethod = {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "auth-token": localStorage.getItem("auth-token")
    },
    body: JSON.stringify(updatedArrays) // We send data in JSON format
  };

  await fetch(
    `https://tracker-database.youngwebdevs.now.sh/dashboard/updatingarrays`,
    putMethod
  );
};

export const deletingFromArrayInDataBase = async arrayToRemoveFrom => {
  const updatedArray = {
    arrayToRemoveFrom
  };

  const putMethod = {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "auth-token": localStorage.getItem("auth-token")
    },
    body: JSON.stringify(updatedArray) // We send data in JSON format
  };

  await fetch(
    `https://tracker-database.youngwebdevs.now.sh/dashboard/removetask`,
    putMethod
  );
};

//---UPDATING STATE ARRAYS--//

export const selectChange = (
  arrayToRemoveFrom,
  arrayToAddInto,
  destination,
  deleteTask,
  taskId,
  setCardIsFlipped
) => {
  const selectedTask = _.remove(arrayToRemoveFrom, n => {
    return n.id === taskId;
  });
  console.log("selectedtask: ", selectedTask[0]);

  if (deleteTask === true) {
    setCardIsFlipped(false);
    dispatch(updateArraysAction(arrayToRemoveFrom));
    return;
  }

  const newStatusSelectedTask = {
    ...selectedTask[0],
    status: destination
  };
  arrayToAddInto.push(newStatusSelectedTask);

  const updatedArrays = {
    arrayToRemoveFrom,
    arrayToAddInto
  };

  setCardIsFlipped(false);
  dispatch(updateArraysAction(updatedArrays));
};

//---UPDATING FIRST MOVE--//

export const handleFirstMove = status => {
  switch (status) {
    case "To Do":
      //todoArray, inProgressArray
      selectChange(todoArray, inProgressArray, "In Progress", null);
      updatingArraysInDataBase(todoArray, inProgressArray);
      break;
    case "In Progress":
      //inProgressArray, completedTasksArray
      selectChange(inProgressArray, completedTasksArray, "Done", null);
      updatingArraysInDataBase(inProgressArray, completedTasksArray);
      break;
    case "Done":
      //completedTasksArray, inProgressArray
      selectChange(completedTasksArray, inProgressArray, "In Progress", null);
      updatingArraysInDataBase(completedTasksArray, inProgressArray);
      break;
    default:
      break;
  }
};

//---UPDATING SECOND MOVE--//

export const handleSecondMove = status => {
  switch (status) {
    case "To Do":
      //todoArray,completedTasksArray
      selectChange(todoArray, completedTasksArray, "Done", null);
      updatingArraysInDataBase(todoArray, completedTasksArray);
      break;
    case "In Progress":
      //inProgressArray,todoArray
      selectChange(inProgressArray, todoArray, "To Do", null);
      updatingArraysInDataBase(inProgressArray, todoArray);
      break;
    case "Done":
      //completedTasksArray,todoArray
      selectChange(completedTasksArray, todoArray, "To Do", null);
      updatingArraysInDataBase(completedTasksArray, todoArray);
      break;
    default:
      break;
  }
};

//---HANDLE DELETED TASK--//

export const handleDelete = status => {
  switch (status) {
    case "To Do":
      //todoArray
      selectChange(todoArray, null, null, true);
      deletingFromArrayInDataBase(todoArray);
      break;
    case "In Progress":
      //inProgressArray
      selectChange(inProgressArray, null, null, true);
      deletingFromArrayInDataBase(inProgressArray);
      break;
    case "Done":
      //completedTasksArray
      selectChange(completedTasksArray, null, null, true);
      deletingFromArrayInDataBase(completedTasksArray);
      break;
    default:
      break;
  }
};

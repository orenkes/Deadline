import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { flexbox, borderShadowsRadius } from "../../../style/mixins";
import * as c from "../../../style/colors";

import TaskColorPicker from "./TaskColorPicker";
import TaskStatusSelect from "./TaskStatusSelect";
import TaskUrgencySelect from "./TaskUrgencySelect";

import createDateSum from "../../SignUp/createDateSum";

import { updateArraysAction } from "../../../state/actions/updateArraysAction";

const TaskCreation = ({ setPopupIsOpen }) => {
  const [colorway, setColorway] = useState("turquoise");
  const [status, setStatus] = useState("To Do");
  const [urgency, setUrgency] = useState("low");

  const tasksArrays = useSelector(state => state.updateArraysReducer);

  const dispatch = useDispatch();

  const todoArray = tasksArrays.todoArray;
  const inProgressArray = tasksArrays.inProgressArray;
  const completedTasksArray = tasksArrays.completedTasksArray;
  let getTasksCounter = tasksArrays.tasksCounter;

  const updatingArraysInDataBase = async newTasksCounter => {
    console.log("newTasksCounter", newTasksCounter);

    const updatedArrays = {
      todoArray,
      inProgressArray,
      completedTasksArray,
      tasksCounter: newTasksCounter
    };

    dispatch(updateArraysAction(updatedArrays));

    console.log("updatedArrays", updatedArrays);

    const putMethod = {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify(updatedArrays)
    };

    await fetch(
      `https://tracker-database.youngwebdevs.now.sh/dashboard/updatingarrays`,
      putMethod
    );

    console.log("PUT ENDED");
  };

  const createTask = e => {
    e.preventDefault();
    if (
      e.target[0].value === "" ||
      e.target[1].value === "" ||
      e.target[2].value === ""
    ) {
      alert("One or more of the fields is empty");
    } else {
      setPopupIsOpen(false);
      console.log(getTasksCounter, "tasksCounter before");
      const newTasksCounter = getTasksCounter + 1;
      console.log(newTasksCounter, "newTasksCounter after");

      const title = e.target[0].value;
      const description = e.target[1].value;
      const deadlineISO = e.target[2].value;

      //---TIME AND DATE SUM--//
      // const reducer = (accumulator, currentValue) => accumulator + currentValue;

      // const dateAndTimeArray = deadlineISO.split("T");
      // const date = dateAndTimeArray[0];
      // const dateArray = date.split("-");
      // console.log("dateArray", dateArray);
      // const dateSum = dateArray.reduce(reducer);
      // console.log("dateSum", dateSum);
      // const timeString = dateAndTimeArray[1];
      // const timeArray = timeString.split(":");
      // const timeSum = timeArray.reduce(reducer);
      // console.log("timeSum", timeSum);
      // const dateAndTimeSum = dateSum + timeSum;
      // console.log("dateAndTimeSum", dateAndTimeSum);

      const dateSum = createDateSum(deadlineISO);

      const taskObject = {
        id: newTasksCounter,
        title,
        description,
        colorway,
        status,
        urgency,
        deadlineISO,
        dateAndTimeSum: dateSum
      };

      console.log(taskObject, "taskObject");

      switch (status) {
        case "To Do":
          todoArray.push(taskObject);
          updatingArraysInDataBase(newTasksCounter);
          break;
        case "In Progress":
          inProgressArray.push(taskObject);
          updatingArraysInDataBase(newTasksCounter);
          break;
        case "Done":
          completedTasksArray.push(taskObject);
          updatingArraysInDataBase(newTasksCounter);
          break;
        default:
          break;
      }

      e.target[0].value = "";
      e.target[1].value = "";
      e.target[2].value = "";
    }
  };

  return (
    <Container>
      <TaskForm onSubmit={createTask}>
        <TitleInput
          type="text"
          placeholder="Task Title..."
          minLength="1"
          maxLength="22"
        />
        <DescrptionInput
          placeholder="Task Descrption..."
          minLength="1"
          maxLength="150"
        />
        <DeadlineInput
          type="datetime-local"
          max="3000-01-01T00:00"
          min="2020-01-01T00:00"
        />

        <TaskColorPicker colorway={colorway} setColorway={setColorway} />
        <TaskStatusSelect status={status} setStatus={setStatus} />
        <TaskUrgencySelect urgency={urgency} setUrgency={setUrgency} />
        <SubmitButton type="submit">Add Deadline</SubmitButton>
      </TaskForm>
    </Container>
  );
};

export default TaskCreation;

const Container = styled.div`
  ${borderShadowsRadius}
  background: ${c.bgShyBlue};
  width: 95%;
  max-width: 500px;
  height: 70%;
  padding: 20px 0;

  @media (max-width: 450px) {
    height: 80%;
  }
`;

const TaskForm = styled.form`
  ${flexbox({ dir: "column", jc: "space-around" })}
  height: 100%;
`;

const TitleInput = styled.input`
  flex-basis: 10%;
  height: 10%;
  width: 90%;

  border-radius: 5px;
  border: none;
  background: ${c.inputShyBlue};
  box-shadow: ${c.inputShadows};
  padding: 20px;
  font-size: 1.4rem;
  transition: 0.1s linear;

  opacity: 0.8;
  transition: 0.3s ease-out;
  outline: none;

  :focus {
    filter: brightness(1.1);
    opacity: 1;
  }
  :hover {
    opacity: 1;
  }
`;

const DescrptionInput = styled.textarea`
  resize: none;
  flex-basis: 30%;
  height: 30%;
  width: 90%;

  border-radius: 5px;
  border: none;
  background: ${c.inputShyBlue};
  box-shadow: ${c.inputShadows};
  padding: 20px;
  font-size: 1.1rem;

  opacity: 0.8;
  transition: 0.3s ease-out;

  outline: none;

  :focus {
    filter: brightness(1.1);
    opacity: 1;
  }
  :hover {
    opacity: 1;
  }

  @media (max-width: 450px) {
    flex-basis: 25%;
    height: 25%;
  }
`;

const DeadlineInput = styled(TitleInput)`
  text-align: center;
`;

const SubmitButton = styled.button`
  height: 50px;
  width: 50%;
  min-width: 250px;
  border-radius: 5px;
  box-shadow: -3px -3px 6px 0 rgba(242, 248, 250, 1),
    3px 3px 6px 0 rgba(54, 73, 79, 0.25);
  border: none;
  background: ${c.elmShyBlue};
  font-size: 0.9rem;
  color: ${c.darkBlueText};
  text-shadow: 0 0 1px white;
  font-weight: bold;
  font-size: 1rem;
  font-family: "Montserrat";
  opacity: 0.8;
  transition: 0.3s ease-out;

  outline: none;

  :hover,
  :focus {
    opacity: 1;
    cursor: pointer;
    background: ${c.elmLightBlue};
  }
`;

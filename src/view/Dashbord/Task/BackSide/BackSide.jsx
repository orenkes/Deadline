import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

// import { updateArraysAction } from "../../../../state/actions/updateArraysAction";

import { flexbox } from "../../../../style/mixins";
import * as c from "../../../../style/colors";
import fetchAPI from "../../../../service/services";

import HeaderAreaComponent from "../HeaderAreaComponent";

import { TiArrowLoop } from "react-icons/ti";
import _ from "lodash";
import { useDispatch } from "react-redux";

import { ReactComponent as ExclamationSVG } from "../../../../assets/SVG/alert.svg";
import { ReactComponent as FireSVG } from "../../../../assets/SVG/fire.svg";
import { ReactComponent as AlertSVG } from "../../../../assets/SVG/warning-sign.svg";

import { updateArraysAction } from "../../../../state/actions/updateArraysAction";

const BackSide = ({
  title,
  urgency,
  searchIsOpen,
  cardIsFlipped,
  setCardIsFlipped,
  colorwayStyle,
  status,
  id
}) => {
  const [buttonsText, SetButtonsText] = useState([]);
  const tasksArrays = useSelector(state => state.updateArraysReducer);
  const dispatch = useDispatch();

  const todoArray = tasksArrays.todoArray;
  const inProgressArray = tasksArrays.inProgressArray;
  const completedTasksArray = tasksArrays.completedTasksArray;
  const tasksCounter = tasksArrays.tasksCounter;

  useEffect(() => {
    selectButtonsText();
  }, [status]);

  //--SERVER FUNCTIONS--//

  const updatingArraysInDataBase = async () => {
    const updatedArrays = {
      todoArray,
      inProgressArray,
      completedTasksArray,
      tasksCounter
    };

    // const putMethod = {
    //   method: "PUT",
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //     "auth-token": localStorage.getItem("token")
    //   },
    //   body: JSON.stringify(updatedArrays) // We send data in JSON format
    // };

    //   await fetch(
    //     `https://tracker-database.youngwebdevs.now.sh/dashboard/updatingarrays`,
    //     putMethod
    //   );
    // };
    const jsonUserData = await fetchAPI({
      urlString: "updateTasks",
      method: "updateDB",
      body: updatedArrays
    });
  };

  const selectButtonsText = () => {
    switch (status) {
      case "To Do":
        SetButtonsText(["Forward to In Progress", "Forward to Done"]);
        break;
      case "In Progress":
        SetButtonsText(["Forward to Done", "Return to Todo"]);
        break;
      case "Done":
        SetButtonsText(["Return to In Progress", "Return to Todo"]);
        break;
    }
  };

  //-------------------------------------------------//

  const handleFirstMove = () => {
    switch (status) {
      case "To Do":
        selectChange(todoArray, inProgressArray, "In Progress");
        updatingArraysInDataBase();
        break;
      case "In Progress":
        selectChange(inProgressArray, completedTasksArray, "Done");
        updatingArraysInDataBase();
        break;
      case "Done":
        selectChange(completedTasksArray, inProgressArray, "In Progress");
        updatingArraysInDataBase();
        break;
      default:
        break;
    }
  };

  const handleSecondMove = () => {
    switch (status) {
      case "To Do":
        selectChange(todoArray, completedTasksArray, "Done");
        updatingArraysInDataBase();
        break;
      case "In Progress":
        selectChange(inProgressArray, todoArray, "To Do");
        updatingArraysInDataBase();
        break;
      case "Done":
        selectChange(completedTasksArray, todoArray, "To Do");
        updatingArraysInDataBase();
        break;
      default:
        break;
    }
  };

  const handleDelete = () => {
    switch (status) {
      case "To Do":
        selectChange(todoArray, null, null, true);
        break;
      case "In Progress":
        selectChange(inProgressArray, null, null, true);
        break;
      case "Done":
        selectChange(completedTasksArray, null, null, true);
        break;
      default:
        break;
    }
  };

  //------------------------------------------------------//

  const selectChange = (
    arrayToRemoveFrom,
    arrayToAddInto,
    destination,
    deleteTask
  ) => {
    const selectedTask = _.remove(arrayToRemoveFrom, item => {
      return item.id === id;
    });

    if (deleteTask === true) {
      setCardIsFlipped(false);
      dispatch(updateArraysAction(arrayToRemoveFrom));
      updatingArraysInDataBase();
      return;
    }

    const newStatusSelectedTask = {
      ...selectedTask[0],
      status: destination
    };
    arrayToAddInto.push(newStatusSelectedTask);

    // WARNING: because JS is flexable, this way will create duplicates rather than run over the current key:value pair.
    // const updatedArrays = {
    //   arrayToRemoveFrom,
    //   arrayToAddInto
    // };

    const updatedArrays = {
      arrayToRemoveFrom: arrayToRemoveFrom,
      arrayToAddInto: arrayToAddInto
    };

    setCardIsFlipped(false);
    dispatch(updateArraysAction(updatedArrays));
  };

  return (
    <BackSideBox>
      <HeaderAreaComponent
        title={title}
        status={status}
        urgency={urgency}
        searchIsOpen={searchIsOpen}
        cardIsFlipped={cardIsFlipped}
        setCardIsFlipped={setCardIsFlipped}
      />

      <ActionsArea colorwayStyle={colorwayStyle}>
        <FirstMoveButton
          onClick={() => {
            handleFirstMove(status);
          }}
        >
          {buttonsText[0]}
        </FirstMoveButton>
        <SecondMoveButton
          onClick={() => {
            handleSecondMove(status);
          }}
        >
          {buttonsText[1]}
        </SecondMoveButton>
        <DeleteTaskButton
          onClick={() => {
            handleDelete(status);
          }}
        >
          Delete Tracker
        </DeleteTaskButton>
      </ActionsArea>
    </BackSideBox>
  );
};

export default BackSide;

const BackSideBox = styled.div`
  position: absolute;
  backface-visibility: hidden;

  transform: rotateY(180deg);
  perspective: 900px;

  height: 100%;
  width: 100%;
`;

const ActionsArea = styled.div`
  ${flexbox({ dir: "column" })};
  flex-basis: 75%;
  height: 75%;
  width: 100%;
  background: ${({ colorwayStyle }) => colorwayStyle};
  border-radius: 10px 0 10px 10px;
`;

const FirstMoveButton = styled.div`
  ${flexbox()};
  position: relative;
  height: 33.333%;
  flex-basis: 33.333%;
  width: 100%;
  border-radius: 10px 0 0 0;
  font-weight: bold;
  font-size: 1.2rem;
  transition: 0.2s ease-out;
  color: white;

  :hover {
    cursor: pointer;
    text-shadow: 0 0 5px white;
  }
`;

const SecondMoveButton = styled(FirstMoveButton)``;

const DeleteTaskButton = styled(FirstMoveButton)`
  border-radius: 0 0 10px 10px;
  color: ${c.shyRed};

  :hover {
    text-shadow: 0 0 5px red;
  }
`;

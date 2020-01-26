import React from "react";
import styled from "styled-components";
import { flexbox } from "../../../style/mixins";
import * as c from "../../../style/colors";

const TaskColorPicker = ({ colorway, setColorway }) => {
  return (
    <TaskColorPickerBox>
      <ColorOptionTurquise
        onClick={() => setColorway("turquoise")}
        colorway={colorway}
      ></ColorOptionTurquise>
      <ColorOptionBlack
        onClick={() => setColorway("black")}
        colorway={colorway}
      ></ColorOptionBlack>
      <ColorOptionBlue
        onClick={() => setColorway("blue")}
        colorway={colorway}
      ></ColorOptionBlue>
      <ColorOptionGreen
        onClick={() => setColorway("green")}
        colorway={colorway}
      ></ColorOptionGreen>
      <ColorOptionPink
        onClick={() => setColorway("pink")}
        colorway={colorway}
      ></ColorOptionPink>
    </TaskColorPickerBox>
  );
};

export default TaskColorPicker;

const TaskColorPickerBox = styled.div`
  ${flexbox()}
  width: 60%;
  min-width: 250px;
  height: 50px;
  border-radius: 5px;
  background: ${c.elmShyBlue};
  box-shadow: -3px -3px 6px 0 rgba(242, 248, 250, 1),
    3px 3px 6px 0 rgba(54, 73, 79, 0.25);
`;

const ColorOptionStyle = `
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 5px;

  :hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const ColorOptionTurquise = styled.div`
  ${ColorOptionStyle};
  opacity: ${({ colorway }) => (colorway === "turquoise" ? "1" : "0.8")};
  box-shadow: ${({ colorway }) =>
    colorway === "turquoise"
      ? "0 0 4px 3px white, inset 2px 2px 4px 1px rgba(54, 73, 79, 0.50), inset -2px -2px 4px 1px rgba(242, 248, 250, 0.50)"
      : ""};
  background-color: turquoise;
`;

const ColorOptionBlack = styled.div`
  ${ColorOptionStyle};
  opacity: ${({ colorway }) => (colorway === "black" ? "1" : "0.8")};
  box-shadow: ${({ colorway }) =>
    colorway === "black"
      ? "0 0 4px 3px white, inset 2px 2px 4px 1px rgba(54, 73, 79, 0.50), inset -2px -2px 4px 1px rgba(242, 248, 250, 0.50)"
      : ""};

  background-color: #333333;
`;

const ColorOptionBlue = styled.div`
  ${ColorOptionStyle};
  opacity: ${({ colorway }) => (colorway === "blue" ? "1" : "0.8")};
  box-shadow: ${({ colorway }) =>
    colorway === "blue"
      ? "0 0 4px 3px white, inset 2px 2px 4px 1px rgba(54, 73, 79, 0.50), inset -2px -2px 4px 1px rgba(242, 248, 250, 0.50)"
      : ""};
  background-color: #6196ff;
`;

const ColorOptionGreen = styled.div`
  ${ColorOptionStyle};
  opacity: ${({ colorway }) => (colorway === "green" ? "1" : "0.8")};
  box-shadow: ${({ colorway }) =>
    colorway === "green"
      ? "0 0 4px 3px white, inset 2px 2px 4px 1px rgba(54, 73, 79, 0.50), inset -2px -2px 4px 1px rgba(242, 248, 250, 0.50)"
      : ""};
  background-color: #42f551;
`;

const ColorOptionPink = styled.div`
  ${ColorOptionStyle};
  opacity: ${({ colorway }) => (colorway === "pink" ? "1" : "0.8")};
  box-shadow: ${({ colorway }) =>
    colorway === "pink"
      ? "0 0 4px 3px white, inset 2px 2px 4px 1px rgba(54, 73, 79, 0.50), inset -2px -2px 4px 1px rgba(242, 248, 250, 0.50)"
      : ""};
  background-color: pink;
`;

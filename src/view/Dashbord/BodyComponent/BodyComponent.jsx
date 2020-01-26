import React from "react";
import styled from "styled-components";
import { flexbox } from "../../../style/mixins";
import * as c from "../../../style/colors";

import { useSelector } from "react-redux";

// components //
import Tabs from "./Tabs";
import Trackers from "./Trackers/Trackers";

const BodyComponent = ({ setPopupIsOpen }) => {
  const desktopView = useSelector(state => state.toggleViewReducer);

  return (
    <BodyComponentBox desktopView={desktopView}>
      <Tabs />
      <Trackers setPopupIsOpen={setPopupIsOpen} />
    </BodyComponentBox>
  );
};

export default BodyComponent;

const BodyComponentBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  @media (min-width: 769px) {
    max-width: ${({ desktopView }) => (desktopView ? "1200px" : "500px")};
  }
`;

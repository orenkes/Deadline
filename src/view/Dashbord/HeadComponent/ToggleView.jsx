import React from "react";
import styled from "styled-components";
import { flexbox } from "../../../style/mixins";
import * as c from "../../../style/colors";

// Packages //
import { useSelector, useDispatch } from "react-redux";

// Actions //
import {
  toggleDesktopAction,
  toggleMobileAction
} from "../../../state/actions/toggleViewAction";

// Add ons //
import { GoDeviceMobile, GoDeviceDesktop } from "react-icons/go";

const ToggleView = () => {
  const dispatch = useDispatch();
  const desktopView = useSelector(state => state.toggleViewReducer);

  return (
    <ToggleViewBox>
      <DesktopView
        onClick={() => dispatch(toggleDesktopAction())}
        desktopView={desktopView}
      >
        <GoDeviceDesktop />
      </DesktopView>
      <MobileView
        onClick={() => dispatch(toggleMobileAction())}
        desktopView={desktopView}
      >
        <GoDeviceMobile />
      </MobileView>
    </ToggleViewBox>
  );
};

export default ToggleView;

const ToggleViewBox = styled.div`
  display: block;
  ${flexbox()};
  flex-basis: 10%;
  min-width: 100px;
  background: ${c.elmShyBlue};
  border-radius: 5px;

  box-shadow: -3px -3px 6px 0 rgba(242, 248, 250, 1),
    3px 3px 6px 0 rgba(54, 73, 79, 0.25);

  :hover {
    cursor: pointer;
  }

  @media (max-width: 769px) {
    display: none;
  }
`;

const DesktopView = styled.div`
  ${flexbox()};
  font-size: 1.3rem;
  border-radius: 5px 0 0 5px;
  height: 45px;
  width: 50%;
  flex-basis: 50%;

  transition: 0.1s ease-out;
  background: ${({ desktopView }) => (desktopView ? "#ced9db" : "#d8e7eb")};
  box-shadow: ${({ desktopView }) =>
    desktopView
      ? "inset 2px 2px 4px -2px rgba(54, 73, 79, 1), inset -2px -2px 4px -2px rgba(242, 248, 250, 1)"
      : "2px 2px 4px -2px rgba(54, 73, 79, 1), -2px -2px 4px -2px rgba(242, 248, 250, 1)"};

  :hover {
    filter: brightness(1.1);
  }
`;

const MobileView = styled(DesktopView)`
  border-radius: 0 5px 5px 0;

  background: ${({ desktopView }) => (desktopView ? "#d8e7eb" : "#ced9db")};

  box-shadow: ${({ desktopView }) =>
    desktopView
      ? "2px 2px 4px -2px rgba(54, 73, 79, 1), -2px -2px 4px -2px rgba(242, 248, 250, 1)"
      : "inset 2px 2px 4px -2px rgba(54, 73, 79, 1), inset -2px -2px 4px -2px rgba(242, 248, 250, 1)"};
`;

import React from "react";
import styled from "styled-components";
import { flexbox } from "../../../style/mixins";
import * as c from "../../../style/colors";
// components //
import AvatarMenu from "./AvatarMenu";
import ToggleSort from "./ToggleSort";
import ToggleView from "./ToggleView";
import Search from "./Search";

const HeadComponent = ({ dropDownIsOpen, setDropDownIsOpen }) => {
  return (
    <HeadComponentBox>
      <HeadContainer>
        <AvatarMenu
          dropDownIsOpen={dropDownIsOpen}
          setDropDownIsOpen={setDropDownIsOpen}
        />
        <ToggleSort />
        <Header>
          Dead<span>l</span>ine
        </Header>
        <ToggleView />
        <Search />
      </HeadContainer>
    </HeadComponentBox>
  );
};

export default HeadComponent;

const HeadComponentBox = styled.div`
  height: 70px;
  width: 100vw;
  background: #dae4e8;
`;

const HeadContainer = styled.div`
  margin: auto;
  ${flexbox({ jc: "space-around" })};
  height: 100%;
  width: 100%;
  max-width: 1200px;
`;

const Header = styled.h1`
  color: ${c.darkBlueText};
  flex-basis: 60%;
  font-size: 2rem;
  text-align: center;
  font-family: "Titillium Web", sans-serif;

  span {
    color: red;
  }

  @media (max-width: 769px) {
    transform: translateX(-20px);
  }
  @media (max-width: 470px) {
    transform: translateX(-30px);
    font-size: 1.6rem;
  }
`;

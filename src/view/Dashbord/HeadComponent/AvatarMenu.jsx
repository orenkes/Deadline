import React from "react";
import styled from "styled-components";
import { flexbox } from "../../../style/mixins";
import * as c from "../../../style/colors";

// Packages //
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CSVLink } from "react-csv";

// Actions //
import { getUserAction } from "../../../state/actions/getUserAction";
import { isLoggedAction } from "../../../state/actions/isLoggedAction";

// Add ons //
import { AiOutlineExport, AiOutlinePoweroff } from "react-icons/ai";
import { GiAstronautHelmet } from "react-icons/gi";
import { FaHamburger } from "react-icons/fa";

const AvatarMenu = ({ dropDownIsOpen, setDropDownIsOpen }) => {
  const loggedUser = useSelector(state => state.userReducer[0]);
  const tasksArrays = useSelector(state => state.updateArraysReducer);

  const history = useHistory();
  const dispatch = useDispatch();

  const signOut = () => {
    localStorage.removeItem("token");
    dispatch(getUserAction({}));
    dispatch(isLoggedAction({}));
  };

  const headers = [
    { label: "-Name-", key: "title" },
    { label: "-Description-", key: "description" },
    { label: "-Day-", key: "dayNumber" },
    { label: "-Month-", key: "monthText" },
    { label: "-Year-", key: "year" },
    { label: "-Status-", key: "status" },
    { label: "-Urgency-", key: "urgency" }
  ];

  const data = [
    ...tasksArrays.todoArray,
    ...tasksArrays.inProgressArray,
    ...tasksArrays.completedTasksArray
  ];

  return (
    <AvatarBox onClick={() => setDropDownIsOpen(!dropDownIsOpen)}>
      <AvatarImg avatarImg={loggedUser.avatar}>
        <MenuIndicator dropDownIsOpen={dropDownIsOpen}>
          <MenuIcon />
        </MenuIndicator>
      </AvatarImg>

      <DropDownMenu dropDownIsOpen={dropDownIsOpen}>
        <WelcomeNote>{`Hi, ${loggedUser.userName}`}</WelcomeNote>

        <CreditsButton onClick={() => history.push("/credits")}>
          Credits <GiAstronautHelmet />
        </CreditsButton>

        <ExcelButton data={data} headers={headers} filename={"deadline.csv"}>
          Export <AiOutlineExport />
        </ExcelButton>

        <LogOutButton onClick={signOut}>
          Log Out <AiOutlinePoweroff />
        </LogOutButton>
      </DropDownMenu>
    </AvatarBox>
  );
};

export default AvatarMenu;

const AvatarBox = styled.div`
  /* ${flexbox()}; */
  margin: 0 10px;
  text-align: center;
  flex-basis: 5%;
  position: relative;
`;

const AvatarImg = styled.div`
  ${flexbox()};
  box-shadow: -3px -3px 7px 0 rgba(242, 248, 250, 0.9),
    2px 2px 6px 0 rgba(54, 73, 79, 0.25);
  border: 1px solid rgba(242, 248, 250, 0.2);
  opacity: 1;
  height: 45px;
  width: 45px;
  margin-left: 2px;
  border-radius: 50%;
  background: ${({ avatarImg }) => `url(${avatarImg})`};
  background-position: center;
  background-size: cover;
  position: relative;

  :hover {
    cursor: pointer;
    filter: brightness(1.1);
  }
`;

const MenuIcon = styled(FaHamburger)`
  font-size: 14px;
`;

const MenuIndicator = styled.div`
  ${flexbox()};
  position: absolute;
  z-index: 3;
  right: -6px;
  bottom: -6px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: white;

  :hover {
    cursor: pointer;
  }
`;

const DropDownMenu = styled.div`
  ${flexbox({ dir: "column" })}
  position: absolute;
  margin-top: 11px;
  z-index: 9;
  display: ${({ dropDownIsOpen }) => (dropDownIsOpen ? "block" : "none")};
  height: 200px;
  width: 200px;
  border: 3px solid ${c.bgSlateBlue};
  border-radius: 2%;

  :after {
    content: "";
    position: absolute;
    top: -11px;
    left: 14px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid ${c.bgSlateBlue};
  }
`;

const WelcomeNote = styled.div`
  ${flexbox()}
  flex-basis: 25%;
  height: 25%;
  width: 100%;
  background: ${c.bgSlateBlue};
  font-weight: bold;
  font-size: 1.1rem;
  color: white;
`;

const CreditsButton = styled(WelcomeNote)`
  ${flexbox({ jc: "space-between" })}
  padding: 0 15px;
  background: white;
  font-size: 1.2rem;

  color: ${c.darkBlueText};
  transition: 0.2s ease-out;

  :hover {
    background: ${c.bgfadeBlue};
    cursor: pointer;
  }
`;

const ExcelButton = styled(CSVLink)`
  ${flexbox({ jc: "space-between" })}
  padding: 0 15px;
  font-size: 1.2rem;

  flex-basis: 25%;
  height: 25%;
  width: 100%;
  background: ${c.bgSlateBlue};
  font-weight: bold;
  font-size: 1.1rem;
  background: white;
  text-decoration: none;
  color: ${c.darkBlueText};
  transition: 0.2s ease-out;

  :hover {
    background: ${c.bgfadeBlue};
    cursor: pointer;
  }
`;

const LogOutButton = styled(CreditsButton)`
  color: crimson;
`;

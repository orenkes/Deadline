import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import * as c from "../../style/colors";

import fetchAPI from "../../service/services";

import createDateSum from "./createDateSum";
import { flexbox, borderShadowsRadius, buttonStyle } from "../../style/mixins";

const SignUp = () => {
  const [passwordCompare, setPasswordCompare] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [matchError, setMatchError] = useState("");
  const [avatar, setAvatar] = useState("");

  const matchCheck = e => {
    if (e.target.value !== passwordCompare) {
      setMatchError("#ff5757");
    } else if (e.target.value === passwordCompare) {
      setMatchError("#87e882");
    }
    if (e.target.value === "") {
      setMatchError("");
    }
  };

  // console.log(date);

  const changeAvatar = e => {
    setAvatar(`https://api.adorable.io/avatars/${e.target.value}`);
  };

  const sendForm = async e => {
    e.preventDefault();
    const userName = e.target[0].value;
    const userEmail = e.target[1].value;
    const userPassword = e.target[2].value;
    const confirmPassword = e.target[3].value;

    if (userPassword !== confirmPassword) {
      return console.log("Passwords do not match");
    } else {
      try {
        const currentDateISO = new Date().toISOString();
        const futureDateISO = new Date(2077, 0, 1, 12, 0, 0, 0).toISOString();

        const currentDateSum = createDateSum(currentDateISO);
        const nextDateSum = createDateSum(futureDateISO);

        const userSignData = {
          userName,
          email: userEmail,
          password: userPassword,
          avatar: `https://api.adorable.io/avatars/${userName}`,
          todoArray: [
            {
              id: -1,
              title: "Thanks for Joining!",
              description: `Deadline helps you manage your tasks. 
- Click the Arrow Button to manage a task!
- Click the Bomb Button to create new task
- Select the task's Colorway, Status & Urgency level
- Give it a try 🙂`,
              colorway: "blue",
              status: "To Do",
              urgency: "low",
              deadlineISO: currentDateISO,
              dateAndTimeSum: currentDateSum
            },
            {
              id: -2,
              title: "Urgent! Test features!",
              description: `This task's Urgency level is Burning!
- Toggle tasks sorting by Time or Urgency level
- Search for a task's name
- Click your Avatar to open the Main Menu
- Export tasks to Excel or Check the Credits 👨‍🚀`,
              colorway: "turquoise",
              status: "To Do",
              urgency: "high",
              deadlineISO: futureDateISO,
              dateAndTimeSum: nextDateSum
            }
          ],
          inProgressArray: [],
          completedTasksArray: []
        };

        await fetchAPI({
          urlString: "createUser",
          method: "newUserInDB",
          body: userSignData
        });
        // const options = {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json"
        //   },
        //   body: JSON.stringify(userSignData)
        // };
        // await fetch(
        //   "https://tracker-database.youngwebdevs.now.sh/login",
        //   options
        // );
        setRedirect(true);
      } catch (error) {
        console.log("error: ", error);
      }
    }
  };

  return (
    <Wrapper>
      {redirect && <Redirect push to="/" />}
      <Header>
        Sign Up <span>:)</span>
      </Header>
      <SignUpContainer onSubmit={sendForm}>
        <AvatarDisplay avatarImg={avatar} />
        <UserName
          type="text"
          placeholder="Choose User Name..."
          onChange={changeAvatar}
          minLength="4"
        />
        <UserEmail type="email" placeholder="Choose Email..." minLength="2" />
        <UserPassword
          onChange={e => setPasswordCompare(e.target.value)}
          type="password"
          placeholder="Choose Password..."
          minLength="4"
        />
        <ConfirmPassword
          onChange={matchCheck}
          matchError={matchError}
          type="password"
          placeholder="Confirm Password..."
          minLength="4"
        />
        <SignUpButton type="submit">Submit</SignUpButton>
      </SignUpContainer>
    </Wrapper>
  );
};

export default SignUp;

const Wrapper = styled.div`
  ${flexbox({ dir: "column", jc: "space-around" })};
  height: 100%;
  width: 100%;
`;

const Header = styled.div`
  flex-basis: 10%;
  font-size: 4rem;
  font-family: "Titillium Web", sans-serif;

  span {
    color: red;
    font-size: 5rem;
    font-family: "Montserrat", sans-serif;
  }
`;

const SignUpContainer = styled.form`
  ${flexbox({ dir: "column", jc: "center" })};
  ${borderShadowsRadius};
  flex-basis: 65%;
  width: 80%;
  padding: 20px;

  max-height: 475px;
  max-width: 400px;
`;

const AvatarDisplay = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  font-size: 2rem;
  ${flexbox()}
  text-align: center;
  margin-bottom: 15px;
  pointer-events: none;
  background: ${({ avatarImg }) => `url(${avatarImg})`};
  background-position: center;
  background-size: cover;
  box-shadow: -2px -2px 6px 0 rgba(242, 248, 250, 0.9),
    2px 2px 6px 0 rgba(54, 73, 79, 0.25);
  border: 1px solid rgba(242, 248, 250, 0.2);
`;

const UserName = styled.input`
  box-shadow: ${c.inputShadows};
  background: ${c.inputShyBlue};
  color: ${c.darkBlueText};
  margin: 10px;
  width: 100%;
  height: 10%;
  border-radius: 5px;
  border: none;
  padding-left: 10px;
  font-size: 0.8rem;

  opacity: 0.7;
  transition: 0.3s ease-out;
  outline: none;

  &:hover,
  &:focus {
    opacity: 1;
  }
`;

const UserEmail = styled(UserName)``;
const UserPassword = styled(UserName)``;
const ConfirmPassword = styled(UserName)`
  background-color: ${({ matchError }) => matchError};
`;
const SignUpButton = styled.button`
  margin-top: 15px;
  ${buttonStyle}

  background: ${c.elmShyBlue};
  color: ${c.darkBlueText};
  &:hover,
  &:focus {
    opacity: 0.9;
    cursor: pointer;
    background: ${c.lightBlue};
  }
`;

import React from "react";
import styled from "styled-components";
import { flexbox } from "../../style/mixins";

import html5 from "../../assets/images/HTML5.png";
import nodeJs from "../../assets/images/NodeJs.png";
import react from "../../assets/images/React.png";
import mongoDB from "../../assets/images/mongoDB.png";
import mongoose from "../../assets/images/mongoose1.png";
import styledcomponents from "../../assets/images/styledComponents.png";
import expressJS from "../../assets/images/expressJS.png";
import netlify from "../../assets/images/netlify.png";
import javaScripts from "../../assets/images/javaScripts.png";
import ziet from "../../assets/images/ziet.png";

const Techs = () => {
  const logos = [
    html5,
    javaScripts,
    react,
    styledcomponents,
    nodeJs,
    expressJS,
    mongoose,
    mongoDB,
    ziet,
    netlify
  ];

  const makeLogosBox = () => {
    const logosArray = logos.map(logo => <TechIcon icon={logo} />);
    return logosArray;
  };

  return (
    <TechsContainer>
      <TechsBox>{makeLogosBox()}</TechsBox>
    </TechsContainer>
  );
};

export default Techs;

const TechsContainer = styled.div`
  ${flexbox()};
  margin: 50px;
  width: 90%;
  height: 160px;
  background: white;
  border: 6px solid lightsteelblue;
  box-shadow: 6px 6px slategray;
`;

const TechsBox = styled.div`
  ${flexbox()};
  flex-wrap: wrap;
  width: 100%;
`;

const TechIcon = styled.div`
  background-image: url(${({ icon }) => icon});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin: 4px;
  flex-basis: 15%;
  height: 60px;
`;

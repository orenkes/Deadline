import React from "react";
import styled from "styled-components";

import { flexbox } from "../../../../style/mixins";
import * as c from "../../../../style/colors";

import HeaderAreaComponent from "../HeaderAreaComponent";

import { TiArrowLoop } from "react-icons/ti";

const FaceSide = ({
  cardIsFlipped,
  setCardIsFlipped,
  colorwayStyle,
  title,
  description,
  urgency,
  status,
  dayText,
  monthText,
  dayNumber,
  year,
  time,
  searchIsOpen
}) => {
  return (
    <FaceSideBox>
      <DetailsSection>
        <HeaderAreaComponent
          title={title}
          status={status}
          urgency={urgency}
          searchIsOpen={searchIsOpen}
          cardIsFlipped={cardIsFlipped}
          setCardIsFlipped={setCardIsFlipped}
        />
        <InfoArea colorwayStyle={colorwayStyle}>
          <Description>{description}</Description>

          <Deadline>
            {`  Deadline: ${dayText}
            ${dayNumber}
            ${monthText},
            ${year},
            ${time}`}
          </Deadline>
        </InfoArea>
      </DetailsSection>
    </FaceSideBox>
  );
};

export default FaceSide;

const FaceSideBox = styled.div`
  position: absolute;
  backface-visibility: hidden;
  height: 100%;
  width: 100%;
  perspective: 900px;
`;

const StyledArrowIcon = styled(TiArrowLoop)`
  transition: 2s infinite;

  :hover {
    filter: drop-shadow(0 0 5px gray);
  }
`;

const OptionsButton = styled.div`
  ${flexbox()};
  position: absolute;
  z-index: 1;
  right: 0;
  top: 0;
  height: 30%;
  width: 50px;
  font-size: 1.4rem;
  /* transform: rotateY(180deg) rotateX(180deg); */
  border-radius: 10px;
  background: white;
  transition: 0.3s ease-in-out;

  :hover {
    cursor: pointer;
  }
`;

const DetailsSection = styled.div`
  ${flexbox({ dir: "column", jc: "space-around" })}
  height: 100%;
  width: 100%;
`;

const InfoArea = styled.div`
  ${flexbox({ dir: "column" })};
  flex-basis: 75%;
  height: 75%;
  width: 100%;
  border-radius: 10px 0 10px 10px;
  background: ${({ colorwayStyle }) => colorwayStyle};
`;

const Description = styled.p`
  ${flexbox({ jc: "flex-start", ai: "flex-start" })}
  flex-basis: 80%;
  height: 80%;
  width: 100%;
  border-radius: 10px 0 0 0;
  padding: 10px;
  color: white;
  font-size: 0.9rem;
  line-height: 1.2rem;
  white-space: pre-wrap;

  overflow: auto;
`;

const Deadline = styled.div`
  ${flexbox({ jc: "flex-start", ai: "flex-end" })}
  flex-basis: 20%;
  height: 20%;
  width: 100%;
  background: ${({ colorwayStyle }) => colorwayStyle};
  border-radius: 0 0 10px 10px;
  font-weight: bold;
  padding: 0 0 8px 10px;
  color: ${c.shyRed};
  font-size: 0.9rem;
`;

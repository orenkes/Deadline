import React from "react";
import styled from "styled-components";

import { flexbox } from "../../../style/mixins";
import * as c from "../../../style/colors";

import { TiArrowLoop } from "react-icons/ti";
import { ReactComponent as FireSVG } from "../../../assets/SVG/fire.svg";
import { ReactComponent as AlertSVG } from "../../../assets/SVG/warning-sign.svg";

const HeaderArea = ({
  urgency,
  title,
  searchIsOpen,
  status,
  cardIsFlipped,
  setCardIsFlipped
}) => {
  return (
    <HeaderAreaBox>
      <UrgencyIconsContainer>
        <UrgencyIconBox>
          {urgency === "regular" && <AlertICON />}
          {urgency === "high" && <FireSVG />}
        </UrgencyIconBox>
      </UrgencyIconsContainer>
      <TitleBox>
        {searchIsOpen && (
          <StatusDisplay>{`Currently in: ${status}`}</StatusDisplay>
        )}
        <Title>{title}</Title>
      </TitleBox>
      <OptionsButtonBox
        cardIsFlipped={cardIsFlipped}
        onClick={() => setCardIsFlipped(!cardIsFlipped)}
      >
        <StyledArrowIcon />
      </OptionsButtonBox>
    </HeaderAreaBox>
  );
};

export default HeaderArea;

const HeaderAreaBox = styled.div`
  ${flexbox({ jc: "space-between" })};
  flex-basis: 25%;
  height: 25%;
  width: 100%;
  border-radius: 10px;
  position: relative;
`;

const UrgencyIconsContainer = styled.div`
  height: 100%;
  width: 3%;
  flex-basis: 3%;
  position: relative;
`;

const UrgencyIconBox = styled.div`
  position: absolute;
  height: 32px;
  width: 32px;
  left: -16px;
  top: -16px;
`;

const AlertICON = styled(AlertSVG)`
  fill: firebrick;
`;

const TitleBox = styled.div`
  ${flexbox({ dir: "column" })}
  height: 100%;
  width: 82%;
  flex-basis: 82%;
`;

const StatusDisplay = styled.div`
  flex-basis: 25%;
  height: 25%;
  width: 100%;
  color: ${c.darkText};
  height: 10px;
  padding-left: 7px;
  font-size: 0.7rem;
`;

const Title = styled.div`
  ${flexbox({ jc: "flex-start" })}
  flex-basis: 50%;
  height: 50%;
  width: 100%;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${c.darkText};

  overflow-x: auto;
`;

const StyledArrowIcon = styled(TiArrowLoop)`
  transition: 2s infinite;

  :hover {
    filter: drop-shadow(0 0 5px gray);
  }
`;

// works:
// transform: ${({ cardIsFlipped }) =>
// cardIsFlipped ? "scale(-1, 1)" : "scale(1, 1)"};
// doesn't:
// transform: ${({ cardIsFlipped }) =>
// cardIsFlipped ? "translateY(180deg)" : "translateY(-180deg)"};

const OptionsButtonBox = styled.div`
  ${flexbox()};
  flex-basis: 15%;
  z-index: 1;
  height: 100%;
  width: 15%;
  font-size: 1.5rem;
  transform: ${({ cardIsFlipped }) =>
    cardIsFlipped ? "scale(-1, 1)" : "scale(1, 1)"};
  border-radius: 10px;
  background: white;
  transition: 0.3s ease-in-out;

  :hover {
    cursor: pointer;
    transform: ${({ cardIsFlipped }) =>
      cardIsFlipped ? "scale(1, 1)" : "scale(-1, 1)"};
  }
`;

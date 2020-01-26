import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { flexbox } from "../../style/mixins";
import { GoMarkGithub } from "react-icons/go";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import LogoIcon from "../../assets/images/CompanyLogoClear.png";
import Techs from "./Techs";

const Credits = () => {
  let history = useHistory();

  const createMaker = ({ name, gitHub, linkedin, email, phone }) => {
    return (
      <Maker>
        {name}
        <LinksBox>
          <WebBox>
            <LinkHref href={gitHub} target="_blank">
              <GoMarkGithub />
            </LinkHref>

            <LinkHref href={linkedin} target="_blank">
              <FaLinkedin />
            </LinkHref>

            <LinkHref href={`mailto:${email}`}>
              <AiOutlineMail />
            </LinkHref>
          </WebBox>

          <WhatsappBox>
            <FaWhatsapp /> <NumberSpan>{phone}</NumberSpan>
          </WhatsappBox>
        </LinksBox>
      </Maker>
    );
  };

  const yarden = {
    name: "Yarden Shalom",
    gitHub: "",
    linkedin: "https://www.linkedin.com/in/yarden-shalom-a85a70197/",
    email: "yardeninho@gmail.com",
    phone: "054-9100290"
  };

  const oren = {
    name: "Oren Kesler",
    gitHub: "",
    linkedin: "https://www.linkedin.com/in/oren-kesler-934245144",
    email: "orenkes12@gmail.com",
    phone: "054-6308658"
  };

  return (
    <PageWrapper>
      <PageContainer>
        <InfoBox>
          <Greeting>Welcome To Deadline</Greeting>
          <OriginalPromise>This site was made from scratch by</OriginalPromise>
          <Logo LogoIcon={LogoIcon} />
          <MakersBox>
            {createMaker({ ...yarden })}
            {createMaker({ ...oren })}
          </MakersBox>
          <StyledLinkToSite onClick={() => history.push("/dashboard")}>
            Go To Site
          </StyledLinkToSite>

          <Techs />

          <SiteFeatures>
            <Header>This Site Features</Header>
            <Features>
              <Listing>
                Login and Sign up systems Secured using Bcrypt and JWT
              </Listing>
              <Listing>State Managment using Redux and React Hooks</Listing>
              <Listing>Mobile First, yet fully Responsive Design</Listing>
              <Listing>Tested with Jest and Written in TypeScript</Listing>
            </Features>
          </SiteFeatures>
        </InfoBox>
      </PageContainer>
    </PageWrapper>
  );
};

export default Credits;

const PageWrapper = styled.div`
  ${flexbox()}
  height: 100%;
  width: 100%;
  background: linear-gradient(
    to right bottom,
    #06162c,
    #071425,
    #07121e,
    #080f17,
    #090c0f
  );
  overflow-y: auto;
`;

const PageContainer = styled.div`
  height: 90%;
  ${flexbox({ dir: "column", jc: "flex-start" })};
  width: 100%;
  max-width: 1000px;
  color: white;
  text-shadow: 1px 1px 1px black;
  font-family: "Montserrat", sans-serif;
`;

const InfoBox = styled.div`
  ${flexbox({ dir: "column", jc: "flex-start" })};
  height: 100vh;
  width: 90%;
`;

const Greeting = styled.div`
  font-size: 2.5rem;
  margin-bottom: 15px;
  width: 100%;
  text-align: center;
`;

const Logo = styled.div`
  background-image: ${({ LogoIcon }) => `url(${LogoIcon})`};
  background-position: center;
  background-size: cover;
  height: 140px;
  min-height: 140px;

  width: 200px;
`;

const OriginalPromise = styled.div``;

const MakersBox = styled.div`
  ${flexbox({ jc: "space-around" })}
  width: 100%;
`;

const Maker = styled.div`
  flex-basis: 40%;
  text-align: center;
  height: 150px;
  font-size: 1.1rem;
  max-width: 400px;

  @media (max-width: 400px) {
    font-size: 0.9rem;
  }
`;

const LinksBox = styled.div`
  ${flexbox({ dir: "column" })};
`;

const WebBox = styled.div`
  ${flexbox({ jc: "space-between" })}
  flex-basis: 50%;
  width: 90%;
  margin: 20px 0 10px;
  font-size: 2.5rem;

  @media (max-width: 700px) {
    font-size: 1.5rem;
  }
  @media (max-width: 400px) {
    font-size: 1.2rem;
  }
`;

const LinkHref = styled.a`
  flex-basis: 100%;
  opacity: 0.8;
  color: white;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const WhatsappBox = styled.div`
  ${flexbox()}
  flex-basis: 50%;
  width: 100%;
  text-align: center;
  padding-left: 12px;
  opacity: 0.8;
  font-size: 2.5rem;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 700px) {
    font-size: 1.5rem;
  }
  @media (max-width: 400px) {
    font-size: 1.2rem;
    padding-left: 2px;
  }
`;

const NumberSpan = styled.span`
  font-size: 2.1rem;
  padding-left: 8px;

  @media (max-width: 700px) {
    font-size: 0.9rem;
  }
  @media (max-width: 400px) {
    font-size: 0.7rem;
  }
`;

const StyledLinkToSite = styled(Link)`
  margin-top: 50px;
  ${flexbox()}
  color: white;
  text-decoration: none;
  font-size: 36px;
  width: 250px;
  height: 80px;
  border: 3px solid white;
  box-shadow: 6px 6px slategray;
  padding: 15px 0;

  opacity: 0.9;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const SiteFeatures = styled.div``;

const Header = styled.h2`
  font-size: 22px;
  margin: 15px 5px;
`;

const Features = styled.ol`
  white-space: pre-wrap;
`;

const Listing = styled.li`
  ${flexbox({ jc: "flex-start" })}
  margin: 15px 15px;
  text-decoration: pointer;
  line-height: 22px;

  height: 55px;
  padding-left: 15px;
  border-left: 4px solid lightsteelblue;
  text-shadow: 1px 1px 2px black;
`;

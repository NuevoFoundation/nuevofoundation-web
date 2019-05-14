import * as React from "react";
import styled from "styled-components";
import nuevoTeam from "../../../assets/images/nuevo-team.jpg";
import virtualSession1 from "../../../assets/images/virtualsessions/virtualsession1.jpg";
import virtualSession2 from "../../../assets/images/virtualsessions/virtualsession2.jpg";
import virtualSession3 from "../../../assets/images/virtualsessions/virtualsession3.jpg";
import virtualSession4 from "../../../assets/images/virtualsessions/virtualsession4.jpg";
import virtualSession5 from "../../../assets/images/virtualsessions/virtualsession5.jpg";
import workshop1 from "../../../assets/images/workshops/workshop1.jpg";
import workshop2 from "../../../assets/images/workshops/workshop2.jpg";
import workshop3 from "../../../assets/images/workshops/workshop3.jpg";
import workshop4 from "../../../assets/images/workshops/workshop4.jpg";
import workshop5 from "../../../assets/images/workshops/workshop5.jpg";
import workshop6 from "../../../assets/images/workshops/workshop6.jpg";
import { ButtonCta } from "../common/ButtonCta";
import { Const } from "../../../Const";
import { Link } from "react-router-dom";

const PageWrapper = styled.div`
  font-family: "Lato", sans-serif;
`;

const Section = styled.div`
  color: #0F0F0F;
  min-height: 430px;
  display: flex;
  font-size: 28px;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  padding: 20px;

  img {
    width: 512px;
    height: 366px;
    object-fit: cover;
  }
`;

const HeroTitle = styled.div`
  color: #0F0F0F;
  font-size: 28px;
  padding-left: 20px;
  flex-basis: 30%;
  flex-grow: 1;
`;

const InformationSection = styled.div`
  color: #000000;
  min-height: 430px;
  display: flex;
  flex-flow: row wrap;
  background-color: #FCF113;
  justify-content: center;
  align-items: flex-start;
  padding: 40px;

  img {
    width: 420px;
    height: 280px;
    object-fit: cover;
  }
`;

const InformationImage = styled.img`
  flex-basis: auto;
`

const Information = styled.div`
  flex-basis: 30%;
  flex-grow: 1;
  padding-left: 20px;
`

const InformationTitle = styled.div`
  font-size: 28px;
`

const PageContent = styled.div`
  padding-top: 8px;
  padding-bottom:20px;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
`

const WhatWeDoSection = styled.div`
  min-height: 501px;

  img {
    width: 258px;
    height: 258px;
    object-fit: cover;
  }
`
const WhatWeDoTitle = styled.div`
  font-size: 28px;
  color: #000000;
  text-align: center;
  padding: 40px 0 40px 0;
`

const WhatWeDoItems = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  font-size: 20px;
  color: #000000;
`

const WhatWeDoItem = styled.div`
  cursor: pointer;
  padding: 10px;
`

const WhatWeDoItemTitle = styled.div`
 text-align: center;
 padding-top: 20px;
`
const WhatWeDoDetailSection = styled.div`
  min-height: 650px;
  background-color: #E6E6E6;
  padding: 50px;
`

const WhatWeDoDetailTitle = styled.div`
  font-size: 28px;
  color: #000000;
`
const StyledButton = styled.button`
  background-color: #FCC600; /* Green */
  border: none;
  border-radius: 4px;
  color: #000000;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
`

const ImagesContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  padding-top: 50px;

  img {
    width: 258px;
    height: 258px;
    padding: 10px;
    object-fit: cover;
  }
`

const DonateSection = styled.div`
  height: 300px;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  padding-top: 50px;
`
interface WhatWeDoDetails {
  activeSection: 'virtualsessions' | 'workshops';
  title: string;
  buttonText: string;
  content: string;
  linkTo: string;
}
interface WhatWeDoState {
  whatWeDoDetails: WhatWeDoDetails
}

export class WhatWeDo extends React.Component<{}, WhatWeDoState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      whatWeDoDetails: {
        activeSection: "virtualsessions",
        title: 'Virtual Sessions',
        buttonText: 'Request a virtual session',
        content: this._virtualSessionsInformation,
        linkTo: Const.VirtualSessionPage
      }
    }
  }

  private _virtualSessionsInformation: string = "We’re people from around the world, from diverse industries, who are passionate about education. Taking best practices from our diverse disciplines, we live our values by improving lives. We’re personally invested in the nations where we work; from places like Australia to South America and 87% of us are from the countries where we work.";
  private _schoolWorkshopsInformation: string = "We’re people from around the world, from diverse industries, who are passionate about education. Taking best practices from our diverse disciplines, we live our values by improving lives. We’re personally invested in the nations where we work; from places like Australia to South America and 87% of us are from the countries where we work.";


  public toggleWhatWeDoDetails = (activeSection: 'virtualsessions' | 'workshops') => {
    const whatWeDoDetails: WhatWeDoDetails = {
      activeSection: activeSection,
      title: activeSection === 'workshops' ? 'School Workshops' : 'Virtual Sessions',
      buttonText: activeSection === 'workshops' ? "Request a workshop" : 'Request a virtual session',
      content: activeSection === 'workshops' ? this._schoolWorkshopsInformation : this._virtualSessionsInformation,
      linkTo:   activeSection === 'workshops' ? Const.SchoolWorkshopPage : Const.VirtualSessionPage,
    }

    this.setState({
      whatWeDoDetails
    });
  }

  public render() {
    const { activeSection } = this.state.whatWeDoDetails;
    return (
      <PageWrapper>
        <Section>
          <HeroTitle>
            “Games shouldn’t only be fun. They should
            teach or spark an interest in other things.”
            Hideo Kojima
            </HeroTitle>
          <img src={nuevoTeam} alt="Nuevo Foundation Team" />
        </Section>
        <InformationSection>
          <InformationImage src={workshop6} alt="Nuevo Foundation Workshop" />
          <Information>
            <InformationTitle>We Believe that World Change Starts with Educated Children.</InformationTitle>
            <PageContent>
              We envision a world in which all children can pursue a quality education that enables them to reach their full potential and contribute to their communities and the world.<br /><br />
              Working in collaboration with local communities, partner organizations and governments, we develop literacy skills and a habit of reading among primary school children, and support girls to complete secondary school with the relevant life skills to succeed in school and beyond.
            </PageContent>
          </Information>
        </InformationSection>
        <WhatWeDoSection>
          <WhatWeDoTitle>What we do?</WhatWeDoTitle>
          <WhatWeDoItems>
            <WhatWeDoItem onClick={() => this.toggleWhatWeDoDetails('virtualsessions')}>
              <img src={virtualSession5} alt="Nuevo Foundation Workshop" />
              <WhatWeDoItemTitle>Virtual<br />Sessions</WhatWeDoItemTitle>
            </WhatWeDoItem>
            <WhatWeDoItem onClick={() => this.toggleWhatWeDoDetails('workshops')}>
              <img src={workshop5} alt="Nuevo Foundation Workshop" />
              <WhatWeDoItemTitle>School<br />workshops</WhatWeDoItemTitle>
            </WhatWeDoItem>
          </WhatWeDoItems>
        </WhatWeDoSection>
        <WhatWeDoDetailSection>
          <WhatWeDoDetailTitle>{this.state.whatWeDoDetails.title}</WhatWeDoDetailTitle>
          <PageContent>
            {this.state.whatWeDoDetails.content}
          </PageContent>
          <Link to={this.state.whatWeDoDetails.linkTo}>
            <StyledButton>{this.state.whatWeDoDetails.buttonText}</StyledButton>
          </Link>
          <ImagesContainer>
            {activeSection === 'workshops' ?
              <React.Fragment>
                <img src={workshop1} alt="Nuevo Foundation School Workshop" />
                <img src={workshop2} alt="Nuevo Foundation School Workshop" />
                <img src={workshop3} alt="Nuevo Foundation School Workshop" />
                <img src={workshop4} alt="Nuevo Foundation School Workshop" />
              </React.Fragment>
              :
              <React.Fragment>
                <img src={virtualSession1} alt="Nuevo Foundation Virtual Session" />
                <img src={virtualSession2} alt="Nuevo Foundation Virtual Session" />
                <img src={virtualSession3} alt="Nuevo Foundation Virtual Session" />
                <img src={virtualSession4} alt="Nuevo Foundation Virtual Session" />
              </React.Fragment>
            }
          </ImagesContainer>
        </WhatWeDoDetailSection>
        <DonateSection>
          <WhatWeDoTitle>Help us teach them!</WhatWeDoTitle>
          <ButtonCta
            text={"Donate"}
            backgroundColor={"#ffffff"}
            textColor={"#000000"}
            border={"4px solid #fcca13"}
            linkTo={Const.PayPalDonatePage!}
          />
        </DonateSection>
      </PageWrapper>
    );
  }
}

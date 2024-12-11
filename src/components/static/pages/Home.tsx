import * as React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import Lottie from "react-lottie";
import styled from "styled-components";
import { jsonAnimation } from "../../../assets/animations/data";
import backgroundImageWithNuvi from "../../../assets/images/2018_0814_Pattern_Adjusted.svg";
import Percent13 from "../../../assets/images/home/13percent.png";
import Percent36 from "../../../assets/images/home/36percent.png";
import Percent76 from "../../../assets/images/home/76percent.png";
import MicrosoftLogoImage from "../../../assets/images/home/MicrosoftLogo.png";
import ForbesLogoImage from "../../../assets/images/home/ForbesLogo.png";
import HolaUSALogoImage from "../../../assets/images/home/HolaUSALogo.png";
import MarieClaireLogoImage from "../../../assets/images/home/MarieClaireLogo.png";
import TelemundoLogoImage from "../../../assets/images/home/TelemundoLogo.png";
import AAASLogoImage from "../../../assets/images/home/AAASIFTHENLogo.png";
import CSForAllLogoImage from "../../../assets/images/home/CSForAllLogo.png";
import SeattleSeahawksLogoImage from "../../../assets/images/home/SeattleSeahawksLogo.png";
import GeekWireLogoImage from "../../../assets/images/home/GeekWireLogo.png";
import Earth from "../../../assets/images/home/Earth.png";
import ArrowCircle from "../../../assets/icons/Group211.png";
import "../../../assets/stylesheets/Home.css";
import { Const } from "../../../Const";
import ReactGA from "react-ga";
import { HashLink as Link } from 'react-router-hash-link';
import { ServiceResolver } from "../../../services/ServiceResolver";
import { MetaDataInterface, ImpactStatInterface } from "../../../models/MetaData";
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

const AboveFoldContent = styled.div`
  background-repeat: none;
  background-image: url(${backgroundImageWithNuvi});
  font-family: "Lato", sans-serif;
  font-weight: bolder;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;

  img {
    position: absolute;
    bottom: 0;
    right: calc(50% - 15px);
    padding-bottom: 15px;
  }

  /* override bootstrap cursor pointer on nuvi animation */
  [role="button"] {
    cursor: auto;
  }
`;

const CountUpComponentToSeventyFour = () => (
  <>
    <CountUp start={10} duration={5} end={74} redraw={true}>
      {({ countUpRef, start }) => (
        <VisibilitySensor onChange={start} delayedCall>
          <span ref={countUpRef} />
        </VisibilitySensor>
      )}
    </CountUp>
  </>
);

const CountUpComponentToThirtySix = () => (
  <>
    <CountUp start={10} duration={5} end={36} redraw={true}>
      {({ countUpRef, start }) => (
        <VisibilitySensor onChange={start} delayedCall>
          <span ref={countUpRef} />
        </VisibilitySensor>
      )}
    </CountUp>
  </>
);

const CountUpComponentToThirteen = () => (
  <>
    <CountUp start={10} duration={5} end={13} redraw={true}>
      {({ countUpRef, start }) => (
        <VisibilitySensor onChange={start} delayedCall>
          <span ref={countUpRef} />
        </VisibilitySensor>
      )}
    </CountUp>
  </>
);


const CountUpComponentCountries = () => (
  <>
    <CountUp start={1} duration={5} end={30} redraw={true}>
      {({ countUpRef, start }) => (
        <VisibilitySensor onChange={start} delayedCall>
          <div ref={countUpRef}></div>
        </VisibilitySensor>
      )}
    </CountUp>
  </>
);

const ContentSection = styled.div`
  color: ${(props: StatProps) => props.color ? props.color : "#000000"};
`

const StatsSectionInfo = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  padding: 30px 0 100px 32px;
`

const StatsSectionTitle = styled.div`
  font-family: 'Space Mono', monospace;
  font-size: 28px;
  padding-right: 100px;
  flex-basis: 33%;

  hr { 
    width: 64px;
    border-top: 8px solid #000000;
    float: left;

  }
`

const StatsSectionDescription = styled.div`
  font-family: "lato-semibold", sans-serif;
  font-size: 24px;
  flex-basis: 66%;
  padding-top: 15px;

  div:nth-child(1) {
    width: 80%;
    padding-bottom: 20px;
  }

  div:nth-child(2) {
    width: 80%;
    font-family: "lato-semibold", sans-serif;
    font-size: 16px;
  }
`

const LogoSection = styled.div`
display: flex;
flex-flow: row wrap;
justify-content: space-around;
align-items: center;
padding: 20px;
`

const LogoSectionImageContent = styled.div`
padding: 20px;
`

const StatsSectionStats = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  font-family: 'Space Mono', monospace;
  padding-bottom: 60px;
`

const StatsSectionStatsTitle = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Space Mono', monospace;
  font-size: 36px;
  padding-bottom: 20px;
  color: #FFFFFF;


  div {
    transform:translate(-180%,35%);
  }
`

const StatsSectionStatsInfo = styled.div`
  font-family: 'Lato', sans-serif;  
  font-size: 16px;
  padding: 15px;
  flex-basis: 248px;

  span { 
    font-weight: 700;
  }
`

const ImpactSectionStats = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  padding-bottom: 60px;
`

const ImpactSectionStatsTitle = styled.div`
  font-family: 'Space Mono', monospace;
  padding-bottom: 20px;
  font-size: 36px;
  color: ${(props: StatProps) => props.color};

  span {
    font-family: 'Lato', sans-serif;
    font-weight: normal;
    display: block;

    span { 
      font-weight: bold;
    }
  }
`

const ImpactSectionStatsTitleInfo = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  max-width: 334px;
  padding-bottom: 20px;
`
const ClosingSectionBackground = styled.div`
  background-image: url(${Earth});
  background-repeat: no-repeat;
`

const ClosingSectionInfo = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-content: flex-end;
  font-family: 'Space Mono', monospace;
  font-size: 28px;
  height: 500px;
  padding: 20px;

  div {
    width: 266px;
  }

  div:nth-of-type(2) { 
    font-family: "lato-semibold", sans-serif;
    font-size: 16px;
  }

  span {
    font-family: 'Space Mono', monospace;
    display: block;
    font-weight: 700;
    font-size: 32px;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  justify-items: center;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-height: 167px;
  flex-basis: 511px;
  font-family: 'Space Mono', monospace;
  font-size: 24px;
`;

interface ContentSectionProps {
  color?: string;
  height?: string;
  backgroundColor: string;
}


interface StatProps {
  color?: string;
  metaData?: MetaDataInterface
}

export class Home extends React.Component<{}, StatProps> {
  public apiService = new ServiceResolver().ApiService();
  constructor(props: {}) {
    super(props);
    ReactGA.pageview(Const.RootPage);
    this.state = {
      metaData: undefined
    }
  }

  static readonly ImpactStats: ImpactStatInterface[] = [
    {
      title: "students",
      titleBoldened: "Diverse",
      stat: "19,584",
      description: "This means inclusively reflecting diversity of gender, ethnicity, age, and ability in our foundation, volunteers, speakers and workshop leaders."
    },
    {
      title: "in STEM",
      titleBoldened: "More interested",
      stat: "92.2%",
      description: "Our students leave our events feeling like they have better understanding of the STEM opportunities available to them."
    },
    {
      title: "learned to code",
      titleBoldened: "Believed they",
      stat: "90.9%",
      description: "Students feel that they are able to learn completely new computer science concepts in our 2 hour coding workshops."
    }
  ]

  public render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: jsonAnimation,
      rendererSettings: {
        preserveAspectRatio: undefined,
        viewBoxOnly: true,
        viewBoxSize: "800 0 920 775"
      }
    };

    const impactColors: string[] = ["#EBA300", "#00BED5", "#E13126"];

    return (
      <Grid fluid={true}>
        <AboveFoldContent>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Row>
                <Col xs={11} style={{ padding: "60px 60px 60px 60px" }}>
                  <ContentWrapper>
                    <div className="main-title">
                      Inspiring kids to be curious, confident, and courageous by discovering the world of STEM.
                    </div>
                  </ContentWrapper>
                </Col>
              </Row>
            </Col>
            <Col
              xs={8}
              xsOffset={4}
              sm={8}
              smOffset={4}
              md={6}
              mdOffset={0}
              lg={6}
            >
              <Lottie
                options={defaultOptions}
                isStopped={false}
                isPaused={false}
              />
            </Col>
          </Row>
          <Link to="/#challenge" smooth >
            <img src={ArrowCircle} alt="arrow indicator" />
          </Link>
        </AboveFoldContent>
        <ContentSection style={{ backgroundColor: "#FFBB00" }} id="challenge" >
          <StatsSectionInfo>
            <StatsSectionTitle>
              <div>The challenge kids face</div>
              <hr />
            </StatsSectionTitle>
            <StatsSectionDescription>
              <div>Is that they don’t have enough exposure to people in STEM fields that look like them.</div>
              <div>This could potentially be a deterrent for students to pursue a career in these fields.  As statistics show, a lot of students lose interest after middle school.  This could be due to exposure, a lack of opportunities, or, simply, they don’t have someone in their community that can answer their questions about STEM fields.</div>
            </StatsSectionDescription>
          </StatsSectionInfo>
          <StatsSectionStats>

            <StatsSectionStatsInfo>
              <StatsSectionStatsTitle>
                <img src={Percent76} alt="percent" />
                <div><CountUpComponentToSeventyFour></CountUpComponentToSeventyFour>%</div>
              </StatsSectionStatsTitle>
              <span>74% of middle school girls</span> express an interest in engineering,
                science, and math. But only 0.3% choose computer science as a major when they
                get to college
          </StatsSectionStatsInfo>


            <StatsSectionStatsInfo>
              <StatsSectionStatsTitle>
                <img src={Percent36} alt="percent" />
                <div><CountUpComponentToThirtySix></CountUpComponentToThirtySix>%</div>
              </StatsSectionStatsTitle>
              <span>Only 36% of all high school grads</span> are ready to take a college-level science course. Additionally, US universities are expected to produce only 29% of the required number of grads.
          </StatsSectionStatsInfo>


            <StatsSectionStatsInfo>
              <StatsSectionStatsTitle>
                <img src={Percent13} alt="percent" />
                <div><CountUpComponentToThirteen></CountUpComponentToThirteen>%</div>
              </StatsSectionStatsTitle>
              <span>STEM jobs are projected to grow by 13%.</span> Currently, there are approximately 1.4 million tech job openings which make them the fastest growing jobs in the US.
          </StatsSectionStatsInfo>
          </StatsSectionStats>
        </ContentSection>

        <ContentSection style={{ backgroundColor: "#D2D2D2" }}>
          <StatsSectionInfo>
            <StatsSectionTitle>
              <div>The solution we found</div>
              <hr />
            </StatsSectionTitle>
            <StatsSectionDescription>
              <div>Nuevo Foundation’s solution to this problem comes three-fold:</div>
              <div>We offer coding workshops that provide hands on opportunities for students to learn real-world problem solving skills using coding, hardware and their own imagination.<br /><br />
                We also offer virtual sessions to share the stories of people who have succeeded in STEM fields with students worldwide.<br /><br />
                Lastly, we offer speaker engagements to motivate students to pursue STEM education.<br /><br />
              </div>
            </StatsSectionDescription>
          </StatsSectionInfo>
        </ContentSection>

        <ContentSection style={{ backgroundColor: "#FFFFFF" }}>
          <StatsSectionInfo>
            <StatsSectionTitle>
              <div>The impact we had:</div>
              <hr />
            </StatsSectionTitle>
            <StatsSectionDescription>
              <div>Since the beginning of our journey</div>
              <div> We have devoted ourselves to inform and expose students to the possibilities that STEM careers can have for them. We have worked with students as young as 4 years old all the way up to university students.</div>
            </StatsSectionDescription>
          </StatsSectionInfo>
          <ImpactSectionStats>
            {Home.ImpactStats.map((stat: ImpactStatInterface, index: number) => {
              return (
                <ImpactSectionStatsTitleInfo key={index}><ImpactSectionStatsTitle color={impactColors[index]}>{stat.stat}<span><span>{stat.titleBoldened}</span>{stat.title}</span></ImpactSectionStatsTitle>{stat.description}</ImpactSectionStatsTitleInfo>
              )
            })}
          </ImpactSectionStats>
        </ContentSection>
        <ContentSection style={{ backgroundColor: "#070706" }} color={"#FFFFFF"}>
          <ClosingSectionBackground >
            <ClosingSectionInfo>
              <div>
                <span>33 Countries</span>
                <span>6 Territories</span>
                <span>3 Chapters</span>
                <span>7 Languages</span>
              </div>
            </ClosingSectionInfo>
          </ClosingSectionBackground>
        </ContentSection >

        <ContentSection style={{ backgroundColor: "#FFFFFF" }} id="challenge" >
          <LogoSection>
          
            <LogoSectionImageContent>
              <div className="apply-logo-css-filter"><a href="https://www.forbes.com/sites/viviannunez/2019/12/24/beatris-alejandre-mendez-gandica-on-4-lessons-she-shares-with-latinas-who-want-a-stem-career/?sh=682376079ba8" target="_blank"><img src={ForbesLogoImage} alt="Forbes Magazine Logo" /></a></div>
            </LogoSectionImageContent>

            <LogoSectionImageContent>
              <div className="apply-logo-css-filter"><a href="https://blogs.microsoft.com/latinx/2019/10/23/over-100-latinx-middle-schoolers-participate-in-coding-workshop-at-microsoft/" target="_blank"><img src={MicrosoftLogoImage} alt="Microsoft Logo" /></a></div>
            </LogoSectionImageContent>

            <LogoSectionImageContent>
              <div className="apply-logo-css-filter"><a href="https://www.aaas.org/news/125-women-stem-selected-aaas-ifthen-ambassadors" target="_blank"><img src={AAASLogoImage} alt="AAAS If/Then Logo" /></a></div>
            </LogoSectionImageContent>

            <LogoSectionImageContent>
              <div className="apply-logo-css-filter"><a href="https://www.linkedin.com/pulse/marie-claire-magazine-march-2020-edition-beatris-a-mendez-gandica/" target="_blank"><img src={MarieClaireLogoImage} alt="Marie Claire Magazine Logo" /></a></div>
            </LogoSectionImageContent>

            <LogoSectionImageContent>
              <div className="apply-logo-css-filter"><a href="https://www.linkedin.com/pulse/hola-usa-kicking-off-hispanic-heritage-month-mendez-gandica/" target="_blank"><img src={HolaUSALogoImage} alt="HOLA USA Magazine Logo" /></a></div>
            </LogoSectionImageContent>

            <LogoSectionImageContent>
              <div className="apply-logo-css-filter"><a href="https://csforall.medium.com/the-national-computer-science-education-community-announces-165-new-efforts-to-achieve-computer-484c6057ce24" target="_blank"><img src={CSForAllLogoImage} alt="CS For All Logo" /></a></div>
            </LogoSectionImageContent>

            <LogoSectionImageContent>
              <div className="apply-logo-css-filter"><a href="https://twitter.com/_mujerimparable/status/1281265366753312770?s=20" target="_blank"><img src={TelemundoLogoImage} alt="Telemundo Logo" /></a></div>
            </LogoSectionImageContent>

            <LogoSectionImageContent>
              <div className="apply-logo-css-filter"><a href="https://www.linkedin.com/posts/seattle-seahawks_gohawks-activity-7043662515146276864-CWMZ" target="_blank"><img src={SeattleSeahawksLogoImage} alt="Seattle Seahawks Logo" /></a></div>
            </LogoSectionImageContent>
            
            <LogoSectionImageContent>
              <div className="apply-logo-css-filter"><a href="https://www.geekwire.com/2022/wtia-picks-30-of-washington-states-best-and-brightest-tech-startups-for-founder-cohort/" target="_blank"><img src={GeekWireLogoImage} alt="GeekWire Logo" /></a></div>
            </LogoSectionImageContent>

          </LogoSection>
        </ContentSection>

      </Grid>
    );
  }
}

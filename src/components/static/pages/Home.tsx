import * as React from 'react';
import { Col, Grid, Image, Row } from 'react-bootstrap';
import Lottie from 'react-lottie';
import styled from 'styled-components';
import { jsonAnimation } from '../../../assets/animations/data'
import MissionImage1 from '../../../assets/images/1.png';
import MissionImage2 from '../../../assets/images/2.png';
import backgroundImageWithNuvi from '../../../assets/images/2018_0814_Pattern_Adjusted.svg';
import MissionImage3 from '../../../assets/images/3.png';

import { Link } from 'react-router-dom';
import RocketIcon from '../../../assets/icons/Icons_white-01.png';
import PersonIcon from '../../../assets/icons/Icons_white-02.png';
import HandIcon from '../../../assets/icons/Icons_white-06.png';
import '../../../assets/stylesheets/Home.css';
import { Const } from '../../../Const';
import { CollapseItem } from '../../CollapseItem';
import { ButtonCta } from '../common/ButtonCta';
import { CircleIcon } from '../common/CircleIcon';
import { InfoButton } from '../common/InfoButton';

const AboveFoldContent = styled.div`
  background-repeat: none;
  background-image: url(${backgroundImageWithNuvi});
  font-family: 'Lato', sans-serif;
  font-weight: bolder;
`

const MissionLeftPanel = styled.div`
  background-color: #FFFFFF;
  max-height: 712px;
`

const MissionLeftContent = styled.div`
  padding-top: 40px;
  color: #505150;
`

const MainButtonWrapper = styled.div`
  padding-top:40px;
`

const DonateSection = styled.div`
  background-color: #FBF500;
  display: table;
  height: 396px;
  color: #000000;
  width:100%;
`

const DonateText = styled.div`
  text-align: center;
  font-family: 'Lato', sans-serif;
  font-weight: bold;
  font-size: 24px;
`

const DonateButtonWrapper = styled.div`
  padding-top: 35px;
  margin: 0 auto;
  width: 200px;
`

const ContentWrapper = styled.div`
  padding-top: 100px;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`

interface IHomeState {
  collapseSections: any[];
  currentImage: any;
  collapseInterval: number;
}

export class Home extends React.Component<{}, IHomeState> {
  public collapseSections: any[] = [
    {
      btn: false,
      content: 'Inspire kids to be curious, confident, and courageous by discovering the world of STEM.',
      open: true,
      title: 'MISSION',
      image: MissionImage1,
      iconFill: '#F0000E',
      iconImage: RocketIcon
    },
    {
      btn: false,
      btnContent: 'ABOUT US',
      content: 'Nuevo Foundation is a nonprofit that is run by a group of passionate professionals. We empower underrepresented communities with solutions for future success.',
      link: Const.AboutUsPage,
      open: false,
      title: 'WHO WE ARE',
      image: MissionImage2,
      iconFill: '#009A00',
      iconImage: PersonIcon
    },
    {
      btn: false,
      btnContent: 'PARTICIPATE',
      content: 'We offer coding workshops locally and Skype in the Classroom sessions around the world. ',
      link: Const.SkypeInClassroomPage,
      open: false,
      title: 'PARTICIPATE',
      image: MissionImage3,
      iconFill: '#150BFF',
      iconImage: HandIcon
    },
  ];

  constructor(props: {}) {
    super(props);
    this.state = {
      collapseSections: this.collapseSections,
      currentImage: this.collapseSections[0].image,
      collapseInterval: 5000
    }
  }

  public updateCollapseSections = (collapseSections: any[], openItemIndex: number) => {
    this.setState({
      collapseSections,
      currentImage: collapseSections[openItemIndex].image
    })
  }

  public render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: jsonAnimation,
      rendererSettings: {
        preserveAspectRatio: true,
        viewBoxOnly: true,
        viewBoxSize: "800 0 920 775",
      }
    };

    return (
      <Grid fluid={true}>
        <AboveFoldContent>
          <Row>

            <Col xs={12} sm={12} md={6} lg={6}>
              <Row>
                <Col xs={11} xsOffset={1} >
                  <ContentWrapper>
                    <div className="main-title">Inspire your students using coding<br />and their creativity</div>
                  </ContentWrapper>
                </Col>
                <Col xs={1} xsOffset={1} >
                  <MainButtonWrapper >
                    <StyledLink to={Const.FaqPage} >
                      <InfoButton backgroundColor={'#FCC600'} textColor={'#000000'} borderColor={'#FCC600'}> LEARN MORE </InfoButton>
                    </StyledLink>
                  </MainButtonWrapper>
                </Col>
              </Row>
            </Col>
            <Col xs={8} xsOffset={4} sm={8} smOffset={4} md={6} mdOffset={0} lg={6} >
              <Lottie options={defaultOptions}
                isStopped={false}
                isPaused={false}
              />
            </Col>
          </Row>
        </AboveFoldContent>
        <Row >
          <Col md={6} xs={12}>
            <MissionLeftPanel>
              <Row>
                <Col xsOffset={1}>
                  <MissionLeftContent>
                    {this.collapseSections.map((item: any, index: number, array: any[]) => {
                      const last: boolean = array.length - 1 === index; // used to avoid printing divider for last item
                      return (
                        <Row key={index}>
                          <Col xs={2} sm={1}>
                            <CircleIcon fill={item.iconFill} iconImage={item.iconImage} />
                          </Col>
                          <Col xs={10} sm={11}>
                            <CollapseItem
                              // tslint:disable-next-line:jsx-no-lambda
                              collapseSections={this.collapseSections}
                              updateCollapseSections={this.updateCollapseSections}
                              itemIndex={index}
                              btn={item.btn}
                              btnContent={item.btnContent}
                              btnLink={item.link} open={item.open}
                              title={item.title} content={item.content}
                              last={last}
                            />
                          </Col>
                        </Row>
                      )
                    })}
                  </MissionLeftContent>
                </Col>

              </Row>
            </MissionLeftPanel>
          </Col>
          <Col md={6} xs={12} style={{ overflow: 'hidden' }}>
            <Image src={this.state.currentImage} style={{ width: '100%' }} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <DonateSection>
              <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                <DonateText>Empowering students with knowledge is our goal!!</DonateText>
                <DonateButtonWrapper>
                  <a href={Const.PayPalDonatePage} style={{ textDecoration: 'none' }}>
                    <ButtonCta text={'DONATE'} backgroundColor={'#FBF500'} textColor={'#000000'} border={'3px solid #000000'} />
                  </a>
                </DonateButtonWrapper>
              </div>
            </DonateSection>
          </Col>
        </Row>
      </Grid>
    )
  }
}
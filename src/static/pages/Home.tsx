import * as React from 'react';
import { Col, Grid, Image, Row } from 'react-bootstrap';
import Lottie from 'react-lottie';
import styled from 'styled-components';
import { jsonAnimation } from '../../assets/animations/data'
import MissionImage1 from '../../assets/images/1.png';
import MissionImage2 from '../../assets/images/2.png';
import backgroundImageWithNuvi from '../../assets/images/2018_0814_Pattern_Adjusted.svg';
import MissionImage3 from '../../assets/images/3.png';

import { Link } from 'react-router-dom';
import '../../assets/stylesheets/Home.css';
import { CollapseItem } from '../../components/CollapseItem';
import { Const } from '../../Const';
import { ButtonCta } from '../common/ButtonCta';
import { InfoButton } from '../common/InfoButton';

const AboveFoldContent = styled.div`
  position: relative;
  background-repeat: none;
  background-image: url(${backgroundImageWithNuvi});
  font-family: 'Lato', sans-serif;
  font-weight: bolder;
  height: 675px;
`

const AnimationContainerLg = styled.div`
  position: absolute;
  top: 95px;
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
  collapseSections: any[]
  currentImage: any
  nuviTopPosition: number
}

export class Home extends React.Component<{}, IHomeState> {
  public collapseSections: any[] = [
    {
      btn: false,
      content: 'Inspire kids to be curious, confident, and courageous by discovering the world of STEM.',
      open: true,
      title: 'MISSION',
      image: MissionImage1
    },
    {
      btn: false,
      btnContent: 'ABOUT US',
      content: 'Nuevo Foundation is a nonprofit that is run by a group of passionate professionals. We empower underrepresented communities with solutions for future success.',
      link: Const.AboutUsPage,
      open: false,
      title: 'WHO WE ARE',
      image: MissionImage2
    },
    {
      btn: false,
      btnContent: 'PARTICIPATE',
      content: 'We offer coding workshops locally and Skype in the Classroom sessions around the world. ',
      link: Const.SkypeInClassroomPage,
      open: false,
      title: 'PARTICIPATE',
      image: MissionImage3
    },
  ];

  constructor(props: {}) {
    super(props);
    const nuviTopPosition = this.calculateNuviTopPostion(window.innerWidth);
    this.state = {
      collapseSections: this.collapseSections,
      currentImage: this.collapseSections[0].image,
      nuviTopPosition,
    }
  }
  public updateDimensions = () => {
    const nuviTopPosition = this.calculateNuviTopPostion(window.innerWidth);
    this.setState({ nuviTopPosition });
  }

  public componentWillMount() {
    this.updateDimensions();
  }

  public componentDidMount() {
    this.collapseItemTimer();
    window.addEventListener("resize", this.updateDimensions);
  }
  public componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  public calculateNuviTopPostion(screenWidth: number) {
    return 7.5067 * Math.pow(10, -8) * Math.pow(screenWidth, 3) - 0.000208154 * Math.pow(screenWidth, 2) - 0.234897 * screenWidth + 640.933;
  }

  public closeOpenedItem() {
    let openItemIndex = 0;
    this.collapseSections.forEach((item: any, index: number) => {
      if (item.open) {
        item.open = false;
        openItemIndex = index;
      }
    })
    return openItemIndex;
  }

  public openNextItem() {
    const openItemIndex = this.closeOpenedItem();
    const nextItemIndex = openItemIndex + 1;
    const lastItemIndex = this.collapseSections.length - 1;

    if (nextItemIndex > lastItemIndex) {
      const nextItem = this.collapseSections[0];
      nextItem.open = true;
    }
    else {
      const nextItem = this.collapseSections[nextItemIndex];
      nextItem.open = true;
    }

    return this.collapseSections;
  }

  public collapseItemTimer() {
    const sections = this.openNextItem();

    // Find open section index to set current image
    let openItemIndex = 0;
    sections.forEach((item: any, index: number) => {
      if (item.open) {
        openItemIndex = index;
      }
    })

    setTimeout(() => {
      this.setState({
        collapseSections: sections,
        currentImage: sections[openItemIndex].image
      }, this.collapseItemTimer);
    }, 5000);
  }

  public render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: jsonAnimation,
      rendererSettings: {
        preserveAspectRatio: true
      }
    };

    return (
      <Grid fluid={true}>
        <Row>
          <AboveFoldContent>
            <Col xs={11} xsOffset={1} style={{ zIndex: 10 }}>
              <ContentWrapper>
                <div className="main-title">Inspire your students using coding<br />and their creativity</div>
                <StyledLink to={Const.FaqPage} >
                  <MainButtonWrapper ><InfoButton backgroundColor={'#FCC600'} textColor={'#000000'} borderColor={'#FCC600'}> LEARN MORE </InfoButton></MainButtonWrapper>
                </StyledLink>
              </ContentWrapper>
            </Col>
            <Col >
              <AnimationContainerLg style={{ top: this.state.nuviTopPosition, width: "100%" }}>
                <Lottie options={defaultOptions}
                  isStopped={false}
                  isPaused={false} />
              </AnimationContainerLg>
            </Col>
          </AboveFoldContent>
        </Row>
        <Row >
          <Col md={6} xs={12}>
            <MissionLeftPanel>
              <Row>
                <Col xsOffset={2}>
                  <MissionLeftContent>
                    {this.collapseSections.map((item: any, index: number, array: any[]) => {
                      const last: boolean = array.length - 1 === index; // used to avoid printing divider for last item
                      return (
                        <CollapseItem
                          key={index}
                          btn={item.btn}
                          btnContent={item.btnContent}
                          btnLink={item.link} open={item.open}
                          title={item.title} content={item.content}
                          last={last}
                        />
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
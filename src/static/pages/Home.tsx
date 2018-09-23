import * as React from 'react';
import { Col, Grid, Image, Row } from 'react-bootstrap';
import styled from 'styled-components';
import backgroundImageWithNuvi from '../../assets/images/HomeBackgroundNuvi.png';

import MissionImage1 from '../../assets/images/01_Mission.jpg';
import MissionImage2 from '../../assets/images/02_WhoWeAre.jpg';
import MissionImage3 from '../../assets/images/03_GetInvolved.jpg';

import '../../assets/stylesheets/Home.css';
import { CollapseItem } from '../../components/CollapseItem';
import { Const } from '../../Const';
import { ButtonCta } from '../shared/ButtonCta';
import { InfoButton } from '../shared/InfoButton';

const contentHeight = 675;

const AboveFoldContent = styled.div`
  background-image: url(${backgroundImageWithNuvi});
  font-family: 'Lato', sans-serif;
  font-weight: bolder;
  height: 747px;
`

const MissionLeftPanel = styled.div`
  background-color: #433F79;
  min-height: 712px;
`

const MissionLeftContent = styled.div`
  padding-top: 40px;
  color: #505150;
`

const MainButtonWrapper = styled.div`
  padding-top:40px;
`

const DonateSection = styled.div`
  background-color: #4BE1DE;
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

// stupid code
const ContentWrapper = styled.div`
  padding-left: 60px;
  padding-top: ${contentHeight / 4}px;
`

interface IHomeState {
  collapseSections: any[]
  currentImage: any
}

export class Home extends React.Component<{}, IHomeState> {
  public collapseSections: any[] = [
    {
      btn: false,
      content: 'Identifying resource gaps among underserved communities where technology can have an impact.',
      open: true,
      title: 'MISSION',
      image: MissionImage1
    },
    {
      btn: true,
      btnContent: 'About us',
      content: 'Nuevo Foundation is a non-profit that want to help the world’s disadvantaged societies and build solutions.',
      link: Const.AboutUsPage,
      open: false,
      title: 'WHO WE ARE',
      image: MissionImage2
    },
    {
      btn: true,
      btnContent: 'Learn more',
      content: 'We are working to offer workshops and Skype classes around the world.',
      link: Const.SkypeInClassroomPage,
      open: false,
      title: 'PARTICIPATE',
      image: MissionImage3
    },
  ];

  constructor(props: {}) {
    super(props);
    this.state = {
      collapseSections: this.collapseSections,
      currentImage: this.collapseSections[0].image,
    }
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
      });
    }, 5000);
  }

  public render() {
    this.collapseItemTimer();
    return (
      <Grid fluid={true}>
        <Row>
          <Col xs={12}>
            <AboveFoldContent>
              <ContentWrapper>
                <div className="main-title">Inspire your students with learning<br />about new technologies.</div>
                <MainButtonWrapper><InfoButton backgroundColor={'#F9BB08'} textColor={'#000000'} borderColor={'#F9BB08'}> LEARN MORE </InfoButton></MainButtonWrapper>
              </ContentWrapper>
            </AboveFoldContent>
          </Col>
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
          <Col md={6} xs={12} style={{maxHeight: '712px', overflow: 'hidden'}}>
            <Image src={this.state.currentImage} style={{width: '180%'}}/>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <DonateSection>
              <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                <DonateText>Because empowering students with knowledge is our goal!</DonateText>
                <DonateButtonWrapper>
                  <a href={Const.PayPalDonatePage} style={{ textDecoration: 'none' }}>
                    <ButtonCta text={'DONATE'} backgroundColor={'#4BE1DE'} textColor={'#000000'} border={'2px solid #000000'} />
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
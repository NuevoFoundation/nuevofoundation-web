import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import styled from 'styled-components';
import backgroundImage from '../../assets/images/2018_0814_Pattern_Adjusted.svg';
import '../../assets/stylesheets/Home.css';
import { CollapseItem } from '../../components/CollapseItem';
import { ButtonCta } from '../shared/ButtonCta';
import { InfoButton } from '../shared/InfoButton';

const contentHeight = 675;

const AboveFoldBackgroundImage = styled.div`
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-size: 100%;
`
const AboveFoldContent = styled.div`
  font-family: 'Lato', sans-serif;
  font-weight: bolder;
  height: 675px;
`

const MissionLeftPanel = styled.div`
  width: 48%;
  background-color: #433F79;
  height: 712px;
`

const MissionRightPanel = styled.div`
  background-color: #E6E6E6;
  height: 712px;
`

const MissionLeftContent = styled.div`
  padding-top: 100px;
  padding-left: 40px;
  color: #505150;
`

const MainButtonWrapper = styled.div`
  padding-top:40px;
`

const DonateSection = styled.div`
  background-color: #4BE1DE;
  height: 396px;
  color: #000000;
`

const DonateText = styled.div`
  padding-top: 60px;
  text-align: center;
  font-family: 'Lato', sans-serif;
  font-weight: bold;
  font-size: 24px;
`

const DonateButtonWrapper = styled.div`
  padding-top: 35px;
  margin: 0 auto;
  width:200px;
`

// stupid code
const ContentWrapper = styled.div`
  padding-left: 60px;
  padding-top: ${contentHeight / 4}px;
`

const ImageWrapper = styled.div`
 background-image: url("./main-2.jpg");
 height:inherit;
 background-repeat: no-repeat;
 background-size: auto 712px;
`
interface IHomeState {
  collapseSections: any[]
}

export class Home extends React.Component<{}, IHomeState> {
  public collapseSections: any[] = [
    {
      btn: false,
      content: 'Identifying resource gaps among underserved communities where technology can have an impact.',
      open: true,
      title: 'MISSION',
    },
    {
      btn: true,
      btnContent: 'About us',
      content: 'Nuevo Foundation is a non-profit that want to help the world’s disadvantaged societies and build solutions.',
      open: false,
      title: 'WHO WE ARE',
    },
    {
      btn: true,
      btnContent: 'Learn more',
      content: 'We are working to offer workshops and Skype classes around the world.',
      open: false,
      title: 'PARTICIPATE',
    },
  ];

  constructor(props: {}) {
    super(props);
    this.state = {
      collapseSections: this.collapseSections
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
    setTimeout(() => {
      this.setState({
        collapseSections: this.openNextItem()
      });
    }, 4000);
  }

  public render() {
    this.collapseItemTimer();
    return (
      <Grid>
        <Row>
          <AboveFoldBackgroundImage>

            <Col xs={12} md={8}>
              <AboveFoldContent>
                <ContentWrapper>
                  <div className="main-title">Inspire your students with learning<br />about new technologies.</div>
                  <MainButtonWrapper><InfoButton backgroundColor={'#F9BB08'} textColor={'#000000'} borderColor={'#F9BB08'}> LEARN MORE </InfoButton></MainButtonWrapper>
                </ContentWrapper>
              </AboveFoldContent>
            </Col>
          </AboveFoldBackgroundImage>

        </Row>
        <Row>
          <Col xs={6} md={6}>
            <MissionLeftPanel>
              <MissionLeftContent>
                {this.collapseSections.map((item: any, index: number, array: any[]) => {
                  const last: boolean = array.length - 1 === index; // used to avoid printing divider for last item
                  return (
                    <CollapseItem key={index} btn={item.btn} btnContent={item.btnContent} open={item.open} title={item.title} content={item.content} last={last} />
                  )
                })}
              </MissionLeftContent>
            </MissionLeftPanel>
          </Col>
          <Col xs={6} md={6}>
            <MissionRightPanel>
              <ImageWrapper />
            </MissionRightPanel>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <DonateSection>
              <DonateText>Because empowering students with knowledge is our goal!</DonateText>
              <DonateButtonWrapper><ButtonCta text={'DONATE'} backgroundColor={'#4BE1DE'} textColor={'#000000'} border={'2px solid #000000'} /></DonateButtonWrapper>
            </DonateSection>
          </Col>

        </Row>

      </Grid>
    )
  }
}
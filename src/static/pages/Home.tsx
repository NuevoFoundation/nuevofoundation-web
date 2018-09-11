import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import styled from 'styled-components';
import '../../assets/stylesheets/Home.css';
import { CollapseItem } from '../../components/CollapseItem';
import { ButtonCta } from '../shared/ButtonCta';
import { InfoButton } from '../shared/InfoButton';

const contentHeight = 675;

const AboveFoldContent = styled.div`
  font-family: 'Lato', sans-serif;
  font-weight: bolder;
  background-color: #D2D2D2;
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

export class Home extends React.Component {
  public collapseSections: any[] = [
    {
      content: 'Identifying resource gaps among underserved communities where technology can have an impact',
      title: 'MISSION',
    },
    {
      content: 'Nuevo Foundation is a non-profit that want to help the world’s disadvantaged societies and build solutions.',
      title: 'WHO WE ARE',
    },
    {
      content: 'We are working to offer workshops and Skype classes around the world.',
      title: 'PARTICIPATE',
    },
  ];
  public render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={8}>
            <AboveFoldContent>
              <ContentWrapper>
                <div className="main-title">Inspire your students with learning<br />about new technologies.</div>
                <MainButtonWrapper><InfoButton backgroundColor={'#F9BB08'} textColor={'#000000'} borderColor={'#F9BB08'}> LEARN MORE </InfoButton></MainButtonWrapper>
              </ContentWrapper>
            </AboveFoldContent>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={6}>
            <MissionLeftPanel>
              <MissionLeftContent>
                {this.collapseSections.map((item: any, index: number) => {
                  return (
                    <CollapseItem key={index} title={item.title} content={item.content} />
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
import * as React from 'react';
import styled from 'styled-components';
import '../../assets/Home.css';
import { DonateButton } from '../shared/DonateButton';
import { ImageCircle } from '../shared/ImageCircle';
import { InfoButton } from '../shared/InfoButton';

const contentHeight = 675;
const HomePageWrapper = styled.div`

`

const AboveFoldContent = styled.div`
  background-color: #D2D2D2;
  height: 675px;
`

const MissionLeftPanel = styled.div`
  width: 45%;
  background-color: #505050;
  float:left;
  height: 712px;
`

const MissionRightPanel = styled.div`
  background-color: #E6E6E6;
  margin-left: 45%;
  height: 712px;
`

const MissionLeftContent = styled.div`
  padding-top: 100px;
  padding-left: 40px;
`

const MissionTitle = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #ffffff;
  font-size: 26px;
  font-weight: bold;
  padding-bottom: 20px;
`

const MissionText = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #ffffff;
  font-size: 34px;
  font-weight: normal;
  padding-bottom: 20px;
`

const MainButtonWrapper = styled.div`
  padding-top:25px;
`

const MissionButtonWrapper = styled.div`
  padding-right: 20px;
`

const DonateSection = styled.div`
  background-color: #F1F1F1;
  height: 262px;
`

const DonateText = styled.div`
  padding-top: 20px;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 36px;
`

const DonateButtonWrapper = styled.div`
  padding-top: 60px;
  margin: 0 auto;
  width:200px;
`

// stupid code
const ContentWrapper = styled.div`
  padding-left: 60px;
  padding-top: ${contentHeight / 4}px;
`

const ImageWrapper = styled.div`
  padding-top: 150px;
  padding-left: 200px;

`

export class Home extends React.Component {
    public render() {
        return (
            <HomePageWrapper>
                <AboveFoldContent>
                    <ContentWrapper>
                        <div className="main-title">Inspire your students with learning<br />about new technologies.</div>
                        <MainButtonWrapper><InfoButton > Learn More </InfoButton></MainButtonWrapper>
                    </ContentWrapper>
                </AboveFoldContent>
                <MissionLeftPanel>
                    <MissionLeftContent>
                        <MissionTitle> Mission </MissionTitle>
                        <MissionText> Identifying resource gaps among underserved communities where technology can have an impact. </MissionText>
                        <MissionButtonWrapper><InfoButton bColor={'#505050'} textColor={'#ffffff'}>Learn More</InfoButton></MissionButtonWrapper>
                    </MissionLeftContent>
                </MissionLeftPanel>
                <MissionRightPanel>
                    <ImageWrapper>
                        <ImageCircle imageSrc={'https://www.solidbackgrounds.com/images/1920x1080/1920x1080-white-solid-color-background.jpg'} imgHeight={'350px'} imgWidth={'350px'} />
                    </ImageWrapper>
                </MissionRightPanel>
                <DonateSection>
                    <DonateText>Because empowering students with knowledge is our goal.</DonateText>
                    <DonateButtonWrapper><DonateButton bColor={'#505050'} textColor={'#ffffff'} /></DonateButtonWrapper>
                </DonateSection>
            </HomePageWrapper>
        )
    }
}
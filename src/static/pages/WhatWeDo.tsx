import * as React from 'react';
import styled from 'styled-components';
import '../../assets/stylesheets/WhatWeDo.css';
// import {InfoButton} from '../shared/InfoButton';

const contentHeight = 430;
const WhatWeDoWrapper = styled.div`

`

const DarkWrapper = styled.div`
  background-color: #d2d2d2;
  height: 430px;
`
const ContentWrapper = styled.div`
  padding-left: 60px;
  padding-right: 60px;
  padding-top: ${contentHeight/4}px;
  padding-bottom: ${contentHeight/4}px;
`
const ContentWrapperSmall = styled.div`
  padding-left: 60px;
  padding-right: 60px;
  padding-top: ${contentHeight/10}px;
  padding-bottom: ${contentHeight/10}px;
`
const ContentWrapperPadded = styled.div`
  padding-left: 300px;
  padding-right: 300px;
  padding-top: ${contentHeight/10}px;
  padding-bottom: ${contentHeight/10}px;
`

const LightWrapper = styled.div`
  background-color: #ffffff;
  height: 430spx;
`

export class WhatWeDo extends React.Component {
  public render(){
    return(
      <WhatWeDoWrapper>
        <DarkWrapper>
          <ContentWrapper>
            <div className= "title">“Games shouldn’t only be fun. They should <br/>teach or spark an interest in other things."<br/></div>
            <div className= "default">Hideo Kojima</div>
          </ContentWrapper>
        </DarkWrapper>
        <LightWrapper>
          <ContentWrapperSmall>
            <div className= "bolded-title">We Believe that World Change Starts with Educated Children.®<br/><br/></div>
            <div className= "default">We envision a world in which all children can pursue a quality education that enables them to reach their full potential and contribute to their communities and the world.<br/><br/></div>
            <div className= "default">Working in collaboration with local communities, partner organizations and governments, we develop literacy skills and a habit of reading among primary school children, and support girls to complete secondary school with the relevant life skills to succeed in school and beyond. <br/></div>
          </ContentWrapperSmall>
        </LightWrapper>
        <DarkWrapper>
          <ContentWrapperPadded>
            <div className= "left">
              <div className= "circle"><div className= "circle-text">visual element</div></div>
            </div>
            <div className= "right">
              <div className= "circle"><div className= "circle-text">visual element</div></div>
            </div>
            <div className= "left">
              <div className= "default-bold">School Workshops</div>
            </div>
            <div className= "left">
              <div className= "default-bold">Skype in the Classroom</div>
            </div>
          </ContentWrapperPadded>
        </DarkWrapper>
      </WhatWeDoWrapper>
    )
  }
}
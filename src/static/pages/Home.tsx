import * as React from 'react';
import styled from 'styled-components';
import '../../assets/Home.css';
import { InfoButton } from '../shared/InfoButton';

const contentHeight = 675;
const HomePageWrapper = styled.div`

`

const AboveFoldContent = styled.div`
  background-color: #D2D2D2;
  height: 675px;
`

// stupid code
const ContentWrapper = styled.div`
  padding-left: 60px;
  padding-top: ${contentHeight/4}px;
`

export class Home extends React.Component {
    public render() {
        return (
            <HomePageWrapper>
                <AboveFoldContent>
                    <ContentWrapper>
                        <div className="main-title">Inspire your students with learning<br/>about new technologies.</div>
                        <InfoButton text="Learn More" />
                    </ContentWrapper>
                </AboveFoldContent>
            </HomePageWrapper>
        )
    }
}
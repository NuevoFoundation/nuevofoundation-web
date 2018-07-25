import * as React from 'react';
import styled from 'styled-components';
import '../../assets/Home.css';
// import { InfoButton } from '../shared/InfoButton';

import '../shared/DonateButton.tsx'
import '../shared/Header.tsx'

const contentHeight = 675;
const FaqPageWrapper = styled.div`

`

const AboveFoldContent = styled.div`
  background-color: #FFFFFF;
  height: 620px;
`

// stupid code
const ContentWrapper = styled.div`
  padding-left: 60px;
  padding-top: ${contentHeight / 20}px;
  padding-right: 156px;
`

export class Faq extends React.Component {
    public render() {
        return (
            <FaqPageWrapper>
                <AboveFoldContent>
                    <ContentWrapper>
                        <div className="main-title">Frequently Asked Questions</div>
                        
                    </ContentWrapper>
                    <ContentWrapper>
                        <div className="title-description">Nuevo Foundation is a non-profit run by a group of passionate friends that want to
                            help the world's disadvantaged societies and build solutions that would enable them future opportunities</div>
                    </ContentWrapper>
                    <ContentWrapper>
                        <div className="category">Category 1</div>
                        <div className="category">Category 2</div>
                        <div className="category">Category 3</div>
                    </ContentWrapper>
                    <ContentWrapper>
                        <div className="question">Question 1</div>
                    </ContentWrapper>
                    <ContentWrapper>
                        <div className="questiontext">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. 
                            Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, 
                            ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, 
                            aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis 
                            eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. 
                            Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,
                            tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.</div>
                    </ContentWrapper>

                    <ContentWrapper>
                        <div className="question">Question 2</div>
                    </ContentWrapper>
                    <ContentWrapper>
                        <div className="questiontext">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                            Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
                            ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
                            aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis
                            eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                            Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,
                            tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.</div>
                    </ContentWrapper>
                    <ContentWrapper>
                        <div className="question">Question 3</div>
                    </ContentWrapper>
                    <ContentWrapper>
                        <div className="questiontext">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                            Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
                            ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
                            aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis
                            eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                            Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,
                            tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.</div>
                    </ContentWrapper>
                    <ContentWrapper>
                        <div className="question">Question 4</div>
                    </ContentWrapper>
                    <ContentWrapper>
                        <div className="questiontext">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                            Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
                            ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
                            aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis
                            eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                            Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,
                            tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.</div>
                    </ContentWrapper>

                </AboveFoldContent>

            </FaqPageWrapper>
        )
    }
}
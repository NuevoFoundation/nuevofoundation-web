import * as React from 'react';
import styled from 'styled-components';
import '../../../assets/stylesheets/faq.css';

import { Col, Grid, Row } from 'react-bootstrap';
import '../common/DonateButton.tsx'
import '../common/Header.tsx'

const FaqWrapper = styled.div`
  font-family: 'Lato', sans-serif;
`

const ContentWrapper = styled.div`
  
`

export class Faq extends React.Component {
    public render() {
        return (
            <Grid fluid={true}>
                <Row>
                    <Col xs={9} xsOffset={1} >
                        <FaqWrapper>
                            <div className="main-title-faq">Frequently Asked Questions</div>
                            <ContentWrapper>
                                <div className="question">What is Nuevo Foundation?</div>
                            </ContentWrapper>
                            <ContentWrapper>
                                <div className="questiontext">Nuevo Foundation is a nonprofit that is run by a group of passionate professionals. We empower underrepresented communities with solutions for future success.</div>
                            </ContentWrapper>
                            <ContentWrapper>
                                <div className="question">What does Nuevo Foundation offer?</div>
                            </ContentWrapper>
                            <ContentWrapper>
                                <div className="questiontext">Nuevo Foundation offers workshops for kids K-12 where they get to learn about coding and technology.</div>
                            </ContentWrapper>
                            <ContentWrapper>
                                <div className="question">What is a virtual session?</div>
                            </ContentWrapper>
                            <ContentWrapper>
                                <div className="questiontext">A virtual session is an opportunity for your students to talk to someone at Microsoft or any other tech company over Teams/Skype/Hangouts/Zoom who is excited and passionate about technology and sharing their experience at their workplace. You can use this as a way for your students to learn about what it's like to work in technology. We also use the time to have the students ask questions about tech or anything they're curious about. </div>
                            </ContentWrapper>
                            <ContentWrapper>
                                <div className="question">Who does Nuevo Foundation serve?</div>
                            </ContentWrapper>
                            <ContentWrapper>
                                <div className="questiontext">Anyone interested in STEM with a focus on underserved communities.</div>
                            </ContentWrapper>
                        </FaqWrapper>
                    </Col>
                </Row>
            </Grid>
        )
    }
}
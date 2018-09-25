import * as React from 'react';
import styled from 'styled-components';
import '../../assets/stylesheets/faq.css';

import { Col, Grid, Row } from 'react-bootstrap';
import '../shared/DonateButton.tsx'
import '../shared/Header.tsx'

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
                            <div className="main-title">Frequently Asked Questions</div>
                            <div className="title-description">Nuevo Foundation is a non-profit run by a group of passionate friends that want to help the world’s disadvantaged societies and build solutions that would enable them to have future opportunities.</div>
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
                                <div className="questiontext">A virtual session, or Skype in the Classroom, is an opportunity for your students to talk to someone at Microsoft over Skype who is excited and passionate about technology and sharing their experience at Microsoft. You can use this as a way for your students to learn about what it's like to work in technology. We also use the time to have the students ask questions about tech or anything they're curious about. </div>
                            </ContentWrapper>
                            <ContentWrapper>
                                <div className="question">Who does Nuevo Foundation serve?</div>
                            </ContentWrapper>
                            <ContentWrapper>
                                <div className="questiontext">Nuevo Foundation was created by a passionate group of friends that are here to serve anyone that is interested in STEM with a focus on underserved communites.</div>
                            </ContentWrapper>
                        </FaqWrapper>
                    </Col>
                </Row>
            </Grid>
        )
    }
}
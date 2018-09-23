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
                                <div className="questiontext">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                                    Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
                                    ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
                                    aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis
                                    eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                                    Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,
                            tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.</div>
                            </ContentWrapper>
                            <ContentWrapper>
                                <div className="question">What is a virtual session?</div>
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
                                <div className="question">Who does Nuevo Foundation serve?</div>
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
                        </FaqWrapper>
                    </Col>
                </Row>
            </Grid>
        )
    }
}
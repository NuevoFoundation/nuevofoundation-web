import * as React from 'react';
import { Col, ControlLabel, FormControl, FormGroup, Grid, Row } from 'react-bootstrap';
import styled from 'styled-components';

const Title = styled.div`
  font-family: 'Lato', sans-serif;
  font-size:34px;
  font-weight:bold;
  padding-top:40px;
  padding-bottom:30px;
`

interface IContactState {
    email: string;
    message: string;
    name: string;
    subject: string;
}
export class Contact extends React.Component<{}, IContactState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            email: '',
            message: '',
            name: '',
            subject: ''
        };
    }

    public handleChange = (e: any) => {
         this.setState({ name: e.target.value });
        // const change = {}
        // change[e.target.name] = e.target.value
        // this.setState(change)
        //this.setState({ [e.target.type]: e.target.value });
    }

    public render() {
        return (
            <Grid fluid={true}>
                <Row>
                    <Col xs={12} xsOffset={1}>
                        <Title> Say Hello! </Title>
                    </Col>
                </Row>
                <Row>
                    <Col xs={10} xsOffset={1} sm={5} smOffset={1}>
                        <form>
                            <FormGroup
                                controlId="formBasicText"
                            >
                                <ControlLabel>Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    name="name"
                                    placeholder="Enter name"
                                    onChange= {this.handleChange}
                                    value={this.state.name}
                                />
                                <ControlLabel>Email</ControlLabel>
                                <FormControl
                                    type="email"
                                    name="email"
                                    placeholder="Enter valid email"
                                    onChange={this.handleChange}
                                    value={this.state.email}
                                />
                                <ControlLabel>Subject</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="What are you interested in?"
                                    onChange={this.handleChange}
                                    value={this.state.subject}
                                />
                                <ControlLabel>Message</ControlLabel>
                                <FormControl
                                    type="textarea"
                                    placeholder="Enter message"
                                    onChange={this.handleChange}
                                    value={this.state.message}
                                />
                            </FormGroup>
                        </form>
                    </Col>
                    <Col xs={12} sm={5} smOffset={1}>
                        <img src={''} />
                    </Col>
                </Row>


            </Grid>
        )
    }
}
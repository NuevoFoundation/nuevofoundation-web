import * as React from 'react';
import { Col, ControlLabel, FormControl, FormGroup, Grid, Row } from 'react-bootstrap';
import styled from 'styled-components';

const Title = styled.div`
  font-family: 'Lato', sans-serif;
  font-size:34px;
  font-weight:bold;
  padding-top:40px;
`

interface IContactState {
    name: string;
}
export class Contact extends React.Component<{}, IContactState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            name: ''
        }
    }

    public handleChange = (e: any) => {
        this.setState({ name: e.target.value });
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
                                    onChange={this.handleChange}
                                    value={this.state.name}
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
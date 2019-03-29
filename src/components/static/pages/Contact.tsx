import { send } from "emailjs-com";
import * as React from "react";
import {
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Grid,
  Row
} from "react-bootstrap";
import styled from "styled-components";

const Title = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 34px;
  font-weight: bold;
  padding-top: 40px;
  padding-bottom: 30px;
`;

const Space = styled.div`
  padding-bottom: 10px;
`;

const ContactInfo = styled.div`
  font-size: 18px;
`;

interface IContactState {
  email: string;
  message: string;
  name: string;
  subject: string;
}
const btnStyle = {
  backgroundColor: "#ABABAB",
  color: "#FFFFFF",
  fontSize: "15px",
  fontWeight: "bold",
  height: "40px",
  width: "160px"
} as React.CSSProperties;

export class Contact extends React.Component<{}, IContactState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      email: "",
      message: "",
      name: "",
      subject: ""
    };
  }

  public handleName = (e: any) => {
    this.setState({ name: e.target.value });
  };

  public handleEmail = (e: any) => {
    this.setState({ email: e.target.value });
  };

  public handleSubject = (e: any) => {
    this.setState({ subject: e.target.value });
  };
  public handleMessage = (e: any) => {
    this.setState({ message: e.target.value });
  };

  public handleSubmit = (e: any) => {
    e.preventDefault();
    const { name, email, subject, message } = this.state;
    if (name === "" || email === "" || subject === "" || message === "") {
      return;
    }

    const templateParams = {
      name: name,
      reply: email,
      subject: subject,
      message: message
    };

    this.sendFeedback("template_nt0OyEy1", templateParams);
  };

  public sendFeedback(templateId: string, templateParams: any) {
    send(
      "mailgun",
      templateId,
      templateParams,
      "user_WIHlUqAJII4vopia1uIUe"
    ).then(() => {
      this.setState({
        email: "",
        message: "",
        name: "",
        subject: ""
      });
    });
  }

  public render() {
    return (
      <Grid fluid={true}>
        <Row>
          <Col xs={12}>
            <Row>
              <Col xs={12} xsOffset={1}>
                <Title> Say Hello! </Title>
              </Col>
            </Row>
            <Row>
              <Col xs={10} xsOffset={1} sm={5} smOffset={1}>
                <form>
                  <FormGroup controlId="formBasicText">
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                      type="text"
                      name="name"
                      placeholder="Enter name"
                      onChange={this.handleName}
                      value={this.state.name}
                    />
                    <Space />
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                      type="email"
                      name="email"
                      placeholder="Enter valid email"
                      onChange={this.handleEmail}
                      value={this.state.email}
                    />
                    <Space />
                    <ControlLabel>Subject</ControlLabel>
                    <FormControl
                      type="text"
                      placeholder="What are you interested in?"
                      onChange={this.handleSubject}
                      value={this.state.subject}
                    />
                    <Space />
                    <FormControl
                      type="textarea"
                      style={{ height: "150px" }}
                      placeholder="Enter message"
                      onChange={this.handleMessage}
                      value={this.state.message}
                    />
                    <Space />
                    <Space />
                    <button
                      style={btnStyle}
                      className="btn-submit"
                      type="submit"
                      onClick={this.handleSubmit}
                    >
                      SEND
                    </button>
                  </FormGroup>
                </form>
              </Col>
              <Col xs={12} sm={5} smOffset={1}>
                <img src={""} />
              </Col>
            </Row>
            <Row>
              <Col xs={10} xsOffset={1}>
                <hr
                  style={{ height: "10px", borderTop: "2px solid #5D5D5D" }}
                />
              </Col>
              <Col xs={11} xsOffset={1}>
                <ContactInfo>
                  The Nuevo Foundation is based in Seattle, Washington.
                  <br />
                  <br />
                  To reach out with any other questions please contact:
                  <br />
                  <br />
                  Nuevo Foundation
                  <br />
                  <a href="mailto:contact@nuevofoundation.org" target="_top">
                    contact@nuevofoundation.org
                  </a>
                  <br />
                  <br />
                  <br />
                  <br />
                </ContactInfo>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}

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
import { Const } from '../../../Const';
import dummy from "../../../assets/images/home/1.png";
import ReactGA from 'react-ga';

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

const Header = styled.div`
    background-image: url(${dummy});
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position:center;
    background-size:cover;
    box-shadow:0 1px 0 black,0 2px 0 rgba(255,255,255,0.15);
    padding: 300px;
    font-size: 100px;
    text-align: center;
    color: white;

`;

const Background = styled.div`
  background-repeat: none;
  font-family: "Lato", sans-serif;
  
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
            email: '',
            message: '',
            name: '',
            subject: ''
        };
        ReactGA.pageview(Const.ContactPage);
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
      <Background>
        <Grid fluid={true}>
          <Row>
            <Col>
              <Header>
                <div className="logo">
                    <span>C</span>
                    <span>o</span>
                    <span>n</span>
                    <span>t</span>
                    <span>a</span>
                    <span>c</span>
                    <span>t</span>
                    <span>_</span>
                    <span>U</span>
                    <span>s</span>
                    <span className="blink">|</span>
                </div>
              </Header>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
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
      </Background>
    );
  }
}

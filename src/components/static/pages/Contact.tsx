import emailjs from '@emailjs/browser';
import * as React from "react";
import {
  Col,
  Form,
  Container,
  Image,
  Row
} from "react-bootstrap";
import styled from "styled-components";
import { Const } from '../../../Const';
import nuviMail from "../../../assets/images/nuvimail.png"
import ReactGA from 'react-ga';
import "../../../assets/stylesheets/Contact.css";
import { PageTitle } from "../common/PageTitle";

const Space = styled.div`
  padding-bottom: 10px;
`;

const ContactInfo = styled.div`
  font-size: 18px;
`;

const Background = styled.div`
  background-repeat: none;
  font-family: "Lato", sans-serif;

  form {
    border-radius: 5px;
    margin: 10px;
    margin-top: 25px;
    padding: 15px;
    border: 2px #707070 solid;
    float: center;
  }
`;

const FormTitle = styled.div`
  color: #000000;
  font-size: 28px;
  padding: 0 0 15px 0;
  font-family: 'Space Mono', monospace;
`

const ConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
  margin: 10px;
  border: 2px solid #707070;
  border-radius: 5px;
  padding: 15px;
  min-width: 350px;

  img {
    align-self: center;
  }
`

interface IContactState {
  email: string;
  message: string;
  name: string;
  subject: string;
  submitted: boolean;
}

const btnStyle = {
  backgroundColor: "#FFFFFF",
  color: "#000000",
  fontSize: "15px",
  fontWeight: "bold",
  height: "40px",
  width: "160px",
  border: "4px solid #FBC500",
  borderRadius: "5px",
} as React.CSSProperties;

export class Contact extends React.Component<{}, IContactState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      email: '',
      message: '',
      name: '',
      subject: '',
      submitted: false
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
  public handleToggle = (_e: any) => {
    this.setState({ submitted: false });
  }

  public handleSubmit = (e: any) => {
    e.preventDefault();
    const { name, email, subject, message } = this.state;
    if (name === "" || email === "" || subject === "" || message === "") {
      return;
    }

    const templateParams = {
      name: name,
      email: email,
      subject: subject,
      message: message
    };

    this.sendFeedback("template_7txsx24", templateParams);
  };

public sendFeedback(templateId: string, templateParams: any) {
  emailjs.send(
    "service_wdpyhgp",          // ✅ Your Service ID from EmailJS
    templateId,                 // ✅ Template ID (e.g., "template_7txsx24")
    templateParams,             // ✅ Must include { name, email, subject, message }
    "3YzjZvDYoArRahjiw"         // ✅ Your Public Key
  )
    .then(() => {
      // Email sent successfully
      this.setState({
        email: "",
        message: "",
        name: "",
        subject: "",
        submitted: true
      });
    })
    .catch((_err) => {
      // Email sending failed - could log to external service instead
      alert("Sorry, sending failed. Please try again or contact us directly.");
    });
}


  public render() {
    return (
      <React.Fragment>
        <PageTitle title={"Contact us"} />
        <Background>
          <Container fluid={true}>
            <Row>
              <Col xs={12}>
                <Row>
                  <Col sm={6} className="offset-sm-3">
                    {!this.state.submitted ? <form>


                      <FormTitle>Say hello!</FormTitle>
                      <Form.Group controlId="formBasicText">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Enter name"
                          onChange={this.handleName}
                          value={this.state.name}
                        />
                        <Space />
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter valid email"
                          onChange={this.handleEmail}
                          value={this.state.email}
                        />
                        <Space />
                        <Form.Label>Subject</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="What are you interested in?"
                          onChange={this.handleSubject}
                          value={this.state.subject}
                        />
                        <Space />
                        <Form.Control
                          as="textarea"
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
                      </Form.Group>
                    </form>
                      :
                      <ConfirmationContainer
                        onClick={this.handleToggle}
                      >
                        <FormTitle>Your message has been sent!</FormTitle>
                        <Image src={nuviMail} />
                      </ConfirmationContainer>
                    }
                  </Col>
                </Row>
                <Row>
                  <Col xs={10} className="offset-1">
                    <hr
                      style={{ height: "10px", borderTop: "2px solid #5D5D5D" }}
                    />
                  </Col>
                  <Col xs={11} className="offset-1">
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
          </Container>
        </Background>
      </React.Fragment>
    );
  }
}

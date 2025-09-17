import * as React from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { LoginForm } from "./LoginForm"
import { RegistrationForm } from "./RegistrationForm"

const ModalWrapper = styled.div`
  font-family: "Lato", sans-serif;
`;

const Span = styled.span`
  cursor:pointer;
  color:blue;
  text-decoration:none;  

  &:hover {
    text-decoration:underline;
  }
`;

export interface JwtAuthToken {
  token: string;
  refreshToken: string;
}

interface AuthenticationModalProps {
  toggleAuthentication: () => void;
  children?: React.ReactNode;
}

interface AuthenticationModalState {
  show: boolean;
  registration: boolean;
}

export class AuthenticationModal extends React.Component<AuthenticationModalProps, AuthenticationModalState> {
  constructor(props: AuthenticationModalProps) {
    super(props);

    this.state = {
      show: false,
      registration: true
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  switchAuthenticationForm = () => {
    this.setState({ registration: !this.state.registration });
  }

  handleSuccesfulAuthentication = () => {
    this.setState({
      show: false
    }, this.props.toggleAuthentication)
  }

  public render() {
    return (
      <ModalWrapper>
        <div onClick={this.handleShow}>
          {this.props.children}
        </div>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Body>
            {this.state.registration ? <RegistrationForm handleSuccessfulRegistration={this.handleSuccesfulAuthentication} /> : <LoginForm handleSuccessfulLogin={this.handleSuccesfulAuthentication} />}
            {this.state.registration ? <div>Already registered? <Span onClick={this.switchAuthenticationForm}>Login</Span></div> : <div>Don’t have an account? <Span onClick={this.switchAuthenticationForm}>Register</Span></div>}
          </Modal.Body>
        </Modal>
      </ModalWrapper>
    )
  }
}

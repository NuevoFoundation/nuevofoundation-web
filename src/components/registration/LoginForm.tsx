import * as React from "react";
import styled from "styled-components";
import { ServiceResolver } from "../../services/ServiceResolver";
import { JwtAuthToken } from "./AuthenticationModal";
import { SessionStorageHelper } from "../../helpers/SessionStorageHelper";

const FormTitle = styled.h4`
  text-align: center;
`;

const SubmitButton = styled.button`
  font-family: "Lato", sans-serif;
  background-color: #FCC600;
  color: #000000;
  padding: 11px 56px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  width: 100%;
  border: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;

  &:invalid {
    border: 1px solid #d93900;
  }
`;

const ValidationMessage = styled.div`
  color: #d93900;
`

export interface LoginFormProps {
  handleSuccessfulLogin: () => void;
}
export interface LoginFormState {
  email: string;
  password: string;
  validationMessage: string;
}

export interface LoginFormInterface {
  email: string;
  password: string;
}

export class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
  public authService = new ServiceResolver().AuthService();
  state = {
    email: '',
    password: '',
    validationMessage: ''
  }

  public handleLogin = async (e: any) => {
    e.preventDefault();
    const { email, password } = this.state;
    const login: LoginFormInterface = {
      email,
      password
    };


    try {
      const jwtToken: JwtAuthToken = await this.authService.login(login);
      SessionStorageHelper.StoreJwt(jwtToken);
      this.props.handleSuccessfulLogin();
    }
    catch (e) {
      this.setState({
        validationMessage: e.message
      })
    }
  }

  public handleInputChange = (e: any) => {
    this.setState<any>({
      [e.target.name]: e.target.value,
      validationMessage: ''
    })
  };

  public render() {
    return (
      <React.Fragment>
        <FormTitle>Educator Login</FormTitle>
        <form onSubmit={this.handleLogin} >
          <Input type="email" required={true} placeholder="Email Address" name={"email"} value={this.state.email} onChange={this.handleInputChange} />
          <Input type="password" required={true} placeholder="Password" name={"password"} value={this.state.password} onChange={this.handleInputChange} minLength={8} />
          <ValidationMessage>{this.state.validationMessage}</ValidationMessage>
          <br />
          <SubmitButton type="submit">
            Log in
          </SubmitButton>
        </form>
      </React.Fragment>
    )
  }
}

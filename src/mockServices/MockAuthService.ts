import { LoginFormInterface } from "../components/registration/LoginForm";
import { RegistrationFormInterface } from "../components/registration/RegistrationForm";
import { authenticationResponse } from "./responses/authentication";
import { JwtAuthToken } from "../components/registration/AuthenticationModal";

export class MockAuthService {
  public login(loginForm: LoginFormInterface): Promise<any> {
    return Promise.resolve(authenticationResponse);
  }

  public register(registration: RegistrationFormInterface): Promise<any> {
    return Promise.resolve(authenticationResponse);
  }

  public async refreshSession(jwtAuthToken: JwtAuthToken): Promise<any> {
    return Promise.resolve();
  }
}

import { LoginFormInterface } from "../components/registration/LoginForm";
import { RegistrationFormInterface } from "../components/registration/RegistrationForm";

export class MockAuthService {
  private headers = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8"
  };

  public login(
    loginForm: LoginFormInterface
  ): Promise<any> {
    return Promise.resolve();
  }

  public register(
    registration: RegistrationFormInterface
  ): Promise<any> {
    return Promise.resolve();
  }
}

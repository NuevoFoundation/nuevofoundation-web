import { Const } from "../Const";
import { HttpClient } from "./HttpClient";
import { LoginFormInterface } from "../components/registration/LoginForm";
import { RegistrationFormInterface } from "../components/registration/RegistrationForm";
import { JwtAuthToken } from "../components/registration/AuthenticationModal";

export class AuthService {
  private headers = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8"
  };

  public async login(loginForm: LoginFormInterface): Promise<any> {
    return HttpClient.post(
      `${Const.ApiEndpoint}/auth/login`,
      loginForm,
      this.headers
    );
  }

  public async register(
    registrationForm: RegistrationFormInterface
  ): Promise<any> {
    return HttpClient.post(
      `${Const.ApiEndpoint}/auth/register`,
      registrationForm,
      this.headers
    );
  }

  public async refreshSession(jwtAuthToken: JwtAuthToken): Promise<any> {
    return HttpClient.post(
      `${Const.ApiEndpoint}/auth/refresh`,
      jwtAuthToken,
      this.headers
    );
  }
}

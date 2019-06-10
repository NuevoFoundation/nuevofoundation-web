import { JwtAuthToken } from "../components/registration/AuthenticationModal";

export class SessionStorageHelper {
  static StoreJwt(jsonWebToken: JwtAuthToken) {
    const jwtData = this.StringifySessionData(jsonWebToken);
    localStorage.setItem("memberJwt", jwtData);
  }

  static GetJwt(): JwtAuthToken | undefined {
    const storedJwt = localStorage.getItem("memberJwt");
    let currentJwt;
    if (storedJwt !== null) {
      currentJwt = this.ParseSessionData(storedJwt) as JwtAuthToken;
    }

    return currentJwt;
  }

  static ParseSessionData(data: string): object {
    return JSON.parse(data);
  }

  static StringifySessionData(data: object): string {
    return JSON.stringify(data);
  }

  static DeleteJwt() {
    localStorage.removeItem("memberJwt");
  }
}

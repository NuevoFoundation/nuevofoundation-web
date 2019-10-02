import { JwtAuthToken } from "../components/registration/AuthenticationModal";

export class SessionStorageHelper {
  public static StoreJwt(jsonWebToken: JwtAuthToken) {
    const jwtData = this.StringifySessionData(jsonWebToken);
    localStorage.setItem("memberJwt", jwtData);
  }

  public static GetJwt(): JwtAuthToken | undefined {
    const storedJwt = localStorage.getItem("memberJwt");
    let currentJwt;
    if (storedJwt !== null) {
      currentJwt = this.ParseSessionData(storedJwt) as JwtAuthToken;
    }

    return currentJwt;
  }

  private static ParseSessionData(data: string): object {
    return JSON.parse(data);
  }

  private static StringifySessionData(data: object): string {
    return JSON.stringify(data);
  }

  public static DeleteJwt() {
    localStorage.removeItem("memberJwt");
  }
}

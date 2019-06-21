import { AuthService } from "../services/AuthService";
import { SessionStorageHelper } from "../helpers/SessionStorageHelper";
import { JwtTokenHelper } from "./JwtTokenHelper";
import { JwtAuthToken } from "../components/registration/AuthenticationModal";

export class AuthHeaderHelper {
  public static validAuthToken(token: string): boolean {
    if (JwtTokenHelper.jwtExpired(token) || token === null) {
      return false;
    } else {
      return true;
    }
  }

  public static async refreshAuthToken(request: Request): Promise<any> {
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const jwtAuthToken: JwtAuthToken = SessionStorageHelper.GetJwt()!;
    const authService = new AuthService();
    const newJwtAuthToken: JwtAuthToken = await authService.refreshSession(
      jwtAuthToken
    );
    SessionStorageHelper.StoreJwt(newJwtAuthToken);
    request.headers.set(`Authorization`, `Bearer ${newJwtAuthToken.token}`);
    return Promise.resolve();
  }

  public static async validateAuthorizationHeader(
    request: Request
  ): Promise<any> {
    const authorization = request.headers.get("Authorization");

    if (!authorization) {
      // Authorization header not present, return empty promise to caller
      return Promise.resolve();
    }

    const [type, token] = authorization.split(" ");

    if (type === "Bearer" && token !== undefined) {
      if (!AuthHeaderHelper.validAuthToken(token)) {
        return await AuthHeaderHelper.refreshAuthToken(request);
      }

      // Token is still valid, return empty promise to caller
      return Promise.resolve();
    }
  }
}

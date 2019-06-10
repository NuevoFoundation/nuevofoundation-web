export class JwtTokenHelper {
  public static decodeJwtObject(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jwtObject = JSON.parse(window.atob(base64));
    return jwtObject;
  }

  public static decodeMemberId(token: string): string {
    const jwtObject = this.decodeJwtObject(token);
    const userData = JSON.parse(jwtObject['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata']);
    return userData.id;
  }

  public static jwtExpired(token: string): boolean {
    const jwtObject = this.decodeJwtObject(token);
    // initialize date to unix epoch time with 'new Date(0)'
    // and set to 'jwtObject.exp' before comparing
    const currentTime = new Date().getTime();
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(jwtObject.exp);
    return currentTime >= expirationDate.getTime();
  }
}
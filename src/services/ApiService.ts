import { Const } from "../Const";
import { HttpClient } from "./HttpClient";
import { VirtualSessionInterface } from "../models/VirtualSession";
import { SessionStorageHelper } from "../helpers/SessionStorageHelper";
import { MemberInterface } from "../models/Member";
import { memberAuthenticated } from "../contexts/AuthContext";
import { MetaDataInterface } from "../models/MetaData";

export class ApiService {
  private headers = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    Authorization: `Bearer ${this.getJwtToken()}`
  };

  public getMetaData(): Promise<MetaDataInterface> {
    return HttpClient.get(`${Const.ApiEndpoint}/metadata`, this.headers);
  }

  public getMember(memberId: string): Promise<MemberInterface> {
    return HttpClient.get(
      `${Const.ApiEndpoint}/members/${memberId}`,
      this.headers
    );
  }

  public getVirtualSession(
    virtualSessionId: string
  ): Promise<VirtualSessionInterface> {
    return HttpClient.get(
      `${Const.ApiEndpoint}/virtualsessions/${virtualSessionId}`,
      this.headers
    );
  }

  public getAllVirtualSessions(
    memberId: string
  ): Promise<VirtualSessionInterface[]> {
    return HttpClient.get(
      `${Const.ApiEndpoint}/virtualsessions/${memberId}`,
      this.headers
    );
  }

  public createVirtualSession(
    virtualSession: VirtualSessionInterface
  ): Promise<VirtualSessionInterface> {
    return HttpClient.post(
      `${Const.ApiEndpoint}/virtualsessions`,
      virtualSession,
      this.headers
    );
  }

  public updateVirtualSession(
    id: string,
    virtualSession: VirtualSessionInterface
  ): Promise<VirtualSessionInterface> {
    return HttpClient.put(
      `${Const.ApiEndpoint}/virtualsessions/${id}`,
      virtualSession,
      this.headers
    );
  }

  private getJwtToken(): string {
    let token = "";
    if (memberAuthenticated) {
      /* eslint-disable @typescript-eslint/no-non-null-assertion */
      token = SessionStorageHelper.GetJwt()!.token;
    }
    return token;
  }
}

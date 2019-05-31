import { Const } from "../Const";
import { HttpClient } from "./HttpClient";
import { VirtualSessionInterface } from "../models/VirtualSession";

export class ApiService {
  private headers = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8"
  };

  public getVirtualSession(
    virtualSessionId: string
  ): Promise<VirtualSessionInterface> {
    return HttpClient.get(
      `${Const.ApiEndpoint}/virtualsessions/${virtualSessionId}`,
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
}

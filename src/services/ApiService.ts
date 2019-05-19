import { Const } from "../Const";
import { HttpClient } from "./HttpClient";
import { IVirtualSession } from '../models/VirtualSession';

export class ApiService {
  private headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  };

  public getVirtualSession(virtualSessionId: string): Promise<IVirtualSession> {
    return HttpClient.get(
      `${Const.ApiEndpoint}/virtualsessions/${virtualSessionId}`,
      this.headers
    );
  }

  public createVirtualSession(virtualSession: IVirtualSession): Promise<IVirtualSession> {
    return HttpClient.post(
      `${Const.ApiEndpoint}/virtualsessions`,
      virtualSession,
      this.headers
    );
  }

  public updateVirtualSession(id: string, virtualSession: IVirtualSession): Promise<IVirtualSession> {
    return HttpClient.put(
      `${Const.ApiEndpoint}/virtualsessions/${id}`,
      virtualSession,
      this.headers
    );
  }
}

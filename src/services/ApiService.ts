import { Const } from "../Const";
import { HttpClient } from "./HttpClient";
import { IVirtualSession } from '../models/VirtualSession';

export class ApiService {
  private headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  };

  public createVirtualSession(virtualSession: IVirtualSession): Promise<IVirtualSession> {
    return HttpClient.post(
      `${Const.ApiEndpoint}/virtualsessions`,
      virtualSession,
      this.headers
    );
  }
}

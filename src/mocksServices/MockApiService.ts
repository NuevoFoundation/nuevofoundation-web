/* eslint-disable @typescript-eslint/no-unused-vars */
import { IVirtualSession } from "../models/VirtualSession";
import uuid  from 'uuid/v1';


export class MockApiService {
  public createVirtualSession(virtualSession: IVirtualSession): Promise<IVirtualSession> {
    virtualSession.Id = uuid();
    return Promise.resolve(virtualSession);
  }
}

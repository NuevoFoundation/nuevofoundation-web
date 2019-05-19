/* eslint-disable @typescript-eslint/no-unused-vars */
import { IVirtualSession } from "../models/VirtualSession";
import uuid  from 'uuid/v1';
import { getVirtualSession } from "./responses/getVirtualSession";

export class MockApiService {
  public getVirtualSession(id: string): Promise<IVirtualSession> {
    getVirtualSession.id = id;
    return Promise.resolve(getVirtualSession);
  }

  public createVirtualSession(virtualSession: IVirtualSession): Promise<IVirtualSession> {
    virtualSession.id = uuid();
    return Promise.resolve(virtualSession);
  }

  public updateVirtualSession(id: string, virtualSession: IVirtualSession): Promise<IVirtualSession> {
    virtualSession.id = id;
    return Promise.resolve(virtualSession);
  }
}

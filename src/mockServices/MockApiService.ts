/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  getMetaData,
  getMember,
  getVirtualSession,
  getAllVirtualSessions
} from "./responses";
import { MetaDataInterface } from "../models/MetaData";
import { VirtualSessionInterface } from "../models/VirtualSession";
import { MemberInterface } from "../models/Member";

export class MockApiService {
  public getMetaData(): Promise<MetaDataInterface> {
    return Promise.resolve(getMetaData);
  }

  public getMember(memberId: string): Promise<MemberInterface> {
    return Promise.resolve(getMember);
  }

  public getVirtualSession(
    virtualSessionId: string
  ): Promise<VirtualSessionInterface> {
    return Promise.resolve(getVirtualSession);
  }

  public getAllVirtualSessions(
    memberId: string
  ): Promise<VirtualSessionInterface[]> {
    return Promise.resolve(getAllVirtualSessions);
  }

  public createVirtualSession(
    virtualSession: VirtualSessionInterface
  ): Promise<VirtualSessionInterface> {
    return Promise.resolve(getVirtualSession);
  }

  public updateVirtualSession(
    id: string,
    virtualSession: VirtualSessionInterface
  ): Promise<VirtualSessionInterface> {
    return Promise.resolve(getVirtualSession);
  }
}

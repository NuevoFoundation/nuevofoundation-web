/* eslint-disable @typescript-eslint/no-unused-vars */
import { VirtualSessionInterface } from "../models/VirtualSession";
import uuid from "uuid/v1";
import { getVirtualSession, getMember } from "./responses";
import { MemberInterface } from "../models/Member";

export class MockApiService {
  public getMember(id: string): Promise<MemberInterface> {
    getMember.id = id;
    return Promise.resolve(getMember);
  }

  public getVirtualSession(id: string): Promise<VirtualSessionInterface> {
    getVirtualSession.id = id;
    return Promise.resolve(getVirtualSession);
  }

  public createVirtualSession(
    virtualSession: VirtualSessionInterface
  ): Promise<VirtualSessionInterface> {
    virtualSession.id = uuid();
    return Promise.resolve(virtualSession);
  }

  public updateVirtualSession(
    id: string,
    virtualSession: VirtualSessionInterface
  ): Promise<VirtualSessionInterface> {
    virtualSession.id = id;
    return Promise.resolve(virtualSession);
  }
}

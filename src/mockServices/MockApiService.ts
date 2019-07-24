/* eslint-disable @typescript-eslint/no-unused-vars */
import { VirtualSessionInterface } from "../models/VirtualSession";
import uuid from "uuid/v1";
import { getVirtualSession, getMember } from "./responses";
import { MemberInterface } from "../models/Member";
import { getAllVirtualSessions } from "./responses/getAllVirtualSessions";

export class MockApiService {
  public getMember(id: string): Promise<MemberInterface> {
    getMember.id = id;
    return Promise.resolve(getMember);
  }

  public getVirtualSession(id: string): Promise<VirtualSessionInterface> {
    getVirtualSession.id = id;
    return Promise.resolve(getVirtualSession);
  }

  // TODO: fix these erors - promise should be getAllVirtualSessions[]?? Is this correct?
  public getAllVirtualSessions(memberId: string): Promise<VirtualSessionInterface[]>{
    getAllVirtualSessions[0].educatorId = memberId;
    return Promise.resolve(getAllVirtualSessions);
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

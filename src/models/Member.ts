import { ServiceResolver } from "../services/ServiceResolver";

export class Member {
  public apiService = new ServiceResolver().ApiService();
  public Id?: string;
  public FullName?: string;

  public constructor(id: string) {
    this.apiService.getMember(id).then(member => {
      this.Id = member.id;
      this.FullName = member.fullName;
    });
  }
}

export interface MemberInterface {
  id?: string;
  fullName?: string;
}

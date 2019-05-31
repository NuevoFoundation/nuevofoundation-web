export class VirtualSession {
  public Id?: string;
  public EducatorId?: string;
  public VolunteerId?: string;
  public TimePreferenceOne?: string;
  public TimePreferenceTwo?: string;
  public TimePreferenceThree?: string;
  public TimePreferenceSelected?: string;

  public constructor() {}
}

export interface VirtualSessionInterface {
  id?: string;
  educatorId?: string;
  volunteerId?: string;
  timePreferenceOne?: string;
  timePreferenceTwo?: string;
  timePreferenceThree?: string;
  timePreferenceSelected?: string;
}

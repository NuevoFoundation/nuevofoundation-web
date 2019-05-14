export class VirtualSession {
  public Id?: string; 
  public EducatorId?: string;
  public VolunteerId?: string;
  public TimePreferenceOne?: string;
  public TimePreferenceTwo?: string;
  public TimePreferenceThree?: string;

  constructor() {
    
  }
}

export interface IVirtualSession {
  Id?: string; 
  EducatorId?: string;
  VolunteerId?: string;
  TimePreferenceOne?: string;
  TimePreferenceTwo?: string;
  TimePreferenceThree?: string;
}
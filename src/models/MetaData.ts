export interface MetaDataInterface {
  impactStats?: ImpactStatInterface[];
  team?: TeamInterface[];
}

export interface TeamInterface {
  name: string;
  role: string;
  quote: string;
  description: string;
  cartoonImageUrl: string;
  realImageUrl: string;
}

export interface ImpactStatInterface {
  title: string;
  titleBoldened: string;
  stat: string;
  description: string;
}

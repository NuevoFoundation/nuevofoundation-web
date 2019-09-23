import { Const } from "../Const";
import { HttpClient } from "./HttpClient";
import { MetaDataInterface } from "../models/MetaData";

export class ApiService {
  private headers = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    Authorization: `Bearer `
  };

  public getMetaData(): Promise<MetaDataInterface> {
    return HttpClient.get(
      `${Const.ApiEndpoint}/metadata`,
      this.headers
    );
  }
}

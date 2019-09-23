/* eslint-disable @typescript-eslint/no-unused-vars */
import { getMetaData } from "./responses";
import { MetaDataInterface } from "../models/MetaData";

export class MockApiService {
  public getMetaData(): Promise<MetaDataInterface> {
    return Promise.resolve(getMetaData);
  }
}

import { MockWordpressService } from "../mocksServices/MockWordpressService";
import { WordpressService } from "./WordpressService";
import { ApiService } from "./ApiServices";
import { MockApiService } from "../mocksServices/MockApiService";

export class ServiceResolver {
  private UseMock: boolean = false;

  public WordpressService(): WordpressService | MockWordpressService {
    if (this.UseMock) {
      return new MockWordpressService();
    } else {
      return new WordpressService();
    }
  }

  public ApiService(): ApiService | MockApiService {
    if (this.UseMock) {
      return new MockApiService();
    } else {
      return new ApiService();
    }
  }
}

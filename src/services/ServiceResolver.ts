import { MockWordpressService, MockApiService } from "../mocksServices";
import { WordpressService, ApiService } from "./";

export class ServiceResolver {
  private UseMock: boolean = true;

  public WordpressService(): WordpressService | MockWordpressService {
    return this.UseMock ? new MockWordpressService() : new WordpressService();
  }

  public ApiService(): ApiService| MockApiService {
    return this.UseMock ? new MockApiService() : new ApiService();
  }
}

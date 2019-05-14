import { MockWordpressService, MockApiService } from "../mocksServices";
import { WordpressService, ApiService } from "./";

export class ServiceResolver {
  private UseMock: boolean = true;

  public WordpressService(): MockWordpressService | WordpressService {
    return this.UseMock ? new MockWordpressService() : new WordpressService();
  }

  public ApiService(): MockApiService | ApiService {
    return this.UseMock ? new MockApiService() : new ApiService();
  }
}

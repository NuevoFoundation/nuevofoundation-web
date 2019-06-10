import { MockWordpressService, MockApiService, MockAuthService } from "../mockServices";
import { WordpressService, ApiService, AuthService } from "./";

export class ServiceResolver {
  private UseMock: boolean = true;

  public WordpressService(): WordpressService | MockWordpressService {
    return this.UseMock ? new MockWordpressService() : new WordpressService();
  }

  public ApiService(): ApiService | MockApiService {
    return this.UseMock ? new MockApiService() : new ApiService();
  }

  public AuthService(): AuthService | MockAuthService {
    return this.UseMock ? new MockAuthService() : new AuthService();
  }
}

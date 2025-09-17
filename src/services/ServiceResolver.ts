import {
  MockWordpressService,
  MockApiService,
  MockAuthService
} from "../mockServices";
import { WordpressService, ApiService, AuthService } from "./";

export class ServiceResolver {
  private UseMock: boolean =
    process.env.REACT_APP_USE_MOCK_DATA === "true" ||
    (!process.env.NODE_ENV || process.env.NODE_ENV === "test");

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

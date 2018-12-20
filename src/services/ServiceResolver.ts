import { MockWordpressService } from "../mocksServices/MockWordpressService";
import { WordpressService } from "./WordpressService";

export class ServiceResolver {
    private UseMock: boolean = false;

    public WordpressService(): WordpressService | MockWordpressService {
        if (this.UseMock) {
          return new MockWordpressService();
        } else {
          return new WordpressService();
        }
      } 
}
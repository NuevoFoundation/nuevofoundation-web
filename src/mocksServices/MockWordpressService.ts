/* eslint-disable @typescript-eslint/no-unused-vars */
import { getPost, getPosts } from "./responses";

export class MockWordpressService {
  public getPublishedPosts(): Promise<any> {
    return Promise.resolve(getPosts);
  }

  public getPost(id: string): Promise<any> {
    return Promise.resolve(getPost);
  }
}

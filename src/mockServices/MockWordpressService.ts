/* eslint-disable @typescript-eslint/no-unused-vars */
import { getPost, getPosts } from "./responses";
import { WordpressPost, WordpressPostsResponse } from "../models/WordpressPost";

export class MockWordpressService {
  public getPublishedPosts(_page: number): Promise<WordpressPostsResponse> {
    return Promise.resolve(getPosts);
  }

  public getPost(id: string): Promise<WordpressPost> {
    return Promise.resolve(getPost);
  }
}

import { Const } from "../Const";
import { HttpClient } from "./HttpClient";
import { WordpressPost, WordpressPostsResponse } from "../models/WordpressPost";

export class WordpressService {
  private headers = {};

  public getPostsCount(): Promise<any> {
    return HttpClient.get(
      `${Const.WordpressEndpoint}/post-counts/post`,
      this.headers
    );
  }

  public getPublishedPosts(page: number): Promise<WordpressPostsResponse> {
    return HttpClient.get(
      `${Const.WordpressEndpoint}/posts?number=${
        Const.BlogPageSize
      }&page=${page}&status=publish`,
      this.headers
    );
  }

  public getPost(id: string): Promise<WordpressPost> {
    return HttpClient.get(
      Const.WordpressEndpoint + `/posts/${id}`,
      this.headers
    );
  }
}

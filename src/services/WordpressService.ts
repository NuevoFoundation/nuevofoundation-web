import { Const } from "../Const";
import { HttpClient } from "./HttpClient";

export class WordpressService {
  private headers = {};

  public getPostsCount(): Promise<any> {
    return HttpClient.get(
      `${Const.WordpressEndpoint}/post-counts/post`,
      this.headers
    );
  }

  public getPublishedPosts(page: number): Promise<any> {
    return HttpClient.get(`${Const.WordpressEndpoint}/posts?number=10&page=${page}&status=publish`, this.headers);
  }

  public getPost(id: string): Promise<any> {
    return HttpClient.get(
      Const.WordpressEndpoint + `/posts/${id}`,
      this.headers
    );
  }
}

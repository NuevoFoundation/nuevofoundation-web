import { Const } from "../Const";
import { HttpClient } from "./HttpClient";

export class WordpressService {
    private headers = {};

    public getPosts(): Promise<any> {
        return HttpClient.get(Const.WordpressEndpoint + '/posts', this.headers);
    }

    public getPost(id: string): Promise<any> {
        return HttpClient.get(Const.WordpressEndpoint + `/posts/${id}`, this.headers);
    }
}

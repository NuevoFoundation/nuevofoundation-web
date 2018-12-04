import { Const } from "../Const";
import { HttpClient } from "./httpClient";

export class WordpressService {
    private headers = {};

    public getPosts() {
        return HttpClient.get(Const.WordpressEndpoint + '/posts', this.headers);
    }
}

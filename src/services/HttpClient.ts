import { AuthHeaderHelper } from "../helpers/AuthHeaderHelper";

export class HttpClient {
  public static async makeRequest(request: Request): Promise<any> {
    await AuthHeaderHelper.validateAuthorizationHeader(request);
    const response = await fetch(request);

    if (!response.ok && response.type) {
      let text = await response.text();
      text = text ? JSON.parse(text) : {};
      return Promise.reject(text);
    }

    const text = await response.text();

    return text ? JSON.parse(text) : {};
  }

  public static get(endpoint: string, headers = {}): Promise<any> {
    const request = new Request(endpoint, {
      body: null,
      headers,
      method: "GET",
      mode: "cors"
    });

    return HttpClient.makeRequest(request);
  }

  public static post(endpoint: string, body: any, headers = {}): Promise<any> {
    const request = new Request(endpoint, {
      body: JSON.stringify(body),
      headers,
      method: "POST",
      mode: "cors"
    });

    return HttpClient.makeRequest(request);
  }

  public static put(endpoint: string, body: any, headers = {}): Promise<any> {
    const request = new Request(endpoint, {
      body: JSON.stringify(body),
      headers,
      method: "PUT",
      mode: "cors"
    });

    return HttpClient.makeRequest(request);
  }
}

export class HttpClient {
  public static async makeRequest(request: Request): Promise<any> {

    const response = await fetch(request);

    if (!response.ok && response.type) {
      throw new Error(response.statusText);
    }

    const text = await response.text();

    return text ? JSON.parse(text) : {};
  }

  public static get(endpoint: string, headers = {}): Promise<any> {
    const request = new Request(endpoint, {
      body: null,
      headers,
      method: 'GET',
      mode: 'cors'
    });

    return HttpClient.makeRequest(request);
  }
}
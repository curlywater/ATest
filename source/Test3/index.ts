import request from "./request";
interface ICache {
  [url: string]: Promise<any>;
}

class CachedRequest {
  private cache: ICache = {};

  private fetch = (url: string): ReturnType<typeof request> => {
    this.cache[url] = request(url);
    return this.cache[url];
  }

  public request: (url: string) => Promise<any> = async (url) => {
    const cache = this.cache[url];
    try {
      if (cache) {
        try {
          return await cache;
        } catch (err) {
          return await this.fetch(url);
        }
      } else {
        return await this.fetch(url);
      }
    } catch (err) {
      console.log(err);
    }
  };
}

const cacheRequest = new CachedRequest().request;
export default cacheRequest;


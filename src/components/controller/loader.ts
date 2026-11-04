import { HttpMethod, Callback } from '../../types';

// Утилита Partial делает все ключи необязательными
export type LoaderOptions = Partial<Record<string, string>>;

export interface IGetRespParams {
  endpoint: string;
  options?: LoaderOptions;
}

class Loader {
  private baseLink: string;
  private options: LoaderOptions;

  constructor(baseLink: string, options: LoaderOptions) {
    this.baseLink = baseLink;
    this.options = options;
  }

  public getResp<T>(
    { endpoint, options = {} }: IGetRespParams,
    callback: Callback<T> = () => {
      console.error('No callback for GET response');
    }
  ): void {
    // Используем Enum вместо обычной строки
    this.load<T>(HttpMethod.GET, endpoint, callback, options);
  }

  private errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) {
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      }
      throw Error(res.statusText);
    }
    return res;
  }

  private makeUrl(options: LoaderOptions, endpoint: string): string {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  private load<T>(
    method: HttpMethod, // Изменили string на Enum
    endpoint: string,
    callback: Callback<T>,
    options: LoaderOptions = {}
  ): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then((res) => this.errorHandler(res))
      .then((res) => res.json())
      .then((data: unknown) => {
        callback(data as T);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error(err);
        }
      });
  }
}

export default Loader;
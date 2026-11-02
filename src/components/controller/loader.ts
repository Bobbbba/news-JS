export interface ILoaderOptions {
  [key: string]: string;
}

export interface IGetRespParams {
  endpoint: string;
  options?: ILoaderOptions;
}

// 2. Описываем тип для коллбэка (используем дженерик)
export type Callback<T> = (data: T) => void;

class Loader {
    private baseLink: string;
    private options: ILoaderOptions;
    constructor(baseLink: string, options: ILoaderOptions) {
    this.baseLink = baseLink;
    this.options = options;
  }

     public getResp<T>(
        { endpoint, options = {} }: IGetRespParams,
    callback: Callback<T> = () => {
      console.error('No callback for GET response');
    }
  ): void {
    this.load<T>('GET', endpoint, callback, options);
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

  private makeUrl(options: ILoaderOptions, endpoint: string): string {
    const urlOptions: ILoaderOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  // 6. Дженерик <T> связывает ответ от сервера и коллбэк
  private load<T>(
    method: string,
    endpoint: string,
    callback: Callback<T>,
    options: ILoaderOptions = {}
  ): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then((res) => this.errorHandler(res))
      .then((res) => res.json())
      // 7. Используем unknown вместо any (по требованиям задания)
      .then((data: unknown) => {
        // Приводим тип, так как fetch возвращает любой JSON
        callback(data as T);
      })
      .catch((err: unknown) => {
        // В блоке catch ошибка всегда имеет тип unknown
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error(err);
        }
      });
  }
}

export default Loader;
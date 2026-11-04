export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface ISource {
  id: string | null; // 3. Тип объединения (string | null)
  name: string;
}

export interface IArticle {
  source: ISource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface INewsResponse {
  status: string;
  totalResults: number;
  articles: IArticle[];
}

export interface ISourcesResponse {
  status: string;
  sources: ISource[];
}

export type Callback<T> = (data: T) => void;

export const APP_CONFIG: Readonly<{ defaultPageSize: number }> = {
  defaultPageSize: 10,
};
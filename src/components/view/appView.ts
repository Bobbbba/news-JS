import News from './news/news';
import Sources from './sources/sources';
import { INewsResponse, ISourcesResponse, IArticle, ISource } from '../../types';

export class AppView {
  private news: News;
  private sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  // 1. Принимаем ответ от API с новостями
  public drawNews(data: INewsResponse): void {
    // Безопасно достаем массив статей (если data.articles нет, берем пустой массив)
    const values: IArticle[] = data?.articles ? data.articles : [];
    this.news.draw(values);
  }

  // 2. Принимаем ответ от API с источниками
  public drawSources(data: ISourcesResponse): void {
    const values: ISource[] = data?.sources ? data.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
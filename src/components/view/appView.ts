import News from './news/news';
import Sources from './sources/sources';
import { IArticle, ISource } from '../../types'; // Импортируем только массивы

export class AppView {
  private news: News;
  private sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  // Теперь принимаем просто массив статей
  public drawNews(articles: IArticle[]): void {
    this.news.draw(articles);
  }

  // Теперь принимаем просто массив источников
  public drawSources(sources: ISource[]): void {
    this.sources.draw(sources);
  }
}

export default AppView;
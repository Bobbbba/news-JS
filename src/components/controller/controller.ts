import AppLoader from './appLoader';
import { ISource, IArticle, Callback } from '../../types';

class AppController extends AppLoader {
  // Здесь коллбэк ждет массив ISource[]
  public getSources(callback: Callback<ISource[]>): void {
    super.getResp<{ sources: ISource[] }>( // Указываем Loader'у, что придет объект с полем sources
      {
        endpoint: 'sources',
      },
      (data) => callback(data.sources) // Передаем в коллбэк только массив!
    );
  }

  public getNews(e: Event, callback: Callback<IArticle[]>): void {
    let target = e.target as HTMLElement;
    const newsContainer = e.currentTarget as HTMLElement;

    while (target && target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');
        
        if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          
          super.getResp<{ articles: IArticle[] }>( // Указываем Loader'у, что придет объект с полем articles
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            (data) => callback(data.articles) // Передаем в коллбэк только массив!
          );
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;

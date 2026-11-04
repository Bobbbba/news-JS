import AppLoader from './appLoader';
import { ISource, IArticle, Callback } from '../../types';

class AppController extends AppLoader {
    // 1. Типизируем коллбэк через наш дженерик из types.ts
    public getSources(callback: Callback<ISource[]>): void {
        super.getResp<ISource[]>( // 2. Передаем дженерик в Loader
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: Event, callback: Callback<IArticle[]>): void {
        // 3. Безопасно приводим типы для DOM-элементов
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        // 4. Проверяем, что target существует (защита от null)
        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    
                    super.getResp<IArticle[]>( // 5. Снова используем дженерик
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            // 6. Приводим parentNode к HTMLElement (или null)
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;

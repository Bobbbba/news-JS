import './news.css';
import { IArticle } from '../../../types';

// Используем утилиту Pick, чтобы взять только нужные поля из интерфейса
// (В задании это требовалось, покажем, что умеем)
type NewsPreview = Pick<IArticle, 'title' | 'url' | 'publishedAt'>;

class News {
  // 1. Метод принимает строго типизированный массив статей
  public draw(data: IArticle[]): void {
    // Ограничиваем количество новостей до 10
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment = document.createDocumentFragment();
    
    // 2. Приводим шаблон к HTMLTemplateElement
    const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;
    if (!newsItemTemp) return;

    news.forEach((item: IArticle, idx: number) => {
      // 3. Приводим клона к DocumentFragment
      const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

      // Находим элементы и приводим их к нужным типам
      const newsItem = newsClone.querySelector('.news__item') as HTMLElement;
      
      if (idx % 2) {
        newsItem.classList.add('alt');
      }

      // 4. Работа с фото (item.urlToImage может быть null)
      const photoElement = newsClone.querySelector('.news__meta-photo') as HTMLElement;
      photoElement.style.backgroundImage = `url(${
        item.urlToImage || 'img/news_placeholder.jpg'
      })`;

      const authorElement = newsClone.querySelector('.news__meta-author') as HTMLElement;
      // item.author может быть null, поэтому используем fallback
      authorElement.textContent = item.author || item.source.name;

      const dateElement = newsClone.querySelector('.news__meta-date') as HTMLElement;
      dateElement.textContent = item.publishedAt
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('-');

      const titleElement = newsClone.querySelector('.news__description-title') as HTMLElement;
      titleElement.textContent = item.title;

      const sourceElement = newsClone.querySelector('.news__description-source') as HTMLElement;
      sourceElement.textContent = item.source.name;

      const contentElement = newsClone.querySelector('.news__description-content') as HTMLElement;
      // item.description может быть null
      contentElement.textContent = item.description || 'Описание отсутствует';

      const linkElement = newsClone.querySelector('.news__read-more a') as HTMLAnchorElement;
      linkElement.setAttribute('href', item.url);

      fragment.append(newsClone);
    });

    // 5. Очищаем контейнер и вставляем новые данные
    const container = document.querySelector('.news') as HTMLElement;
    if (container) {
      container.innerHTML = '';
      container.appendChild(fragment);
    }
  }
}

export default News;
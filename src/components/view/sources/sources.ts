import './sources.css';
import { ISource } from '../../../types';

class Sources {
  // 1. Типизируем входящие данные через наш интерфейс
  public draw(data: ISource[]): void {
    const fragment = document.createDocumentFragment();
    
    // 2. Указываем TypeScript, что это шаблон (HTMLTemplateElement)
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
    
    // Защита от null (если шаблон вдруг удален из HTML)
    if (!sourceItemTemp) return;

    data.forEach((item) => {
      // 3. cloneNode возвращает Node, приводим к DocumentFragment для удобства
      const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

      // 4. Находим элементы внутри клона и приводим их к HTMLElement
      const nameElement = sourceClone.querySelector('.source__item-name') as HTMLElement;
      const itemElement = sourceClone.querySelector('.source__item') as HTMLElement;

      nameElement.textContent = item.name;
      
      // 5. item.id может быть null (по нашему интерфейсу), поэтому приводим к строке
      if (item.id) {
        itemElement.setAttribute('data-source-id', item.id);
      }

      fragment.append(sourceClone);
    });

    // 6. Приводим контейнер к HTMLElement
    const container = document.querySelector('.sources') as HTMLElement;
    if (container) {
      container.append(fragment);
    }
  }
}

export default Sources;

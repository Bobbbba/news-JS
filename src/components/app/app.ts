import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IArticle, ISource } from '../../types'; // Импортируем наши интерфейсы

class App {
  private controller: AppController;
  private view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start(): void {
    const sourcesContainer = document.querySelector('.sources');
    
    // Проверяем, что элемент существует, чтобы избежать ошибки (Null check)
    if (sourcesContainer) {
      sourcesContainer.addEventListener('click', (e: Event) => {
        // Приводим e.target к HTMLElement, так как мы кликаем по DOM-элементу
        this.controller.getNews(e, (data: IArticle[]) => this.view.drawNews(data));
      });
    }

    this.controller.getSources((data: ISource[]) => this.view.drawSources(data));
  }
}

export default App;

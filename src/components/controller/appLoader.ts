import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        // Вставьте ваш настоящий ключ вместо 'ВАШ_КЛЮЧ_ЗДЕСЬ'
        super('https://rss-news-api.onrender.com/', {
            apiKey: '25117b1fe2f740829c0564ea9ef03ba3', 
        });
    }
}

export default AppLoader;
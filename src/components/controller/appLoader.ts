import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        // Используем оператор "!" (non-null assertion) или приведение типов
        const apiUrl = process.env.API_URL as string;
        
        super(apiUrl, {
            // apiKey: process.env.API_KEY as string,
        });
    }
}

export default AppLoader;
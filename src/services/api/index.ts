/*
    Este archivo (index.ts) sirve como punto de entrada para la configuración de Axios.
*/

// Importación de la instancia de Axios configurada
import api from './instance';
// Importación de funciones para configurar interceptores
import { setupResponseInterceptor, setupErrorInterceptor } from './interceptors';

// Configuración de interceptores para la instancia de Axios
setupResponseInterceptor(api); // Configura el interceptor para gestionar las respuestas
setupErrorInterceptor(api); // Configura el interceptor para gestionar los errores

export default api; // Exporta la instancia de Axios configurada y lista para ser utilizada

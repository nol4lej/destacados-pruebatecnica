import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { handleResponse, handleError } from './handlers';  // Importamos las funciones de manejo de respuestas y errores desde './handlers', y la interfaz 'ErrorResponseOptions' para tipar AxiosError
import { ErrorResponseOptions } from '@interfaces/api';

// Función para configurar interceptores de respuestas y errores
export const setupInterceptors = (instance: AxiosInstance) => {

    // Configurar interceptor de respuestas
    instance.interceptors.response.use(

        (response: AxiosResponse) => {
            // Llamar a la función de manejo de respuestas exitosas
            return handleResponse(response);
        },

        (error: AxiosError<ErrorResponseOptions>) => {
            // Llamar a la función de manejo de errores
            return handleError(error);
        }
    );
};

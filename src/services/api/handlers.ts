import { AxiosError, AxiosResponse } from 'axios';

/*
  Este archivo (handlers.ts) se utiliza para gestionar el manejo de errores desde los interceptores.
*/

// Definición de las opciones para manejar respuestas de error
export interface ErrorResponseOptions {
  error?: string;
  message?: string;
}

// Función para manejar respuestas exitosas
export const handleResponse = <T>(response: AxiosResponse<T>): T => {
  // Verificar si la respuesta está en el rango de éxito (200-299)
  if (response.status >= 200 && response.status < 300) {
    // Retornar los datos de la respuesta exitosa
    return response.data;
  }
  // Si la respuesta no está en el rango esperado, lanzar un error
  throw new Error(`Request failed with status: ${response.status}, ${response.statusText}`);
};

// Función para manejar errores de red y de servidor
export const handleError = (error: AxiosError<ErrorResponseOptions>): never => { // 'never' se utiliza para indicar que una función arrojará una excepción y nunca retornará un valor normalmente.
  // Manejo de error si existe una respuesta del servidor
  if (error.response) {
    // Obtener el mensaje de error desde los datos de la respuesta o usar uno predeterminado
    const errorMessage = error.response.data.error || error.response.data.message || 'Error with the response';
    // Registrar el error en la consola junto con el estado HTTP
    console.error({
      'error': errorMessage,
      'status': error.response.status
    });
    // Lanzar un nuevo error con el mensaje obtenido
    throw new Error(errorMessage);
  }
  // Manejo de error si la solicitud fue realizada pero no se obtuvo respuesta del servidor
  else if (error.request) {
    // Obtener el mensaje de error desde la respuesta de la solicitud o usar uno predeterminado
    const errorMessage: string = error.request.response.error || error.request.statusText || 'No response received from the server';
    // Registrar el error en la consola junto con el estado de la solicitud
    console.error({
      'error': errorMessage,
      'status': error.request.status
    });
    // Lanzar un nuevo error con el mensaje obtenido
    throw new Error(errorMessage);
  }
  // Manejo de error si ocurrió un error desconocido
  else {
    // Obtener el mensaje de error del propio objeto de error o usar uno predeterminado
    const errorMessage = error.message || 'Unknown error occurred';
    // Registrar el mensaje de error en la consola
    console.error('Error Message:', errorMessage);
    // Lanzar un nuevo error con el mensaje obtenido
    throw new Error(errorMessage);
  }
};

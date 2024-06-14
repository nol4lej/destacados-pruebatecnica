import { AxiosError, AxiosResponse } from 'axios';

interface ErrorResponseOptions {
  error?: string;
  message?: string;
}

// Función para manejar respuestas exitosas
export const handleResponse = <T>(response: AxiosResponse<T>): T => {

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new Error(`Request failed with status: ${response.status}, ${response.statusText}`);

};

// Función para manejar errores de red y de servidor
export const handleError = (error: AxiosError<ErrorResponseOptions>): never => {

  if (error.response) {

    const errorMessage = error.response.data.error || error.response.data.message || 'Error with the response';
    console.error({
      'error': errorMessage,
      'status': error.response.status
    });
    throw new Error(errorMessage);

  } else if (error.request) {

    const errorMessage: string = error.request.response.error || error.request.statusText || 'No response received from the server';
    console.error({
      'error': errorMessage,
      'status': error.request.status
    });
    throw new Error(errorMessage);

  } else {

    const errorMessage = error.message || 'Unknown error occurred';
    console.error('Error Message:', errorMessage);
    throw new Error(errorMessage);

  }
};
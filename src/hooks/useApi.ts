import { useState } from 'react';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import api from '@services/api';
import { ErrorResponseOptions, ApiResponse, UseApiReturnType } from '@interfaces/api';

const useApi = (): UseApiReturnType => {
  // Estado local para almacenar la respuesta, error y estado de carga
  const [response, setResponse] = useState<UseApiReturnType['response']>({
    data: null,
    error: null,
    loading: false
  });

  // Función para enviar una solicitud API
  const sendRequest = async (config: AxiosRequestConfig) => {
    setResponse({ data: null, error: null, loading: true }); // Iniciar estado de carga

    try {
      // Enviar la solicitud API utilizando la instancia configurada de Axios (por defecto es GET)
      const response: AxiosResponse<ApiResponse> = await api.request<ApiResponse>(config);
      console.log(response.data);

      // Actualizar el estado con los datos recibidos y sin errores
      setResponse({ data: response.data, error: null, loading: false });
      return response.data;

    } catch (error) {

      console.error(error);

      // Actualizar el estado con error capturado y sin datos nuevos
      setResponse({ data: null, error: error as AxiosError<ErrorResponseOptions>, loading: false });
    }
  };

  // Devolver el estado actualizado y la función para enviar solicitudes API
  return { response, sendRequest };
};

export default useApi;
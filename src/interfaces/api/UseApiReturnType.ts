import { AxiosError, AxiosRequestConfig } from "axios";
import { ApiResponse } from "./DataResponseOptions";
import { ErrorResponseOptions } from "./ErrorResponseOptions";

// Definición del tipo de retorno de la función useApi
export interface UseApiReturnType {
    response: {
        data: ApiResponse | null; // Datos de la respuesta API
        error: AxiosError<ErrorResponseOptions> | null; // Error de respuesta API
        loading: boolean; // Indicador de carga
    };
    sendRequest: (config: AxiosRequestConfig) => Promise<void>; // Función para enviar una solicitud API
}
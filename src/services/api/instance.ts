import axios, { AxiosInstance } from "axios";

// Creamos una instancia de Axios utilizando axios.create().
// Esto nos permite configurar opciones específicas para esta instancia.
const api: AxiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json'  // Configuramos el encabezado Content-Type para todas las solicitudes como application/json
    },
});

export default api;  // Exportamos la instancia de Axios configurada como api para que pueda ser utilizada en otros archivos

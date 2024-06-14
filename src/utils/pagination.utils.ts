export const getCurrentPage = () => {
    // Obtener los parámetros de la URL actual
    const params = new URLSearchParams(window.location.search);
    
    // Obtener el valor del parámetro 'page' de los parámetros de la URL
    // Si el parámetro 'page' no está definido, devuelve '1' como valor por defecto
    return params.get('page') || '1';
}

export const updateUrlParams = (url: string) => {
    // Obtener los parámetros de la URL actual
    const params = new URLSearchParams(window.location.search);
    
    // Obtener el valor del parámetro 'page' de la nueva URL especificada
    const nextPage = new URL(url).searchParams.get('page') || '1';
    
    // Actualizar el parámetro 'page' en los parámetros de la URL actual
    params.set('page', nextPage);
    
    // Construir la nueva URL con los parámetros actualizados
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    
    // Actualizar la URL en la barra de direcciones del navegador sin recargar la página
    window.history.pushState(null, '', newUrl);
}

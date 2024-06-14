import Card from "@components/Card";
import useApi from "@hooks/useApi";
import { Character } from "@interfaces/api";
import { useEffect, useState } from "react";
import './index.css';
import { FilterState, PageInfoOptions } from "@interfaces/components";
import Filter from "@components/Filter";
import { filterCharacters, sortCharacters } from "@utils/character.utils";
import { getCurrentPage, updateUrlParams } from "@utils/pagination.utils";
import ENV from "@config/env";

/* 
   Componente HomePage que muestra una lista de personajes obtenidos desde una API.
   Incluye funcionalidad para cargar los datos, filtrarlos por estado y especie,
   y ordenarlos por género y nombre. Utiliza el componente Filter para gestionar
   los filtros y Card para mostrar cada personaje en una tarjeta.
*/

const CharacterGallery = () => {

    // Utiliza el hook useApi para manejar las solicitudes a la API
    const { response, sendRequest } = useApi();
    
    // Estado para almacenar el filtro actual de estado y especie
    const [filter, setFilter] = useState<FilterState>({ status: '', species: '' });
    
    // Estado para almacenar la URL de la página actual de la API de personajes
    const [currentPageUrl, setCurrentPageUrl] = useState<string>(ENV.CHARACTER_URL + `?page=${getCurrentPage()}`);
    
    // Estado para almacenar la información de la página actual (conteo, páginas, siguiente y anterior)
    const [pageInfo, setPageInfo] = useState<PageInfoOptions>({
        count: 0,
        pages: 0,
        next: null,
        prev: null
    });
  
    // Efecto para cargar datos de personajes al montar el componente o cuando cambia la página actual
    useEffect(() => {  
        fetchData();
        // Desactiva temporalmente la regla de ESLint react-hooks/exhaustive-deps
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPageUrl]); // Vacío para que se ejecute solo una vez al montar el componente
  
    // Función asincrónica para enviar la solicitud a la API y actualizar el estado con los datos obtenidos
    const fetchData = async () => {
        try {
            const result = await sendRequest({ url: currentPageUrl });
            
            if (result && result.info) {
                // Actualiza la información de la página con los datos recibidos
                setPageInfo({
                    count: result.info.count,
                    pages: result.info.pages,
                    next: result.info.next,
                    prev: result.info.prev
                });
            }
        } catch (error) {
            console.error('Error al hacer la solicitud:', error);
        }
    };

    // Función para manejar cambios en el filtro desde el componente Filter
    const handleFilterChange = (newFilter: FilterState) => {
        setFilter(newFilter);
    };

    // Función para manejar cambios de página (anterior/siguiente)
    const handlePageChange = (url: string) => {
        setCurrentPageUrl(url); // Actualiza la URL de la página actual
        updateUrlParams(url); // Actualiza los parámetros de la URL en la barra de direcciones
    };

    return (
        <div className="character-gallery-container">
            {response.loading && <p className="message">Cargando...</p>}
            {response.error && <p className="message">Error: {response.error.message}</p>}
            {response.data && (
                <div className="cards-container">
                    <Filter onFilterChange={handleFilterChange} />
                    <div className="cards-container">
                        {sortCharacters(filterCharacters(response.data.results, filter))
                            .map((char: Character) => (
                                <Card key={char.id} character={char} />
                            ))}
                    </div>
                    <div className="pagination-buttons">
                        {pageInfo.prev && (
                            <button onClick={() => handlePageChange(pageInfo.prev!)}>
                                Anterior
                            </button>
                        )}
                        {pageInfo.next && (
                            <button onClick={() => handlePageChange(pageInfo.next!)}>
                                Siguiente
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CharacterGallery;
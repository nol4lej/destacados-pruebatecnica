import { useEffect, useState } from 'react';
import './index.css';
import Card from "@components/Card";
import useApi from "@hooks/useApi";
import { Character } from "@interfaces/api";
import { FilterState, PageInfoOptions } from "@interfaces/components";
import Filter from "@components/Filter";
import { filterCharacters, sortCharacters } from "@utils/character.utils";
import { getCurrentPage, updateUrlParams } from "@utils/pagination.utils";
import ENV from "@config/env";
import Loader from "@components/Loader";
import Pagination from "@components/Pagination";

const CharacterGallery = () => {
    
    // Estado y funciones para la gestión de la API y la paginación
    const { response, sendRequest } = useApi();
    const [filter, setFilter] = useState<FilterState>({ status: '', species: '' });
    const [currentPage, setCurrentPage] = useState<number>(parseInt(getCurrentPage())); // Mantenemos currentPage como número
    const [pageInfo, setPageInfo] = useState<PageInfoOptions>({
        count: 0,
        pages: 0,
        next: null,
        prev: null
    });

    // Efecto para cargar datos cuando currentPage cambia
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    // Función asincrónica para obtener datos de la API
    const fetchData = async () => {
        try {
            const result = await sendRequest({ url: `${ENV.CHARACTER_URL}?page=${currentPage}` });
            if (result && result.info) {
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

    // Función para manejar cambios en el filtro
    const handleFilterChange = (newFilter: FilterState) => {
        setFilter(newFilter);
        // Al cambiar el filtro, volvemos a la primera página
        setCurrentPage(1);
    };

    // Función para manejar cambios de página
    const handlePageChange = (page: number) => {
        setCurrentPage(page); // Actualizamos la página actual
        updateUrlParams(`${ENV.CHARACTER_URL}?page=${page}`); // Actualizamos la URL con la página nueva
    };

    return (
        <div className="character-gallery-container">

            {response.loading && <Loader />}

            {response.error && (
                <div className="message error-message">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64" className="error-icon">
                        <path d="M12 1C5.92 1 1 5.92 1 12s4.92 11 11 11 11-4.92 11-11S18.08 1 12 1zm0 19.5c-4.14 0-7.5-3.36-7.5-7.5S7.86 5.5 12 5.5s7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5zM12 9c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1s1-.45 1-1v-6c0-.55-.45-1-1-1zm0 11c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                    </svg>
                    <p>¡Oops! Hubo un problema al cargar los personajes. Por favor, inténtalo de nuevo más tarde.</p>
                </div>
            )}

            {response.data && (
                <div >
                    <Filter onFilterChange={handleFilterChange} />
                    <div className="cards-container">
                        {sortCharacters(filterCharacters(response.data.results, filter)).map((char: Character) => (
                            <Card key={char.id} character={char} />
                        ))}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={pageInfo.pages}
                        onPageChange={handlePageChange}
                    />
                </div>

            )}
        </div>
    );
};

export default CharacterGallery;

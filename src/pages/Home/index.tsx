import Card from "@components/Card";
import useApi from "@hooks/useApi";
import { Character } from "@interfaces/api";
import { useEffect, useState } from "react";
import './index.css';
import { FilterState } from "@interfaces/components";
import Filter from "@components/Filter";
import { filterCharacters, sortCharacters } from "@utils/character.utils";

/* 
   Componente HomePage que muestra una lista de personajes obtenidos desde una API.
   Incluye funcionalidad para cargar los datos, filtrarlos por estado y especie,
   y ordenarlos por género y nombre. Utiliza el componente Filter para gestionar
   los filtros y Card para mostrar cada personaje en una tarjeta.
*/

const CHARACTER_URL = `${import.meta.env.VITE_CHARACTER_URL}`;

const HomePage = () => {

    const { response, sendRequest } = useApi();
    const [filter, setFilter] = useState<FilterState>({ status: '', species: '' });
  
    // Efecto para cargar datos de personajes al montar el componente
    useEffect(() => {  
        fetchData();
        // desactivar temporalmente la regla de ESLint react-hooks/exhaustive-deps
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Vacío para que se ejecute solo una vez al montar el componente
  
    const fetchData = async () => {
        try {
            await sendRequest({ url: CHARACTER_URL });
        } catch (error) {
            console.error('Error al hacer la solicitud:', error);
        }
    };

    // Función para manejar cambios en el filtro desde el componente Filter
    const handleFilterChange = (newFilter: FilterState) => {
        setFilter(newFilter);
    };

    return (
        <div className="homepage-container">
            {response.loading && <p className="message">Cargando...</p>}
            {response.error && <p className="message">Error: {response.error.message}</p>}
            {response.data && (
                <div className="cards-container">
                    <Filter onFilterChange={handleFilterChange} />
                    <div className="cards-container">
                        {
                            sortCharacters(
                                filterCharacters(response.data.results, filter)
                            ).map((char: Character) => (
                                <Card key={char.id} character={char} />
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePage;
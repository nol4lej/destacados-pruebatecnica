import { ChangeEvent, useState } from 'react';
import './index.css'; // Importa tu archivo CSS de estilos aquí
import { FilterState } from '@interfaces/components';

/* 
   Este componente representa los filtros de estado y especie para los personajes.
   Cuando se selecciona una opción en cualquiera de los selectores, se actualiza el
   estado local y se notifica al componente padre a través de la función onFilterChange.
*/

interface FilterProps {
    onFilterChange: (newFilter: FilterState) => void; // Propiedad que maneja el cambio en el filtro
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {

    // Estado local para el filtro de estado y especie
    const [filter, setFilter] = useState<FilterState>({
        status: '',
        species: ''
    });

    // Maneja el cambio en los selectores de estado y especie
    const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFilter(prevFilter => ({
            ...prevFilter,
            [name]: value
        }));
        // Llama a la función prop onFilterChange para pasar el nuevo filtro
        onFilterChange({ ...filter, [name]: value });
    };

    return (
        <div className="filters">
            <label>
                Status:
                <select name="status" value={filter.status} onChange={handleFilterChange}>
                    <option value="">Todos</option>
                    <option value="Alive">Vivo</option>
                    <option value="Dead">Muerto</option>
                </select>
            </label>
            <label>
                Species:
                <select name="species" value={filter.species} onChange={handleFilterChange}>
                    <option value="">Todas</option>
                    <option value="Human">Humano</option>
                    <option value="Alien">Alienígena</option>
                </select>
            </label>
        </div>
    );
};

export default Filter;
import { useState } from 'react';
import './index.css';

interface PaginationProps {
    currentPage: number; // Número de la página actual
    totalPages: number; // Número total de páginas disponibles
    onPageChange: (page: number) => void; // Función callback para cambiar de página
}

// Definición del componente Pagination como una función de componente React
const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    // Estado local para almacenar el número de página ingresado por el usuario
    const [inputPage, setInputPage] = useState('');

    // Función para manejar el cambio en el campo de entrada
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPage(e.target.value);
    };

    // Función para manejar el envío del formulario del campo de entrada
    const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const pageNumber = parseInt(inputPage);
        // Verificar que el número de página ingresado esté dentro del rango válido
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            // Llamar a la función onPageChange para cambiar a la página ingresada
            onPageChange(pageNumber);
            // Limpiar el campo de entrada después de enviar el formulario
            setInputPage('');
        }
    };

    return (
        <div className="pagination-container">
            <div className="pagination">
                <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
                    Primera
                </button>
                <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Anterior
                </button>
                <span>
                    Página {currentPage} de {totalPages}
                </span>
                <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Siguiente
                </button>
                <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
                    Última
                </button>
            </div>
            <div className="pagination">
                <form onSubmit={handleInputSubmit}>
                    <input type="text" value={inputPage} onChange={handleInputChange} placeholder='Ingresa una página' className='pagination-input'/>
                    <button type="submit">Ir</button>
                </form>
            </div>

        </div>
    );
};

export default Pagination;

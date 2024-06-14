import { useState } from 'react';
import { CardProps } from '@interfaces/components';
import './index.css';

const Card: React.FC<CardProps> = ({ character }) => {

    // Estado para manejar la visibilidad del detalle del personaje
    const [showDetail, setShowDetail] = useState<boolean>(false);

    // Función para alternar la visibilidad del detalle del personaje
    const toggleDetail = () => {
        setShowDetail(!showDetail);
    };

    return (
        <div className="card">
            <img src={character.image} alt={character.name} className="card-image" />
            <div className="card-name">{character.name}</div>
            {showDetail && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{character.name}</h2>
                        {/* <p>{character.description}</p> */}
                        <button onClick={toggleDetail} className="close-button">Close</button>
                    </div>
                </div>
            )}
            <button onClick={toggleDetail} className="detail-button">View Details</button>
        </div>
    );
};

export default Card;

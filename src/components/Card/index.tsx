import { useState } from 'react';
import { CardProps } from '@interfaces/components';
import './index.css';

const Card: React.FC<CardProps> = ({ character }) => {
    const [showDetail, setShowDetail] = useState<boolean>(false);

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
                        <div className="modal-image">
                            <img src={character.image} alt={character.name} />
                        </div>
                        <div className="modal-details">
                            <h2>{character.name}</h2>
                            <p><strong>Gender:</strong> {character.gender}</p>
                            <p><strong>Species:</strong> {character.species}</p>
                            <p><strong>Status:</strong> {character.status}</p>
                            <p><strong>Location:</strong> {character.location.name}</p>
                            <p><strong>Origin:</strong> {character.origin.name}</p>
                        </div>
                        <button onClick={toggleDetail} className="close-button">Cerrar</button>
                    </div>
                </div>
            )}
            <button onClick={toggleDetail} className="detail-button">
                Ver detalles
            </button>
        </div>
    );
};

export default Card;

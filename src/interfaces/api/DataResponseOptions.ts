/*
    Definición de las opciones para manejar respuestas resueltas
*/

interface Info {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}

interface Origin {
    name: string;
    url: string;
}

interface Location {
    name: string;
    url: string;
}

interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Origin;
    location: Location;
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export interface ApiResponse {
    info: Info;
    results: Character[];
}

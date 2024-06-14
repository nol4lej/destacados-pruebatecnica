# Rick and Morty Character Gallery

## Descripción del Proyecto

El objetivo de este proyecto es consumir la API de Rick and Morty para listar los personajes, mostrando el nombre y la foto de cada uno, ordenados alfabéticamente y por género. Además, se debe poder ver el detalle de cada personaje con una descripción más amplia y filtrar por estado (status) y especie (species).

## Tecnologías Utilizadas

- **React** con **TypeScript** y **Vite**
- **Axios** para la conexión con la API
- **@vitejs/plugin-react-swc** para generar alias en los directorios

## Configuración del Proyecto

1. Clona el repositorio:
```
git clone [<URL del repositorio>](https://github.com/nol4lej/destacados-pruebatecnica.git)
cd destacados-pruebatecnica
```

2. Instala las dependencias:
```
npm install
```

3. Instala las dependencias:
```
npm run dev
```

## Estructura del Proyecto

El proyecto está organizado de manera modular para separar responsabilidades y mejorar la mantenibilidad del código.

### Barrel Files

Se utilizan archivos barrel para exportar módulos desde una sola entrada, facilitando las importaciones y manteniendo el código limpio.

### Axios Service

Se creó una instancia de Axios con un interceptor para manejar respuestas y errores de la API. Esto se encuentra en el archivo `src/services/api/index.ts`

### Hook Personalizado: useApi
El hook useApi se utiliza para realizar peticiones HTTP y manejar el estado de las mismas.

### Paginación

La API de Rick and Morty envía datos paginados. Se implementó una paginación utilizando la URL `?page=1` para navegar entre las páginas de resultados.

## Estructura del Proyecto

- Listado de Personajes: Muestra el nombre y la foto de cada personaje, ordenados alfabéticamente y por género.
- Detalle del Personaje: Permite ver una descripción más amplia de cada personaje.
- Filtrado: Se puede filtrar a los personajes por estado (status) y especie (species).
- Paginación: Navegar entre las diferentes páginas de resultados utilizando la paginación proporcionada por la API.

## Cómo Utilizar

- Listado de Personajes: En la página principal, se muestran los personajes ordenados alfabéticamente y por género.
- Ver Detalles: Hacer clic en un personaje para ver su descripción detallada.
- Filtrar: Utilizar los controles de filtrado para mostrar personajes por su estado o especie.
- Paginación: Utilizar los controles de paginación para navegar entre las páginas de resultados.

## Alias de Directorios

Para facilitar la importación de módulos, se utilizan alias de directorios configurados con @vitejs/plugin-react-swc. Por ejemplo, el alias @components se usa para importar componentes de manera más sencilla.
```
import CharacterGallery from '@components/CharacterGallery';
```

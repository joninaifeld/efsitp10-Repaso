# Pokedex Explorer

## Integrantes

- Jonatan Naifeld
- Damián Cymerman

## API que usamos

[PokeAPI](https://pokeapi.co/) — `https://pokeapi.co/api/v2/pokemon`

Es una API pública y gratuita con toda la info de los Pokemon: nombre, imagen, tipos, peso, altura, estadísticas, habilidades, y mucho más.

## De qué va la app

Pokedex Explorer es una app para explorar Pokemon. Podés buscar por nombre, filtrar por tipo, ver una tarjeta con los datos de cada uno, entrar al detalle con las estadísticas completas, y guardar los que más te gustan como favoritos. Los favoritos se guardan aunque cierres la app.

## Cómo organizamos los componentes

```
web/src/
├── components/
│   ├── Header.jsx        → barra de navegación con links activos
│   ├── SearchBar.jsx     → input de búsqueda + selector de tipo
│   ├── PokemonCard.jsx   → tarjeta reutilizable con imagen, tipos, stats y botón de favorito
│   └── PokemonList.jsx   → grilla de tarjetas con estado vacío
│
├── pages/
│   ├── Home.jsx          → página principal: carga de API, filtros y listado
│   ├── Favorites.jsx     → página con los favoritos guardados
│   └── PokemonDetail.jsx → vista de detalle con estadísticas y habilidades
│
├── services/
│   └── api.js            → funciones de Axios para consumir la PokeAPI
│
└── App.jsx               → componente raíz con las rutas y el estado global de favoritos

native/src/
├── components/           → los mismos componentes pero con View, Text, Pressable, etc.
├── screens/              → HomeScreen, FavoritesScreen, DetailScreen
├── navigation/           → Tab + Stack navigator
├── context/              → FavoritesContext con AsyncStorage
└── services/             → misma lógica de API que en web
```

- `App` maneja el estado global de favoritos y lo persiste (localStorage en web, AsyncStorage en native).
- `Header` usa `useLocation` en web para resaltar el link activo. En native lo hace React Navigation solo.
- `SearchBar` es un componente controlado, recibe todo por props y no maneja estado interno.
- `PokemonCard` se reutiliza tanto en el listado como en la pantalla de favoritos.
- `PokemonList` y `FlatList` (native) arman un Set de IDs para saber rápido qué Pokemon ya es favorito.
- `Home` / `HomeScreen` hace el fetch al arrancar y filtra en memoria con `.filter()`.

## Qué funcionalidades tiene

- Consulta a la PokeAPI al abrir la app (primeros 100 Pokemon con datos completos).
- Spinner + mensaje "Cargando informacion..." mientras se cargan los datos.
- Mensaje de error si algo falla, con botón para reintentar.
- Listado de Pokemon con imagen oficial, número, nombre, tipo(s), peso y experiencia base.
- Búsqueda por nombre en tiempo real con `.filter()`.
- Filtro por tipo (desplegable en web, chips horizontales en native).
- Renderizado condicional según el estado: cargando, error, sin resultados, con resultados.
- Vista de detalle con estadísticas en barras, habilidades y datos extra.
- Agregar y quitar favoritos desde cualquier tarjeta o desde el detalle.
- No se pueden agregar duplicados.
- Los favoritos persisten al cerrar y reabrir la app.
- Navegación entre pantallas: Inicio, Favoritos y Detalle.
- En web: paginación con botón "Cargar más".

## Herramientas de desarrollo que usamos

### En la version web
- **Console** — para ver errores de red, respuestas de la API y logs de estado de la app.
- **Network (DevTools)** — para inspeccionar los requests a la PokeAPI: URL, status code, payload y tiempo de respuesta.
- **Debugger / Breakpoints** — para pausar la ejecucion en puntos clave y revisar el estado de las variables en tiempo real.

### En la version native
- **Console (Expo)** — los `console.log` y `console.error` aparecen en la terminal donde corre `expo start`.
- **Herramientas de Expo** — el menu de developer (agitando el dispositivo o presionando `m` en la terminal) da acceso a recargar la app, ver performance y activar el debugger.
- **Mensajes de error del dispositivo/emulador** — Expo muestra los errores directamente en pantalla con stack trace, lo que hace mucho mas facil ubicar el problema.

## Diferencias que encontramos entre React y React Native

| Cosa | Web | Native |
|---|---|---|
| Elementos base | `div`, `p`, `button`, `img` | `View`, `Text`, `Pressable`, `Image` |
| Estilos | Archivos CSS con clases | `StyleSheet.create()` con objetos JS |
| Navegación | React Router DOM | React Navigation (Stack + Tabs) |
| Listas | CSS Grid + `.map()` | `FlatList` |
| Inputs | `<input type="text">` | `<TextInput>` |
| Favoritos persistidos | `localStorage` | `AsyncStorage` |
| Dónde corre | En el navegador | En el dispositivo o emulador via Expo |
| Depuración | DevTools (Console, Network, Breakpoints) | Expo DevTools, logs en terminal |
| Hover | Sí, con CSS | No existe en mobile |

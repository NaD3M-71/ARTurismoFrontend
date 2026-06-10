# ARTurismo — Frontend

Aplicación web para la plataforma de turismo ARTurismo. Permite explorar destinos turísticos de Argentina, buscar proveedores de servicios y gestionar el contenido del sitio desde un panel de administración.

## Stack tecnológico

- **React 18** + **Vite**
- **React Router Dom v7** — enrutamiento del lado del cliente
- **Bootstrap 5** — estilos y componentes UI
- **Axios** — llamadas a la API
- **SweetAlert2** — alertas y modales
- **Swiper** — carruseles de imágenes
- **React Quill** — editor de texto enriquecido (panel admin)
- **Styled Components** — estilos por componente

## Requisitos

- Node.js v18+
- El backend de ARTurismo corriendo y accesible

## Instalación

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_BACKEND_URL=http://localhost:5000
```

En producción, reemplazar con la URL del servidor donde está deployado el backend.

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo (Vite HMR) |
| `npm run build` | Genera el build de producción en `dist/` |
| `npm run preview` | Previsualiza el build de producción localmente |
| `npm run lint` | Ejecuta ESLint |

## Rutas

### Públicas

| Ruta | Componente | Descripción |
| --- | --- | --- |
| `/` | `Index` | Página principal con banner y carrusel de ciudades |
| `/ciudades` | `Ciudades` | Listado de todos los destinos |
| `/ciudad/:id` | `Ciudad` | Detalle de una ciudad con sus proveedores |
| `/actividad/:id` | `Actividad` | Detalle de un proveedor/actividad |
| `/busqueda` | `Busqueda` | Resultados de búsqueda |
| `/quienes-somos` | `QuienesSomos` | Página institucional del equipo |
| `/biografia` | `Biografia` | Página de biografía |
| `/formulario-proveedor` | `FormularioProveedor` | Formulario de contacto para nuevos proveedores |
| `/login` | `Login` | Login de administración |

### Panel de administración (requiere login)

| Ruta | Componente | Descripción |
| --- | --- | --- |
| `/admin` | `Admin` | Dashboard principal |
| `/admin/usuarios` | `GestionUsuarios` | ABM de usuarios administradores |
| `/admin/banner` | `GestionBanner` | Editar el banner principal |
| `/admin/categorias` | `GestionCategorias` | ABM de categorías |
| `/admin/agregar-ciudad` | `NuevaCiudad` | Formulario para nueva ciudad |
| `/admin/agregar-cliente` | `NuevoCliente` | Formulario para nuevo proveedor |
| `/admin/editar-ciudad/:id` | `EditarCiudad` | Editar ciudad existente |
| `/admin/editar-cliente/:id` | `EditarCliente` | Editar proveedor existente |
| `/admin/editar-cliente/:id/imagen` | `EditarImagenesCliente` | Gestionar imágenes de un proveedor |
| `/admin/ver-proveedores/:ciudadNombre` | `Proveedores` | Ver proveedores de una ciudad |
| `/admin/consultas` | `GestionConsultas` | Gestionar consultas entrantes |

## Estructura del proyecto

```text
ARTurismoFrontend/
├── public/
│   ├── assets/              # Imágenes estáticas, logos, íconos
│   ├── css/                 # CSS global (normalize)
│   ├── fonts/               # Fuente Proxima Soft
│   └── js/                  # Scripts externos (ej: mapa)
├── src/
│   ├── assets/              # Assets importados desde componentes
│   ├── components/
│   │   ├── admin/           # Componentes del panel de administración
│   │   ├── auth/            # Login
│   │   ├── layout/
│   │   │   ├── biografias/  # Páginas de biografía y quiénes somos
│   │   │   ├── ciudad/      # Páginas de ciudad, actividad y listado
│   │   │   ├── destinos/    # Componentes de destinos
│   │   │   └── templates/   # Componentes reutilizables (Footer, Cards, Carrusel, etc.)
│   │   └── ProtectedRoute.jsx
│   ├── config/
│   │   └── axios.js         # Instancia de Axios con baseURL del backend
│   ├── hooks/
│   │   └── useAuth.js       # Hook de autenticación (JWT)
│   ├── App.jsx              # Definición de rutas
│   ├── main.jsx             # Punto de entrada de React
│   └── index.css            # Estilos globales
├── index.html
├── vite.config.js
└── package.json
```

## Deploy (producción)

1. Configurar `VITE_BACKEND_URL` con la URL del backend en producción.
2. Ejecutar `npm run build`.
3. Subir el contenido de la carpeta `dist/` al servidor web (compatible con cualquier hosting estático: Nginx, Apache, Netlify, Vercel, etc.).
4. Configurar el servidor para redirigir todas las rutas a `index.html` (necesario para el enrutamiento del lado del cliente).

**Ejemplo de configuración Nginx:**

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

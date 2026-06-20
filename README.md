# StockWise

Sistema web de gestión de inventarios. Permite a una empresa registrar
productos, proveedores y categorías, llevar el control de las entradas y
salidas de stock, y visualizar productos con bajo nivel de inventario.

Proyecto desarrollado como práctica académica de la asignatura **Desarrollo
de Aplicaciones Web (DAW123)**, Universidad de El Salvador - Facultad
Multidisciplinaria de Occidente, Ingeniería en Desarrollo de Software.

## Funciones principales

- CRUD completo de productos, proveedores y categorías.
- Registro de movimientos de stock (entradas y salidas) que ajustan el stock
  del producto automáticamente.
- Relación 1:N entre proveedor y producto.
- Relación N:M entre producto y categoría.
- Validaciones a nivel de API y manejo centralizado de errores.
- Documentación interactiva de la API con Swagger UI.
- Despliegue de los tres servicios (base de datos, backend, frontend) con un
  solo comando usando Docker Compose.

## Tecnologías

| Capa | Tecnología |
|---|---|
| Backend | Java 17, Spring Boot 3.5, Spring Data JPA, Hibernate, Bean Validation |
| Documentación API | springdoc-openapi (Swagger UI) |
| Base de datos | PostgreSQL 16 |
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, React Router, Axios |
| Despliegue | Docker, Docker Compose |
| Servidor estático | Nginx (Alpine) |

## Estructura del repositorio

```
.
├── backend/              Código fuente Spring Boot (N-Capas + DTO)
├── frontend/             Código fuente React + TypeScript
├── database/             Scripts SQL y diagrama Entidad-Relación
├── docs/                 Capturas de pantalla y mockups
├── docker-compose.yml    Orquestación de los 3 servicios
└── README.md
```

## Diagrama Entidad-Relación

Detalle completo en [`database/DER.md`](database/DER.md).

```
proveedor (1) ────< producto (N)               1:N
producto  (N) >──── producto_categoria ────< categoria (M)   N:M
producto  (1) ────< movimiento_stock (N)       1:N
```

Tablas:

- `proveedor` (id, nombre, telefono, email, direccion, created_at)
- `categoria` (id, nombre, descripcion)
- `producto` (id, nombre, descripcion, precio, stock, stock_minimo, proveedor_id, created_at)
- `producto_categoria` (producto_id, categoria_id) - tabla puente N:M
- `movimiento_stock` (id, producto_id, tipo, cantidad, motivo, fecha)

## Manual de despliegue

### Requisitos

- Docker 24+ y Docker Compose v2
- Puertos libres: **5433** (Postgres), **8081** (Backend), **8090** (Frontend)

> Si alguno de esos puertos está ocupado en tu máquina, podés cambiarlos en
> `docker-compose.yml` y en `frontend/.env`.

### Levantar el sistema

Desde la raíz del proyecto:

```bash
docker compose up -d --build
```

Esto:

1. Crea la red `stockwise-net`.
2. Levanta `stockwise-db` (Postgres) y ejecuta automáticamente
   `database/01-init.sql` (esquema) y `database/02-seed.sql` (datos de
   prueba).
3. Construye el backend (Maven + Spring Boot) y lo levanta cuando la base
   de datos esté lista (healthcheck).
4. Construye el frontend (Vite build → nginx) y lo expone en `:8090`.

### Verificar

| Servicio | URL |
|---|---|
| Frontend | http://localhost:8090 |
| API REST | http://localhost:8081/api |
| Swagger UI | http://localhost:8081/swagger-ui/index.html |
| OpenAPI JSON | http://localhost:8081/v3/api-docs |

Para conectarte a la base de datos directamente:

```bash
psql -h localhost -p 5433 -U stockwise -d stockwise_db
```

Contraseña por defecto: `stockwise` (configurable en `docker-compose.yml`).

### Detener

```bash
docker compose down            # Detiene y borra los contenedores.
docker compose down -v         # Adicionalmente borra el volumen de la base.
```

## Tabla de endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/productos` | Listar productos con su proveedor y categorías |
| GET | `/api/productos/{id}` | Obtener producto por id |
| POST | `/api/productos` | Crear producto |
| PUT | `/api/productos/{id}` | Actualizar producto |
| DELETE | `/api/productos/{id}` | Eliminar producto |
| GET | `/api/proveedores` | Listar proveedores |
| GET | `/api/proveedores/{id}` | Obtener proveedor por id |
| POST | `/api/proveedores` | Crear proveedor |
| PUT | `/api/proveedores/{id}` | Actualizar proveedor |
| DELETE | `/api/proveedores/{id}` | Eliminar proveedor |
| GET | `/api/categorias` | Listar categorías |
| GET | `/api/categorias/{id}` | Obtener categoría por id |
| POST | `/api/categorias` | Crear categoría |
| PUT | `/api/categorias/{id}` | Actualizar categoría |
| DELETE | `/api/categorias/{id}` | Eliminar categoría |
| GET | `/api/movimientos` | Listar movimientos (`?productoId=` opcional) |
| POST | `/api/movimientos` | Registrar entrada o salida (ajusta stock) |

Todos los endpoints devuelven JSON. Los errores siguen este formato:

```json
{
  "timestamp": "2026-06-16T22:47:25.752",
  "status": 400,
  "error": "Bad Request",
  "mensaje": "Datos invalidos",
  "errores": { "nombre": "must not be blank" }
}
```

## Evidencias de funcionamiento

Las capturas viven en `docs/mockups/`:

- `01-productos-light.png` - Listado de productos con relaciones.
- `02-proveedores.png` - Página de proveedores.
- `03-categorias.png` - Página de categorías.
- `05-swagger-categorias.png` - Vista de categorias en Swagger.
- `06-swagger-movimientos.png` - Vista de movimientos en Swagger
- `07-swagger-productos.png` - Vista de productos en Swagger
- `08-swagger-proveedores.png` - Vista de proveedoress en Swagger
- `09-swagger-esquemas.png` - Vista de esquemas en Swagger

## Integrantes

- Tatiana Carolina Martinez Franco - MF24026
- Andrés Zavala Alvarado - ZA21010
- Carlos Chinchilla - CM23003
- Belkis Carolina Ramirez Flores - RF24026
- Ricardo Ernesto Paiz Lemus - PL23022

-- StockWise - esquema inicial
-- Sistema de inventarios: productos, proveedores, categorias y movimientos de stock.

DROP TABLE IF EXISTS movimiento_stock CASCADE;
DROP TABLE IF EXISTS producto_categoria CASCADE;
DROP TABLE IF EXISTS producto CASCADE;
DROP TABLE IF EXISTS categoria CASCADE;
DROP TABLE IF EXISTS proveedor CASCADE;

CREATE TABLE proveedor (
    id           BIGSERIAL PRIMARY KEY,
    nombre       VARCHAR(120) NOT NULL,
    telefono     VARCHAR(30),
    email        VARCHAR(120) UNIQUE,
    direccion    VARCHAR(200),
    created_at   TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE categoria (
    id           BIGSERIAL PRIMARY KEY,
    nombre       VARCHAR(80) NOT NULL UNIQUE,
    descripcion  VARCHAR(200)
);

CREATE TABLE producto (
    id             BIGSERIAL PRIMARY KEY,
    nombre         VARCHAR(120) NOT NULL,
    descripcion    TEXT,
    precio         NUMERIC(10, 2) NOT NULL CHECK (precio >= 0),
    stock          INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    stock_minimo   INTEGER NOT NULL DEFAULT 0 CHECK (stock_minimo >= 0),
    proveedor_id   BIGINT NOT NULL REFERENCES proveedor(id) ON DELETE RESTRICT,
    created_at     TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_producto_proveedor ON producto(proveedor_id);
CREATE INDEX idx_producto_nombre ON producto(nombre);

CREATE TABLE producto_categoria (
    producto_id   BIGINT NOT NULL REFERENCES producto(id) ON DELETE CASCADE,
    categoria_id  BIGINT NOT NULL REFERENCES categoria(id) ON DELETE CASCADE,
    PRIMARY KEY (producto_id, categoria_id)
);

CREATE TABLE movimiento_stock (
    id            BIGSERIAL PRIMARY KEY,
    producto_id   BIGINT NOT NULL REFERENCES producto(id) ON DELETE CASCADE,
    tipo          VARCHAR(10) NOT NULL CHECK (tipo IN ('ENTRADA', 'SALIDA')),
    cantidad      INTEGER NOT NULL CHECK (cantidad > 0),
    motivo        VARCHAR(200),
    fecha         TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_movimiento_producto ON movimiento_stock(producto_id);
CREATE INDEX idx_movimiento_fecha ON movimiento_stock(fecha DESC);

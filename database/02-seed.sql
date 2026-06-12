-- StockWise - datos de prueba

INSERT INTO proveedor (nombre, telefono, email, direccion) VALUES
    ('Ferreteria El Martillo', '2222-1010', 'ventas@elmartillo.sv', 'San Salvador, Col. Escalon'),
    ('Distribuidora Industrial SA', '2255-3030', 'contacto@diasa.sv', 'Soyapango, Bvd del Ejercito'),
    ('Importadora Andina', '7788-4040', 'pedidos@andina.sv', 'Santa Ana, Centro'),
    ('Suministros del Pacifico', '2233-5050', 'info@pacifico.sv', 'La Libertad, Puerto'),
    ('Herramientas Premium', '7799-6060', 'ventas@hpremium.sv', 'San Miguel, Av. Roosevelt');

INSERT INTO categoria (nombre, descripcion) VALUES
    ('Herramientas manuales', 'Martillos, destornilladores, llaves y similares'),
    ('Herramientas electricas', 'Taladros, sierras, lijadoras y afines'),
    ('Construccion', 'Materiales y accesorios de construccion'),
    ('Medicion', 'Cintas, niveles, escuadras'),
    ('Seguridad', 'Equipo de proteccion personal');

INSERT INTO producto (nombre, descripcion, precio, stock, stock_minimo, proveedor_id) VALUES
    ('Taladro inalambrico 18V', 'Taladro con bateria de litio y maletin', 89.99, 25, 5, 1),
    ('Cinta metrica 5m', 'Cinta metalica con freno', 4.50, 80, 15, 2),
    ('Martillo de uña 16oz', 'Mango de fibra antideslizante', 12.75, 40, 10, 1),
    ('Sierra circular 7-1/4"', 'Motor 1400W, disco de carburo', 145.00, 8, 3, 5),
    ('Casco de seguridad amarillo', 'Norma ANSI Z89.1', 9.20, 60, 20, 4),
    ('Guantes de cuero talla M', 'Para trabajo pesado', 6.80, 120, 30, 4),
    ('Llave inglesa 10"', 'Acero al cromo-vanadio', 14.50, 50, 12, 3),
    ('Nivel de burbuja 60cm', 'Aluminio con tres burbujas', 11.30, 35, 8, 2),
    ('Destornillador phillips #2', 'Mango ergonomico', 3.25, 200, 50, 1),
    ('Lijadora orbital 250W', 'Velocidad variable', 65.00, 12, 4, 5);

-- Relaciones N:M producto-categoria
INSERT INTO producto_categoria (producto_id, categoria_id) VALUES
    (1, 2),                -- Taladro -> Electricas
    (2, 1), (2, 4),        -- Cinta -> Manuales + Medicion
    (3, 1), (3, 3),        -- Martillo -> Manuales + Construccion
    (4, 2),                -- Sierra -> Electricas
    (5, 5),                -- Casco -> Seguridad
    (6, 5),                -- Guantes -> Seguridad
    (7, 1),                -- Llave -> Manuales
    (8, 4),                -- Nivel -> Medicion
    (9, 1),                -- Destornillador -> Manuales
    (10, 2);               -- Lijadora -> Electricas

INSERT INTO movimiento_stock (producto_id, tipo, cantidad, motivo) VALUES
    (1, 'ENTRADA', 30, 'Compra inicial al proveedor'),
    (1, 'SALIDA', 5, 'Venta al detalle'),
    (2, 'ENTRADA', 100, 'Reabastecimiento'),
    (2, 'SALIDA', 20, 'Venta mayorista'),
    (4, 'ENTRADA', 10, 'Pedido especial'),
    (4, 'SALIDA', 2, 'Demostracion a cliente'),
    (5, 'ENTRADA', 80, 'Compra programada'),
    (5, 'SALIDA', 20, 'Venta a constructora'),
    (10, 'ENTRADA', 15, 'Stock inicial'),
    (10, 'SALIDA', 3, 'Venta');

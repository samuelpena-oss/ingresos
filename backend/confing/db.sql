create database registros;
use registros;
create table categorias(
    id int not null auto_increment primary key,
    nombre varchar(100) not null,
    descripcion varchar(255) not null,
    fecha_creacion date not null
);
create table transacciones(
    id int not null auto_increment primary key,
    tipo varchar(50) not null,
    categoria_id int not null,
    monto decimal(10,2) not null,
    fecha date not null,
    descripcion varchar(255) not null,
    foreign key (categoria_id) references categorias(id)
);
insert into categorias(nombre, descripcion, fecha_creacion) values
('alimentos', 'Productos alimenticios', '2023-01-01'),
('vivienda', 'Arriendo y servicios del hogar', '2023-01-02'),
('transporte', 'Movilidad y combustible', '2023-01-03'),
('salud', 'Consultas y medicamentos', '2023-01-04'),
('entretenimiento', 'Ocio y esparcimiento', '2023-01-05'),
('educacion', 'Cursos y materiales de estudio', '2023-01-06'),
('servicios', 'Servicios públicos y suscripciones', '2023-01-07');
insert into transacciones(tipo, categoria_id, monto, fecha, descripcion) values
('gasto', 1, 100.00, '2023-01-01', 'Compra de alimentos'),
('gasto', 2, 850000.00, '2023-01-02', 'Pago de arriendo'),
('gasto', 3, 45000.00, '2023-01-03', 'Recarga de transporte'),
('ingreso', 4, 2500000.00, '2023-01-04', 'Pago de nómina'),
('gasto', 5, 60000.00, '2023-01-05', 'Salida de cine');

SELECT * FROM categorias;

SELECT * FROM transacciones;

SELECT * 
FROM categorias
WHERE nombre = 'alimentos';

SELECT *
FROM transacciones
order by fecha ASC;

SELECT t.id,
       t.monto,
       t.fecha,
       t.descripcion,
       c.nombre AS categoria
FROM transacciones t
JOIN categorias c
  ON t.categoria_id = c.id;

  SELECT c.nombre AS categoria,
       SUM(t.monto) AS total_gastado
FROM transacciones t
JOIN categorias c
  ON t.categoria_id = c.id
GROUP BY c.nombre;

SELECT c.nombre AS categoria,
       COUNT(*) AS num_transacciones
FROM transacciones t
JOIN categorias c
  ON t.categoria_id = c.id
GROUP BY c.nombre;

SELECT * 
FROM transacciones
WHERE fecha BETWEEN '2023-01-01' AND '2023-01-05';
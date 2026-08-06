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
    categoria_id int not null,
    monto decimal(10,2) not null,
    fecha date not null,
    descripcion varchar(255) not null,
    foreign key (categoria_id) references categorias(id)
);
insert into categorias(nombre, descripcion, fecha_creacion) values
('alimentos', 'Productos alimenticios', '2023-01-01'),
('alimentos', 'Productos alimenticios', '2023-01-02'),
('alimentos', 'Productos alimenticios', '2023-01-03'),
('alimentos', 'Productos alimenticios', '2023-01-04'),
('alimentos', 'Productos alimenticios', '2023-01-05'),
('alimentos', 'Productos alimenticios', '2023-01-06'),
('alimentos', 'Productos alimenticios', '2023-01-07');
insert into transacciones(categoria_id, monto, fecha, descripcion) values
(1, 100.00, '2023-01-01', 'Compra de alimentos'),
(1, 100.00, '2023-01-02', 'Compra de alimentos'),
(1, 100.00, '2023-01-03', 'Compra de alimentos'),
(1, 100.00, '2023-01-04', 'Compra de alimentos'),
(1, 100.00, '2023-01-05', 'Compra de alimentos');
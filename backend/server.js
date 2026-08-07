const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'registros',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(dbConfig);

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '..')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'frontend', 'index.html'));
});

app.get('/informacion', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'informacion.html'));
});

app.get('/api/transacciones', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT t.id,
              t.tipo,
              t.monto,
              DATE_FORMAT(t.fecha, '%Y-%m-%d') AS fecha,
              t.descripcion,
              c.nombre AS categoria
       FROM transacciones t
       JOIN categorias c ON t.categoria_id = c.id
       ORDER BY t.fecha DESC, t.id DESC`
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al leer transacciones' });
  }
});

app.post('/api/registro', async (req, res) => {
  const { tipo, monto, categoria, fecha } = req.body;

  if (!tipo || !monto || !categoria || !fecha) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const [categoriaRows] = await pool.query(
      'SELECT id FROM categorias WHERE nombre = ?',
      [categoria]
    );

    let categoriaId;

    if (categoriaRows.length === 0) {
      const descripcion = `Categoría ${categoria}`;
      const fechaCreacion = new Date().toISOString().slice(0, 10);
      const [insertCategoria] = await pool.query(
        'INSERT INTO categorias (nombre, descripcion, fecha_creacion) VALUES (?, ?, ?)',
        [categoria, descripcion, fechaCreacion]
      );
      categoriaId = insertCategoria.insertId;
    } else {
      categoriaId = categoriaRows[0].id;
    }

    const descripcion = `Registro de ${tipo}`;
    const [insertTransaccion] = await pool.query(
      'INSERT INTO transacciones (tipo, categoria_id, monto, fecha, descripcion) VALUES (?, ?, ?, ?, ?)',
      [tipo, categoriaId, parseFloat(monto), fecha, descripcion]
    );

    res.status(201).json({ success: true, transaccionId: insertTransaccion.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar el registro' });
  }
});

app.use((req, res) => {
  res.status(404).send('No encontrado');
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
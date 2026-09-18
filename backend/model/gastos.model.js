const db = require("../confing/db")
class GastosModel{
static async consultarGastos(){
       const [resultados] = await db.query("SELECT DISTINCT nombre FROM categorias ORDER BY nombre ASC");

       return resultados;
}
static async consultarTransacciones(){
       const [resultados] = await db.query(`
           SELECT t.id, t.tipo, t.monto, t.fecha, t.descripcion, c.nombre AS categoria
           FROM transacciones t
           LEFT JOIN categorias c ON c.id = t.categoria_id
           ORDER BY t.fecha DESC, t.id DESC
       `);

       return resultados;
}
static async crearRegistros(datos){
       const categoriaNombre = datos.categoria || 'sin categoria';
       const tipo = datos.tipo || 'gasto';
       const descripcion = datos.descripcion || `${tipo} de ${categoriaNombre}`;

       const [categoriaExiste] = await db.query(
           "SELECT id FROM categorias WHERE nombre = ? LIMIT 1",
           [categoriaNombre]
       );

       let categoriaId = categoriaExiste[0]?.id;

       if (!categoriaId) {
           const [nuevaCategoria] = await db.query(
               "INSERT INTO categorias (nombre, descripcion, fecha_creacion) VALUES (?, ?, ?)",
               [categoriaNombre, `Categoría ${categoriaNombre}`, new Date().toISOString().slice(0, 10)]
           );
           categoriaId = nuevaCategoria.insertId;
       }

       const [resultado] = await db.query(
           "INSERT INTO transacciones (tipo, categoria_id, monto, fecha, descripcion) VALUES (?, ?, ?, ?, ?)",
           [tipo, categoriaId, datos.monto, datos.fecha, descripcion]
       );

       return resultado;
}
}
module.exports = GastosModel
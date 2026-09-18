const db = require("../confing/db")
class GastosModel{
static async consultarGastos(){
       const [resultados] = await db.query("SELECT * FROM categorias ORDER BY id DESC");

       return resultados;
}
static async consultarTransacciones(){
       const [resultados] = await db.query("SELECT * FROM transacciones");

       return resultados;
}
static async crearRegistros(datos){
 const resultado = await db.query
 ("INSERT INTO movimiento (tipo,categoria_id, monto, fecha, descripcion) VALUES (?, ?, ?, ?, ?)",
 [datos.tipo, datos.categoria_id, datos.monto, datos.fecha, datos.descripcion])      
}
}
module.exports = GastosModel
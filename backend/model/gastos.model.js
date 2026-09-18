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
static async crearCategoria({ nombre, descripcion, fecha_creacion }){
       const [resultado] = await db.query(
           "INSERT INTO categorias (nombre, descripcion, fecha_creacion) VALUES (?, ?, ?)",
           [nombre, descripcion, fecha_creacion]
       );
       return resultado.insertId;
}
}
module.exports = GastosModel
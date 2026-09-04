const db = require("../confing/db")
class GastosModel{
static async consultarGastos(){
       const [resultados] = await db.query("SELECT * FROM categorias");

       return resultados;
}
static async consultarTransacciones(){
       const [resultados] = await db.query("SELECT * FROM transacciones");

       return resultados;
}
}
module.exports = GastosModel
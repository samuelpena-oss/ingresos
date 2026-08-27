const db = require("../confing/db")
class GastosModel{
static async consultarGastos(){
       const resultados = await db.query("SELECT * FROM gastos");
       return resultados
}
}

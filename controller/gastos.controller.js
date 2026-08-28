const model = require("../model/gastos.model")
class GastosController{
static async consultarGastos(request,response){
     const movimientos = await model.consultarGastos()
     response.status(200).json({
        data: movimientos
     })
}
}
module.exports = GastosController;
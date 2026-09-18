const model = require("../model/gastos.model")
class GastosController{
static async consultarGastos(request,response){
     const movimientos = await model.consultarGastos()
     response.status(200).json({
        data: movimientos
     })
}
static async consultarTransacciones(request,response){
     const movimientos = await model.consultarTransacciones()
     response.status(200).json({
        data: movimientos
     })
}
static async crearregistro(request, response) {
     try {
          const datosmovimiento = request.body;
          const crearregistro = await model.crearRegistros(datosmovimiento);

          response.status(201).json({
               ok: true,
               data: crearregistro,
               message: 'Movimiento registrado correctamente'
          });
     } catch (error) {
          console.error('Error al crear registro:', error);
          response.status(500).json({
               ok: false,
               message: 'Error al guardar el movimiento'
          });
     }
}
}
module.exports = GastosController;
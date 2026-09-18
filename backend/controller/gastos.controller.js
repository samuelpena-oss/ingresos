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
     const { nombre, descripcion } = request.body;

     if (!nombre || !descripcion) {
         return response.status(400).json({
             message: "El nombre y la descripción del registro son obligatorios."
         });
     }

     const fecha_creacion = new Date().toISOString().slice(0, 10);
     const id = await model.crearregistro({ nombre, descripcion, fecha_creacion });

     response.status(201).json({
         message: "Registro creado correctamente.",
         data: { id, nombre, descripcion, fecha_creacion }
     });
}
}
module.exports = GastosController;
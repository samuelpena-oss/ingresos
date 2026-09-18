const express = require("express")
const router = express.Router()
const controller = require("../controller/gastos.controller")
router.get("/categorias", controller.consultarGastos)
router.post("/registro", controller.crearregistro)
router.get("/transacciones", controller.consultarTransacciones  )
module.exports = router
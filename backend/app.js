const express = require("express")
const app = express()
const router = require("./routers/router")
const puerto = 4000
app.use("/api",router)
app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`)
})
const express = require("express")
const app = express()
const router = require("./routers/router")
const puerto = 4000
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use("/api", router)

app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`)
})
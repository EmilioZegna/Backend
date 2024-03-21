const express = require("express");
const app = express();
const PUERTO = 8080;
const productsRouter = require("./routes/productsRouter");
const cartsRouter = require("./routes/cartsRouter");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.send("Funcionando de manera óptima")
})

app.use("/api", productsRouter);
app.use("/api", cartsRouter);

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`)
})



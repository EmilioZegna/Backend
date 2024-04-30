import express from "express"
const PUERTO = 8080
import viewRouter from "./routes/viewsRouter"
import exphbs from "express-handlebars"
import { Server } from "socket.io"

const app = express ()

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views") 

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static("/src/public"))

const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`)
})

app.use("/", viewRouter)

const io = new Server(httpServer)

import ProductManager from "./controllers/productManager"
const productManager = new ProductManager("/src/models/productos.json")

io.on("connection", async (socket) => {
    console.log("Cliente en linea")

    socket.emit("products", await productManager.getProducts())

    socket.on("deleteProducts", async (id) => {
        await productManager.deleteProduct(id)
    })

    socket.emit("products", await productManager.getProducts())

    socket.on("saveProducts", async (product) => {
        await productManager.addProduct(product)
    })
})
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));

// app.get("/", (req, res) => {
//     res.send("Funcionando de manera óptima")
// })

// app.use("/api", productsRouter);
// app.use("/api", cartsRouter);

// app.listen(PUERTO, () => {
//     console.log(`Escuchando en el puerto: ${PUERTO}`)
// })



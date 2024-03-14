import fs from "fs";
import ProductManager from "./main";
import express from "express"
const PUERTO = 8080
const app = express()

const productManager = new ProductManager()

app.listen(PUERTO, () => {
    console.log(`Puerto: ${PUERTO}`)
})

app.get("/products", async (req,res) => {
    try {
        const products = await fs.promises.readFile("../productos.json", "utf-8")
        const productsJSON = JSON.parse(products)
        let limit = Number(req.query.limit)
        let limitProducts = productsJSON.slice(0, limit)

        if (limit) {
            res.send(limitProducts)
        } else {
            res.send(productsJSON)
        }
    } catch (error) {
        console.log("Error", error)
    }
})

app.get("/products/:pid", async (req,res) => {
    try {
        const products = await fs.promises.readFile("../productos.json", "utf-8")
        const productsJSON = JSON.parse(products)
        const id = parseInt(req.params.pid)
        const idProduct = productsJSON.find(prod => prod.id === id)

        if (idProduct) {
            res.send(idProduct)
        } else {
            res.send("Producto no disponible")
        }
    } catch (error) {
        console.log("Error", error)
    }
})
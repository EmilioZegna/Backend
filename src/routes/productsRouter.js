import fs from "fs";
import express from "express"
const router = express.Router()

import ProductManager from "../controllers/productManager"
const productManager = new ProductManager()

router.get("/api/products", async (req, res) => {
    try {
        const products = await fs.promises.readFile("/src/models/productos.json", "utf-8")
        const productsJson = JSON.parse(products)

        let limit = Number(req.query.limit)
       
        let productsLimit = productsJson.slice(0, limit)
        
        if (limit) {
            res.send(productsLimit)
        } else {
            res.send(productsJson)
        }
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({
            error: "Error del servidor"
        })
    }
})

router.get("/api/products/:pid", async (req, res) => {
    try {
        const products = await fs.promises.readFile("/src/models/productos.json", "utf-8")
        const productsJson = JSON.parse(products)
        const id = parseInt(req.params.pid)
        const productId = productsJson.find(prod => prod.id === id)
        
        if (productId) {
            res.send(productId)
        } else {
            res.send("El producto no se encuentra disponible")
        }
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({
            error: "Error del servidor"
        });
    }
})

router.post("/api/products", async (req, res) => {
    try {
        const { title, description, price, img, code, stock, status, category } = req.body

        if (!title || !description || !price || !img || !code || !stock) {
            return res.status(400).json({ error: "Faltan datos" })
        }

        const products = await fs.promises.readFile("/src/models/productos.json", "utf-8")
        const productsJson = JSON.parse(products)

        const newProductId = productsJson.length > 0 ? productsJson[productsJson.length - 1].id + 1 : 1

        const newProduct = {
            id: newProductId,
            title,
            description,
            price,
            img,
            code,
            stock,
            status,
            category
        }

        productsJson.push(newProduct)

        await fs.promises.writeFile("/src/models/productos.json", JSON.stringify(productsJson))

        res.status(201).json({ message: "Producto agregado" })
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({ error: "Error del servidor" })
    }
})

router.put("/api/products/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid)
        const updatedFields = req.body

        if (isNaN(productId)) {
            return res.status(400).json({ error: "ID inválido" })
        }

        const products = await fs.promises.readFile("/src/models/productos.json", "utf-8")
        const productsJson = JSON.parse(products)

        const productIndex = productsJson.findIndex(item => item.id === productId)

        if (productIndex === -1) {
            return res.status(404).json({ error: "Producto no disponible" })
        }

        const updatedProduct = { ...productsJson[productIndex], ...updatedFields }
        productsJson[productIndex] = updatedProduct

        await fs.promises.writeFile("/src/models/productos.json", JSON.stringify(productsJson))

        res.status(200).json({ message: "El producto fue actualizado", updatedProduct })
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({ error: "Error del servidor" })
    }
});

router.delete("/api/products/:pid", async (req, res) => {
    try {
        const readFile = await fs.promises.readFile("/src/models/productos.json", "utf-8")
        let products = JSON.parse(readFile)

        const id = parseInt(req.params.pid)

        if (isNaN(id)) {
            res.status(404).json({ error: "El ID es incorrecto" })
            return; 
        }

        const productIndex = products.findIndex(product => product.id === id)

        if (productIndex === -1) {
            res.status(404).json({ error: "No se encontró ningún producto" })
            return; 
        }

        products = products.filter(product => product.id !== id)

        await fs.promises.writeFile("/src/models/productos.json", JSON.stringify(products))

        res.status(200).json({ message: "Producto eliminado" })
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({ error: "Error del servidor" })
    }
})

export default router;
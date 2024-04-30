import express from "express"
import fs from "fs"
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const products = await fs.promises.readFile("/src/models/productos.json", "utf-8")
        const productsJson = JSON.parse(products)
        if (productsJson) {
            res.render("inicio", { productos: productsJson })
        } else {
            res.render("No se encuentra disponible")
        }
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({
            error: "Error del servidor"
        })
    }
})

router.get("/productsreallife", async (req, res) => {
    res.render("productsreallife")
})

export default router
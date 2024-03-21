const express = require("express");
const router = express.router();

const ProductManager = require("../controllers/productManager");
const productManager = new ProductManager("/src/models/productos.json");

router.get("/products", async (req, res) => {
    try {
        const limit = req.query.limit;
        const productos = await productManager.getProducts();
        if (limit) {
            res.json(productos.slice(0, limit));
        } else {
            res.json(productos);
        }
    } catch (error) {
        console.error("Error con los productos", error);
        res.status(500).json({
            error:"Error en el servidor"
        });
    }
})

router.get("/products/:pid", async (req, res) => {

    const id = req.params.pid;

    try {
        const producto = await productManager.getProductById(parseInt(id));
        if (!producto) {
            return res.json({
                error:"El producto no se encuentra disponible"
            });
        }

        res.json(producto);
    } catch (error) {
        console.error("Error con el producto", error);
        res.status(500).json({
            error:"Error en el servidor"
        });
    }
})

router.post("/products", async (req, res) => {
    const productoNuevo = req.body;

    try {
        await productManager.addProduct(productoNuevo);
        res.status(201).json({message: "El producto fue agregado."});
    } catch (error) {
        res.status(500).json({
            error:"Error en el servidor"
        });
    }
})

router.delete("/products/:pid", async (req, res) => {
    const id = req.params.pid;

    try {
        await productManager.deleteProduct(parseInt(id));
        res.json({
            message: "El producto ha sido eliminado."
        });
    } catch (error) {
        res.status(500).json({
            error: "Error en el servidor."
        });
    }
})

module.exports = router;
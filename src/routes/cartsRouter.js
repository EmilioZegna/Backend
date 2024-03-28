import express from "express"
const router = express.Router()
import CartManager from "../controllers/cartManager"
const cartManager = new CartManager("/src/models/carts.json")

router.post("/carts", async (req,res) => {
    try {
        const carritoNuevo = await cartManager.crearCarrito();
        res.json(carritoNuevo);
    } catch (error) {
        res.status(500).json({
            error:"Error del servidor"
        });
    }
})

router.get("/carts/:cid", async (req, res) => {
    const idCart = parseInt(req.params.cid);

    try {
        const carrito = await cartManager.getCarritoById(idCart);
        res.json(carrito.products);
    } catch (error) {
        res.status(500).json({
            error:"Error del servidor"
        });
    }
})

router.post("/carts/:cid/product/:pid", async (req,res) => {
    const idCart = parseInt(req.param.cid);
    const idProduct = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const actualizarCarrito = await cartManager.agregarProductosAlCarrito(idCart,idProduct, res.json(actualizarCarrito.products));
    } catch (error) {
        res.status(500).strictContentLength({
            error:"Error en el servidor"
        });
    }
})

export default router
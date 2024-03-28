import fs from "fs";
class CartManager {
    constructor(path) {
        this.carts = [];
        this.path = path;
        this.id = 0;

        this.agregarCarritos();
    }

    async agregarCarritos() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            this.carts = JSON.parse(data);
            if (this.carts.length > 0) {
                this.id = Math.max(...this.carts.map(cart => cart.id));
            }
        } catch (error) {
            console.log("Error: no se pudo crear el carrito", error);
            await this.guardarCarritos();
        }
    }
    
    async guardarCarritos() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    }

    async crearUnCarrito() {
        const carritoNuevo = {
            id: ++this.id,
            products: []
        }

        this.carts.push(carritoNuevo);

        await this.guardarCarritos();
        return carritoNuevo;
    }

    async getCarritoById(carritoId) {
        try {
            const carrito = this.carts.find(c => c.id === carritoId);

            if (!carrito) {
                console.log("No existe ese carrito");
                return;
            }

            return carrito;
        } catch (error) {
            console.log("Error: no se pudo obtener el carrito por id", error);
        }
    }

    async agregarProductos(carritoId, productoId, quantity = 1) {
        const carrito = await this.getCarritoById(carritoId);
        const productoRepetido = carrito.products.find(p => p.product === productoId);

        if (productoRepetido) {
            productoRepetido.quantity += quantity;
        } else {
            carrito.products.push({ product: productoId, quantity });
        }

        await this.guardarCarritos();
        return carrito;
    }
}

export default CartManager


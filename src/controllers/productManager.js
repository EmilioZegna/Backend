const fs = require("fs").promises;

class ProductManager {
    static id = 0;

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async addProduct(title, description, price, img, code, stock) {
        try {
            const arrayProductos = await this.leerArchivo();
            
            if(!title || !description || !price || !img || !code || !stock) {
                console.log("Por favor, completar todos los datos.");
                return;
            }
           
            if(arrayProductos(item => item.code === code)) {
                console.log("El codigo no se puede repetir.");
                return;
            }
            
            const newProduct = {
                id: ++ProductManager.id,
                title,
                description,
                price,
                img,
                code,
                stock,
                status: true
            };

            if (arrayProductos.length > 0) {
                ProductManager.id = arrayProductos.reduce((maxId, product) => Math.max(maxId, product.id), 0);
            }

            newProduct.id = ++ProductManager.id,

            arrayProductos.push(newProduct);
            await this.guardarArchivo(arrayProductos);
        } catch (error) {
            console.log("No se puede agregar el producto", error);
            throw error;
        }
    }
    async getProducts() {
        try {
            const arrayProductos = await this.leerArchivo();
            return arrayProductos;
        } catch (error) {
            console.log("Error: el archivo no pudo ser leído", error);
            throw error;
        }
    }
    
    async getProductById(id) {
        try {
            const arrayProductos = await this.leerArchivo();
            const productoBuscado = arrayProductos.find(item => item.id ===id);

            if (!productoBuscado) {
                console.log("El producto no fue encontrado");
                return null;
            } else {
                console.log("El producto fue encontrado");
                return productoBuscado;
            }
        } catch (error) {
            console.log("Error: el archivo no pudo ser leído", error);
            throw error;
        }
    }

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;
        } catch (error) {
            console.log("Error: el archivo no pudo ser leído", error);
            throw error;
        }
    }

    async guardarArchivo(arrayProductos) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
        } catch (error) {
            console.log("Error: el archivo no pudo ser guardado", error);
            throw error;
        }
    }

    async updateProduct(id, actualizarProducto) {
        try {
            const arrayProductos = await this.leerArchivo();

            const index = arrayProductos.findIndex(item => item.id === id);

            if (index !== -1) {
                arrayProductos[index] = { ...arrayProductos[index], ...actualizarProducto };
                await this.guardarArchivo(arrayProductos);
                console.log("El producto ha sido actualizado");
            } else {
                console.log("El producto no fue encontrado");
            }
        } catch (error) {
            console.log("Error: el producto no pudo ser actualizado", error);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const arrayProductos = await this.leerArchivo();

            const index = arrayProductos.findIndex(item => item.id === id);

            if (index !== -1) {
                arrayProductos.splice(index, 1);
                await this.guardarArchivo(arrayProductos);
                console.log("El producto ha sido eliminado");
            } else {
                console.log("El producto no fue encontrado");
            }
        } catch (error) {
            console.log("Error: el producto no se pudo eliminar", error);
            throw error;
        }
    }
}

module.exports = ProductManager;
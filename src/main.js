import fs from "fs";

class ProductManager {
    static id = 0;
    constructor(products = [], path = "./productos.json") {
        this.products = products;
        this.path = path;
    }

    addProduct(title, description, price, img, code, stock) {
        
        if(!title || !description || !price || !img || !code || !stock) {
            console.log("Por favor, completar todos los datos.");
            return;
        }
        if(this.products.some(item => item.code === code)) {
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
            stock
        }
        
        this.products.push(newProduct);

        const saveTheProduct = async () => {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
        }
        saveTheProduct()
    }

    async getProducts() {
        try {
            const readFile = await fs.promises.readFile(this.path, "utf-8");
            const arrayProduct = JSON.parse(readFile);
            console.log("Productos:", arrayProduct);
            return arrayProduct;
        } catch (error) {
            console.error(error)
            return [];
        }
    }

    async getProductsById(id) {
        try {
            const readFile = await fs.promises.readFile(this.path, "utf-8");
            const products = JSON.parse(readFile);
            const foundProducts = products.find(item => item.id === id)

            if (foundProducts) {
                console.log("El producto está disponible", foundProducts)
                return foundProducts;
            } else {
                console.log("El producto no está disponible")
                return null;
            }       
        } catch (error) {
            console.error(error)
            return null;
        } 
    }

    async updateProduct(id, updatedFields) {
        try {
            const readFile = await fs.promises.readFile(this.path, "utf-8")
            const products = JSON.parse(readFile)
            const productIndex = products.findIndex(item => item.id === id)

            if (productIndex !== -1) {
                if (updatedFields.price !== undefined) {
                    products[productIndex].price = updatedFields.price
                }
                if (updatedFields.stock !== undefined) {
                    products[productIndex].stock = updatedFields.stock
                }
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))

                console.log("El producto se ha actualizado de manera correcta")
                console.log(products)
            } else {
                console.log("El producto no está disponible!")
            }
        } catch (error) {
            console.error(error)
        }
    }

    async deleteProduct(id) {
        try {
            const readFile = await fs.promises.readFile(this.path, "utf-8")
            let products = JSON.parse(readFile)

            products = products.filter(product => product.id !== id)

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
            this.console.log("El producto ha sido eliminado de manera correcta!")
        } catch (error) {
            this.console.error(error)
        }
    }
}


//Testeo

const manager = new ProductManager();

// console.log(manager.getProducts());

// manager.addProduct("Camiseta de fútbol", "Camiseta del Barcelona para adultos", 20000, "url-img", "123abc", 5);
// manager.addProduct("Camiseta de fútbol", "Camiseta del  Real Madrid para adultos", 20000, "url-img", "1234abc", 5);
// manager.addProduct("Camiseta de fútbol", "Camiseta del Liverpool para adultos", 20000, "url-img", "12345abc", 5);
// manager.addProduct("Camiseta de fútbol", "Camiseta del Manchester City para adultos", 20000, "url-img", "123456abc", 5);
//repeticion de ID
// manager.addProduct("producto prueba 3", "este es el tercer producto prueba", 500, "sin imagen", "abc1234", 35);

//llamando al método getProducts
// console.log(manager.getProducts());

//llamando a getProductsById
// manager.getProductsById(2);
// manager.getProductsById(40);

//actualizacion de los productos
// manager.updateProduct(2, {price: 50000});

//eliminando un producto
// manager.deleteProduct(1)

export default ProductManager
class ProductManager {
    static id = 0;
    constructor() {
        this.products = [];
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
    }

    getProducts() {
        return this.products;
    }

    getProductsById(id) {
        const product = this.products.find(item => item.id === id);

        if(!product) {
            console.log("El producto no esta disponible.");
        } else {
            console.log("Producto disponible", product);
        }
    }
}

//Testeo

const manager = new ProductManager();

console.log(manager.getProducts());

manager.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25);
manager.addProduct("producto prueba 2", "este es el segundo producto prueba", 400, "sin imagen", "abc1234", 30);
//repeticion de ID
manager.addProduct("producto prueba 3", "este es el tercer producto prueba", 500, "sin imagen", "abc1234", 35);

console.log(manager.getProducts());

manager.getProductsById(2);
manager.getProductsById(40);
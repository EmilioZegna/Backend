const socket = io()

sockey.on("products", (data) => {
    renderizarProducts(data)
})

const renderizarProducts = (products) => {
    const contentProducts = documnent.getElementById("contentProducts")
    contentProducts.innerHTML = ""
    contentProducts.className = "contentProducts"

    products.forEach(item => {
        const card = document.createElement("div")
        card.className = "cardRtp"
        card.innerHTML = `
        <h3>Titulo: ${item.title}</h3>
        <p>Descripcion: ${item.description}</p>
        <p>Categoría: ${item.category}</p>
        <h4>Precio: $${item.price}</h4>
        <button>Borrar productos</button>
        `
        contentProducts.appendChild(card)

        card.querySelector("button").addEventListener("click", () => {
            deleteProducts(item.id)
        })
    })
}

const deleteProducts = (id) => {
    socket.emit("deleteProducts", id)
}

document.getElementById("buttonEnviar").addEventListener("click", () => {
    saveProducts()
})

const saveProducts = () => {
    const product = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        img: document.getElementById("img").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value === "true"
    }

    socket.emit("saveProducts", product)
}
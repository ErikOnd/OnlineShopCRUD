
const url = 'https://striveschool-api.herokuapp.com/api/product/'

let allProducts = [];
const productRow = document.getElementById('productRow')

window.onload = async () => {
    await getProductData()
}

const getProductData = async () => {
    try {
        let respons = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NDNmM2U3MzczODAwMTUzNzQzYjkiLCJpYXQiOjE2NzQxMzQ1MTYsImV4cCI6MTY3NTM0NDExNn0.nUQdLrMouoKnJbLVQm8jM_JM2p0LEb01vF3co0f2qWY"
            }
        })
        productRow.innerHTML = '';
        allProducts = await respons.json()
        createCards(allProducts)
    } catch (error) {
        console.log(error)
    }
}

const createCards = (allProducts) => {
    allProducts.map((product) => {
        return productRow.innerHTML +=
            `
        <div class="col mb-4 product-col">
            <div class="card h-100">
                <img src="${product.imageUrl}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h2 class="card-title">${product.name}</h2>
                    <p>Brand: ${product.brand}</p>
                    <p class="card-text">Description:${product.description}</p>
                    <span class="badge badge-success">${product.price}€</span>
                    <div class="btn-group" role="group" aria-label="Basic example">
                    <a href='backoffice.html?id=${product._id}' class='btn btn-primary'> Edit </a>
                        <a type="button" class="btn btn-danger"  onclick='deleteProduct("${product._id}")'>Delete</a>
                    </div>
                </div>
            </div>
        </div>
  `
    })
}


const deleteProduct = async (idToDelete) => {

    try {
        let respons = await fetch(url + "/" + idToDelete, {
            method: "DELETE",
            headers: new Headers({
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NDNmM2U3MzczODAwMTUzNzQzYjkiLCJpYXQiOjE2NzQxMzQ1MTYsImV4cCI6MTY3NTM0NDExNn0.nUQdLrMouoKnJbLVQm8jM_JM2p0LEb01vF3co0f2qWY",
                'Content-Type': 'application/json'
            })
        })

        console.log(respons)
        if (respons.ok) {
            await getProductData()
        }
    } catch (error) {
        console.log(error)
    }
}

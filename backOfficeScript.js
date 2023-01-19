const url = 'https://striveschool-api.herokuapp.com/api/product/';
const params = new URLSearchParams(location.search)
const id = params.get("id")

const productName = document.getElementById('productName');
const productDescription = document.getElementById('productDescription');
const productBrand = document.getElementById('productBrand');
const productImageUrl = document.getElementById('productImageUrl');
const productPrice = document.getElementById('productPrice');





window.onload = async () => {
    try {
        if (id !== null) {
            document.getElementById('CreateAndEdit').innerText = 'Edit Product';
            let respons = await fetch(url + "/" + id,
                {
                    method: "PUT",
                    headers: new Headers({
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NDNmM2U3MzczODAwMTUzNzQzYjkiLCJpYXQiOjE2NzQxMzQ1MTYsImV4cCI6MTY3NTM0NDExNn0.nUQdLrMouoKnJbLVQm8jM_JM2p0LEb01vF3co0f2qWY",
                        'Content-Type': 'application/json'
                    })
                }
            )
            if (respons.ok) {
                let { name, description, price, brand, imageUrl } = await respons.json()
                productName.value = name
                productDescription.value = description;
                productBrand.value = brand;
                productImageUrl.value = imageUrl;
                productPrice.value = price;

            } else {
                console.log(res)
                throw res.status + " " + res.statusText
            }
        }

    } catch (error) {
        console.log(error)

    }
}



let createProduct = async (submitEvent) => {
    try {
        submitEvent.preventDefault()
        const product = {
            name: productName.value,
            description: productDescription.value,
            brand: productBrand.value,
            imageUrl: productImageUrl.value,
            price: parseInt(productPrice.value)
        }
        console.log(product)
        const options = {
            method: "POST",
            headers: new Headers({
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NDNmM2U3MzczODAwMTUzNzQzYjkiLCJpYXQiOjE2NzQxMzQ1MTYsImV4cCI6MTY3NTM0NDExNn0.nUQdLrMouoKnJbLVQm8jM_JM2p0LEb01vF3co0f2qWY",
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(product)
        }
        let respons = await fetch(url, options)

    } catch (error) {
        console.log(error)
    }

    window.open("http://127.0.0.1:5500/index.html", "_self")
}
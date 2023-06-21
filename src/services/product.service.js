class Product {
    static URLBASE = "http://localhost:8081";

    getListProducts () {
        const dataUser = localStorage.getItem('dataUser');
        const token = JSON.parse(dataUser).data.token;

        return new Promise((resolve, reject) => {
            fetch(`${Product.URLBASE}/listProducts`, {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`
                }
            })
                .then(response => {
                    const statusCode = response.status;
                    return response.json()
                        .then(data => {
                            resolve({ statusCode, data });
                        });
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getProductById (_id) {
        const dataUser = localStorage.getItem('dataUser');
        const token = JSON.parse(dataUser).data.token;

        return new Promise((resolve, reject) => {
            fetch(`${Product.URLBASE}/product/${_id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`
                }
            })
                .then(response => {
                    const statusCode = response.status;
                    return response.json()
                        .then(data => {
                            resolve({ statusCode, data });
                        });
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    editProduct (_id, _data) {
        const dataUser = localStorage.getItem('dataUser');
        const token = JSON.parse(dataUser).data.token;

        return new Promise((resolve, reject) => {
            fetch(`${Product.URLBASE}/product/${_id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(_data)
            })
                .then(response => {
                    const statusCode = response.status;
                    return response.json()
                        .then(data => {
                            resolve({ statusCode, data });
                        });
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    insertProducts () {
        const dataUser = localStorage.getItem('dataUser');
        const token = JSON.parse(dataUser).data.token;

        return new Promise((resolve, reject) => {
            fetch(`${Product.URLBASE}/createProduct`, {
                method: 'POST',
                headers: {
                    'Authorization': `${token}`
                }
            })
                .then(response => {
                    const statusCode = response.status;
                    return response.json()
                        .then(data => {
                            resolve({ statusCode, data });
                        });
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}
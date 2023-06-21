window.addEventListener("load", () => {
    const dataUser = localStorage.getItem('dataUser');
    if (dataUser == null) {
        location.href = "../login.html";
    } else {
        printListProducts(1);
    }
});

var currentPage = 0;

function printListProducts(_page) {
    currentPage = _page;

    const tableProducts = document.getElementById("tableProducts");
    tableProducts.innerHTML = "";
    const contPagination = document.getElementById("contPagination");
    contPagination.innerHTML = "";

    const product = new Product();
    product.getListProducts()
        .then(result => {
            const statusCode = result.statusCode;
            const products = result.data;

            if (statusCode === 400) {
                console.log(data);
            } else {
                const numberProducts = products.data.length;

                if (numberProducts > 0) {
                    const numberPage = Math.ceil(numberProducts / 10);

                    for (let index = 1; index <= numberPage; index++) {
                        const li = document.createElement('li');
                        li.setAttribute("id", `page${index}`);
                        li.setAttribute("onclick", `printListProducts(${index});`);

                        if (_page == index) {
                            li.setAttribute("class", "page-item pointer active");
                        } else {
                            li.setAttribute("class", "page-item pointer");
                        }

                        li.innerHTML = `<div class="page-link">${index}</div>`;
                        contPagination.appendChild(li);
                    }

                    var counter = 0;
                    const start = _page == 1 ? _page : ((_page - 1) * 10) + 1;
                    const end = start + 9;

                    products.data.forEach(product => {
                        counter++;

                        if (counter >= start && counter <= end) {
                            const tr = document.createElement('tr');
                            tr.innerHTML = `<th scope="row">${product.id}</th>
                                            <td style="max-width: 110px;">${product.title}</td>
                                            <td>$ ${product.price}</td>
                                            <td style="max-width: 50px;">${product.category}</td>
                                            <td style="max-width: 250px !important;">${product.description}</td>
                                            <td>
                                                <img src="${product.image}" width="70">
                                            </td>
                                            <td class="d-flex align-items-center">
                                                <div class="pointer" data-bs-toggle="modal" data-bs-target="#modalEditProduct" onclick="printInfoMEditProduct(${product.id})">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                    </svg>
                                                </div>
                                            </td>`;

                            tableProducts.appendChild(tr);
                        }
                    });
                } else {
                    tableProducts.innerHTML = `<tr>
                                                    <td colspan="7">
                                                        <h5>There are no products to display</h5>
                                                    </td>
                                                </tr>`;
                }
            }
        })
        .catch(error => {
            console.log(error);
        });
}

function printInfoMEditProduct(_id) {
    const idMEditProduct = document.getElementById("idMEditProduct");
    const nameMEditProduct = document.getElementById("nameMEditProduct");
    const priceMEditProduct = document.getElementById("priceMEditProduct");
    const categoryMEditProduct = document.getElementById("categoryMEditProduct");
    const descriptionMEditProduct = document.getElementById("descriptionMEditProduct");

    const product = new Product();
    product.getProductById(_id)
        .then(result => {
            const statusCode = result.statusCode;
            const data = result.data;

            if (statusCode === 400) {
                console.log(data);
            } else {
                idMEditProduct.value = _id;
                nameMEditProduct.value = data.data.title;
                priceMEditProduct.value = data.data.price;
                categoryMEditProduct.value = data.data.category;
                descriptionMEditProduct.value = data.data.description;
            }
        })
        .catch(error => {
            console.log(error);
        });
}

const btnMEditProduct = document.getElementById('btnMEditProduct');
if (btnMEditProduct) {
    btnMEditProduct.addEventListener('click', () => {
        const idMEditProduct = document.getElementById("idMEditProduct");
        const nameMEditProduct = document.getElementById("nameMEditProduct");
        const priceMEditProduct = document.getElementById("priceMEditProduct");
        const categoryMEditProduct = document.getElementById("categoryMEditProduct");
        const descriptionMEditProduct = document.getElementById("descriptionMEditProduct");
        const alertMsjEditProduct = document.getElementById("alertMsjEditProduct");
        const btnCloseMEditProduct = document.getElementById("btnCloseMEditProduct");

        const data = {
            title: nameMEditProduct.value,
            price: priceMEditProduct.value,
            category: categoryMEditProduct.value,
            description: descriptionMEditProduct.value
        }

        const product = new Product();
        product.editProduct(idMEditProduct.value, data)
            .then(result => {
                const statusCode = result.statusCode;
                const data = result.data;

                if (statusCode === 400) {
                    btnCloseMEditProduct.click();

                    alertMsjEditProduct.classList.remove("hidden");
                    alertMsjEditProduct.classList.add("alert-danger");
                    alertMsjEditProduct.innerHTML = `<strong>Error!</strong> ${data.data}
                    <button type="button" class="btn-close" id="btnCloseAlertMsjEditProduct"></button>`;

                    evenCloseAlertMsjEditProduct();
                } else {
                    btnCloseMEditProduct.click();

                    printListProducts(currentPage);

                    alertMsjEditProduct.classList.remove("hidden");
                    alertMsjEditProduct.classList.add("alert-info");
                    alertMsjEditProduct.innerHTML = `<strong>Success!</strong> ${data.message}
                    <button type="button" class="btn-close" id="btnCloseAlertMsjEditProduct"></button>`;

                    evenCloseAlertMsjEditProduct();
                }

            })
            .catch(error => {
                console.log(error);
            });
    })
}

function evenCloseAlertMsjEditProduct() {
    const btnCloseAlertMsjEditProduct = document.getElementById('btnCloseAlertMsjEditProduct');
    btnCloseAlertMsjEditProduct.addEventListener('click', () => {
        const alertMsjEditProduct = document.getElementById("alertMsjEditProduct");
        alertMsjEditProduct.classList.add("hidden");
    });
}

const btnInsertProducts = document.getElementById('btnInsertProducts');
btnInsertProducts.addEventListener('click', () => {
    const alertMsjEditProduct = document.getElementById("alertMsjEditProduct");
    const btnCloseMInsertProducts = document.getElementById("btnCloseMInsertProducts");

    const product = new Product();
    product.insertProducts()
        .then(result => {
            const statusCode = result.statusCode;
            const data = result.data;

            if (statusCode === 400) {
                console.log(data);
            } else {
                btnCloseMInsertProducts.click();

                printListProducts(1);

                alertMsjEditProduct.classList.remove("hidden");
                alertMsjEditProduct.classList.add("alert-info");
                alertMsjEditProduct.innerHTML = `<strong>Success!</strong> ${data.message}
                <button type="button" class="btn-close" id="btnCloseAlertMsjEditProduct"></button>`;

                evenCloseAlertMsjEditProduct();
            }
        })
        .catch(error => {
            console.log(error);
        });
});

const btnLogout = document.getElementById("btnLogout");
if (btnLogout) {
    btnLogout.addEventListener("click", () => {
        localStorage.removeItem("dataUser");
        location.href = "../login.html";
    })
}

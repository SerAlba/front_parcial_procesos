window.addEventListener("load", () => {
    const dataUser = localStorage.getItem('dataUser');
    if (dataUser == null) {
        location.href = "../login.html";
    } else {
        printListUsers(1);
    }
});

var currentPage = 0;

function printListUsers(_page) {
    currentPage = _page;

    const tableUsers = document.getElementById("tableUsers");
    tableUsers.innerHTML = "";
    const contPagination = document.getElementById("contPagination");
    contPagination.innerHTML = "";

    const user = new User();
    user.getListUsers()
        .then(result => {
            const statusCode = result.statusCode;
            const users = result.data;

            if (statusCode === 400) {
                console.log(data);
            } else {
                const numberUsers = users.data.length;

                if (numberUsers > 0) {
                    const numberPage = Math.ceil(numberUsers / 2);

                    for (let index = 1; index <= numberPage; index++) {
                        const li = document.createElement('li');
                        li.setAttribute("id", `page${index}`);
                        li.setAttribute("onclick", `printListUsers(${index});`);

                        if (_page == index) {
                            li.setAttribute("class", "page-item pointer active");
                        } else {
                            li.setAttribute("class", "page-item pointer");
                        }

                        li.innerHTML = `<div class="page-link">${index}</div>`;
                        contPagination.appendChild(li);
                    }

                    var counter = 0;
                    const start = _page == 1 ? _page : ((_page - 1) * 2) + 1;
                    const end = start + 1;

                    users.data.forEach(user => {
                        counter++;
                        if (counter >= start && counter <= end) {
                            const tr = document.createElement('tr');
                            tr.innerHTML = `<th scope="row">${user.id}</th>
                                            <td>${user.firstName}</td>
                                            <td>${user.lastName}</td>
                                            <td>${user.email}</td>
                                            <td>${user.address}</td>
                                            <td>${user.birthday}</td>
                                            <td class="d-flex align-items-center">
                                            <div class="pointer" data-bs-toggle="modal" data-bs-target="#modalEditUser" onclick="printInfoMEditUser(${user.id})">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                </svg>
                                            </div>
                                            </td>`;
                                            
                            tableUsers.appendChild(tr);
                        }
                    });
                } else {
                    tableUsers.innerHTML = `<tr>
                                                <td colspan="6">
                                                    <h5>There are no users to display</h5>
                                                </td>
                                            </tr>`;
                }
            }
        })
        .catch(error => {
            console.log(error);
        });
}

function printInfoMEditUser(_id) {
    const idMEditUser = document.getElementById("idMEditUser");
    const firstNameMEditUser = document.getElementById("firstNameMEditUser");
    const lastNameMEditUser = document.getElementById("lastNameMEditUser");
    const emailMEditUser = document.getElementById("emailMEditUser");
    const addressMEditUser= document.getElementById("addressMEditUser");
    const birthdayMEditUser = document.getElementById("birthdayMEditUser");

    const user = new User();
    user.getUserById(_id)
        .then(result => {
            const statusCode = result.statusCode;
            const data = result.data;

            if (statusCode === 400) {
                console.log(data);
            } else {
                idMEditUser.value = _id;
                firstNameMEditUser.value = data.data.firstName;
                lastNameMEditUser.value = data.data.lastName;
                emailMEditUser.value = data.data.email;
                addressMEditUser.value = data.data.address;
                birthdayMEditUser.value = data.data.birthday;
            }
        })
        .catch(error => {
            console.log(error);
        });
}

const btnSaveEditUser = document.getElementById('btnSaveEditUser');
if (btnSaveEditUser) {
    btnSaveEditUser.addEventListener('click', () => {
        const idMEditUser = document.getElementById("idMEditUser");
        const firstNameMEditUser = document.getElementById("firstNameMEditUser");
        const lastNameMEditUser = document.getElementById("lastNameMEditUser");
        const emailMEditUser = document.getElementById("emailMEditUser");
        const addressMEditUser= document.getElementById("addressMEditUser");
        const birthdayMEditUser = document.getElementById("birthdayMEditUser");
        const btnCloseMEditUser = document.getElementById("btnCloseMEditUser");
        const alertMsjEditUser = document.getElementById("alertMsjEditUser");

        const data = {
            firstName: firstNameMEditUser.value,
            lastName: lastNameMEditUser.value,
            email: emailMEditUser.value,
            address: addressMEditUser.value,
            birthday: birthdayMEditUser.value,
        }

        const user = new User();
        user.editUser(idMEditUser.value, data)
            .then(result => {
                const statusCode = result.statusCode;
                const data = result.data;

                if (statusCode === 400) {
                    btnCloseMEditUser.click();

                    alertMsjEditUser.classList.remove("hidden");
                    alertMsjEditUser.classList.add("alert-danger");
                    alertMsjEditUser.innerHTML = `<strong>Error!</strong> ${data.data}
                    <button type="button" class="btn-close" id="btnCloseAlertMsjEditUser"></button>`;

                    evenCloseAlertMsjEditUser();
                } else {
                    btnCloseMEditUser.click();

                    printListUsers(currentPage);

                    alertMsjEditUser.classList.remove("hidden");
                    alertMsjEditUser.classList.add("alert-info");
                    alertMsjEditUser.innerHTML = `<strong>Success!</strong> ${data.message}
                    <button type="button" class="btn-close" id="btnCloseAlertMsjEditUser"></button>`;

                    evenCloseAlertMsjEditUser();
                }
            })
            .catch(error => {
                console.log(error);
            });
    })
}

function evenCloseAlertMsjEditUser() {
    const btnCloseAlertMsjEditUser = document.getElementById('btnCloseAlertMsjEditUser');
    btnCloseAlertMsjEditUser.addEventListener('click', () => {
        const alertMsjEditUser = document.getElementById("alertMsjEditUser");
        alertMsjEditUser.classList.add("hidden");
    });
}

const btnLogout = document.getElementById("btnLogout");
if (btnLogout) {
    btnLogout.addEventListener("click", () => {
        localStorage.removeItem("dataUser");
        location.href = "../login.html";
    })
}

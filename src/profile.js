window.addEventListener("load", () => {
    const dataUser = localStorage.getItem('dataUser');
    if (dataUser == null) {
        location.href = "../login.html";
    } else {
        printUserInformation(dataUser);
    }
});

function printUserInformation (_dataUser) {
    const data = JSON.parse(_dataUser).data;

    const nameUser = document.getElementById("nameUser");
    const userId = document.getElementById("userId");
    const address = document.getElementById("address");
    const email = document.getElementById("email");
    const birthday = document.getElementById("birthday");

    nameUser.innerHTML = `${data.firstName} ${data.lastName}`;
    userId.value = data.id;
    address.value = data.address;
    email.value = data.email;
    birthday.value = data.birthday;
}

const btnLogout = document.getElementById("btnLogout");
if (btnLogout) {
    btnLogout.addEventListener("click", () => {
        localStorage.removeItem("dataUser");
        location.href = "../login.html";
    })
}

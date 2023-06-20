const btnLogin = document.getElementById("btnLogin");
if (btnLogin) {
    btnLogin.addEventListener("click", () => {
        const inputEmail = document.getElementById("inputEmail");
        const inputPassword = document.getElementById("inputPassword");
        const alertErrorLogin = document.getElementById("alertErrorLogin");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (inputEmail.value.length == 0 || inputPassword.value.length == 0 || !emailRegex.test(inputEmail.value)) {
            alertErrorLogin.classList.remove("hidden");
            alertErrorLogin.innerHTML = "<strong>Error!</strong> The data entered is not valid";
        } else {
            alertErrorLogin.classList.add("hidden");

            const data = {
                email: inputEmail.value,
                password: inputPassword.value
            }

            const auth = new Auth();
            auth.login(data)
                .then(result => {
                    const statusCode = result.statusCode;
                    const data = result.data;

                    if (statusCode === 400) {
                        alertErrorLogin.classList.remove("hidden");
                        alertErrorLogin.innerHTML = `<strong>Error!</strong> ${data.data}`;
                    } else {
                        localStorage.setItem("dataUser", JSON.stringify(data));
                        location.href = "./panel";
                    }
                })
                .catch(error => {
                    alertErrorLogin.classList.remove("hidden");
                    alertErrorLogin.innerHTML = `<strong>Error!</strong> ${error}`;
                });
        }
    });
}

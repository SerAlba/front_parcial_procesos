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
// Registration functionality
const btnRegister = document.getElementById("btnRegister");
if (btnRegister) {
  btnRegister.addEventListener("click", () => {
    // Retrieve the input values from the registration form
    const inputFirstName = document.getElementById("inputFirstName").value;
    const inputLastName = document.getElementById("inputLastName").value;
    const inputEmail = document.getElementById("inputEmail").value;
    const inputPassword = document.getElementById("inputPassword").value;
    const inputAddress = document.getElementById("inputAddress").value;
    const inputBirthday = document.getElementById("inputBirthday").value;
    const alertErrorRegister = document.getElementById("alertErrorRegister");

    if (
      inputFirstName.length === 0 ||
      inputLastName.length === 0 ||
      inputEmail.length === 0 ||
      inputPassword.length === 0 ||
      inputConfirmPassword.length === 0 ||
      inputAddress.length === 0 ||
      inputBirthday.length === 0
    ) {
      alertErrorRegister.classList.remove("hidden");
      alertErrorRegister.innerHTML = "<strong>Error!</strong> All fields are required";
    } else if (inputPassword !== inputConfirmPassword) {
      alertErrorRegister.classList.remove("hidden");
      alertErrorRegister.innerHTML = "<strong>Error!</strong> Passwords do not match";
    } else if (!passwordRegex.test(inputPassword)) {
      alertErrorRegister.classList.remove("hidden");
      alertErrorRegister.innerHTML =
        "<strong>Error!</strong> Password must contain at least 8 characters, including uppercase and lowercase letters, and numbers";
    } else {
      alertErrorRegister.classList.add("hidden");

      const data = {
        firstName: inputFirstName,
        lastName: inputLastName,
        email: inputEmail,
        password: inputPassword,
        address: inputAddress,
        birthday: inputBirthday,
      };

      const auth = new Auth();

    // Call the register method and handle the response
    auth.register(data)
      .then(result => {
        const statusCode = result.statusCode;
        const responseData = result.data;

        // Handle the response based on the status code
        if (statusCode === 200) {
          // Registration success
          console.log("Registration successful", responseData);
          location.href = "./login.html"; // Redireccionar a la página de inicio de sesión        } else {
        } else {
          // Registration failed
          alertErrorRegister.classList.remove("hidden");
          alertErrorRegister.innerHTML = `<strong>Error!</strong> ${responseData.data}`;
        }
      })
      .catch(error => {
        console.error("Error during registration", error);
        alertErrorRegister.classList.remove("hidden");
        alertErrorRegister.innerHTML = `<strong>Error!</strong> ${error}`;
      });
    }
  });
}
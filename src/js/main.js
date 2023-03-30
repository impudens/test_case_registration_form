

let firstNameInput = document.querySelector("#first-name");
let lastNameInput = document.querySelector("#last-name");
let emailInput = document.querySelector("#email");
let passwordInput = document.querySelector("#password");
let passwordConfirmInput = document.querySelector("#password-confirm");
let birthDayInput = document.querySelector("#birth-day");
let formButton = document.querySelector("#form-button");


let textValidation = function (textInput) {
    textInput.addEventListener("input", (event) => {
        let name = textInput.value;
        name = name.toLowerCase();
        if (name === "") {
            textInput.classList.remove("valid");
            textInput.classList.remove("invalid");
            textInput.classList.add("required");
        } else if (/^[А-ЯЁ]{1}[А-ЯЁ]+$/i.test(name)) {
            textInput.classList.remove("invalid");
            textInput.classList.remove("required");
            textInput.classList.add("valid");
        } else if (/^[A-Z]{1}[A-Z]+$/i.test(name)) {
            textInput.classList.remove("invalid");
            textInput.classList.remove("required");
            textInput.classList.add("valid");
        } else {
            textInput.classList.remove("required");
            textInput.classList.remove("valid");
            textInput.classList.add("invalid");
        }
    });
}

let emailValidation = function (emailInput) {
    emailInput.addEventListener("input", (event) => {
        let email = emailInput.value;
        email = email.toLowerCase();
        if (email === "") {
            emailInput.classList.remove("valid");
            emailInput.classList.remove("invalid");
            emailInput.classList.add("required");
        } else if (/^(.+)@(.+)\.(.+)$/i.test(email)) {
            emailInput.classList.remove("invalid");
            emailInput.classList.remove("required");
            emailInput.classList.add("valid");
        } else {
            emailInput.classList.remove("required");
            emailInput.classList.remove("valid");
            emailInput.classList.add("invalid");
        }
    });
}

let passwordValidation = function (passwordInput, passwordConfirmInput) {
    passwordConfirmInput.addEventListener("input", (event) => {
        if (password.value === passwordConfirmInput.value) {
            passwordInput.classList.remove("invalid");
            passwordInput.classList.add("valid");
            passwordConfirmInput.classList.remove("invalid");
            passwordConfirmInput.classList.add("valid");
        } else {
            passwordInput.classList.remove("valid");
            passwordInput.classList.add("invalid");
            passwordConfirmInput.classList.remove("valid");
            passwordConfirmInput.classList.add("invalid");
        }
        if (firstNameInput.classList.contains("valid")) {
            if (lastNameInput.classList.contains("valid")) {
                if (emailInput.classList.contains("valid")) {
                    if (passwordInput.classList.contains("valid")) {
                        if (passwordConfirmInput.classList.contains("valid")) {
                            formButton.removeAttribute("disabled");
                        }
                    }
                }
            }
        }
    });
}

let formValidation = function () {
    textValidation(firstNameInput);
    textValidation(lastNameInput);
    emailValidation(emailInput);
    passwordValidation(passwordInput, passwordConfirmInput);

}
formValidation();
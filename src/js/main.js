
let form = document.querySelector("#registration-form");
let firstNameInput = document.querySelector("#first-name");
let lastNameInput = document.querySelector("#last-name");
let emailInput = document.querySelector("#email");
let passwordInput = document.querySelector("#password");
let passwordConfirmInput = document.querySelector("#password-confirm");
let birthDayInput = document.querySelector("#birth-day");
let formButton = document.querySelector("#form-button");
let resetButton = document.querySelector("#clear-button");
let firstNameErrorBlock = document.querySelector("#name-error");
let lastNameErrorBlock = document.querySelector("#last-name-error");
let passwordErrorBlock = document.querySelector("#password-error");
let passwordConfirmErrorBlock = document.querySelector("#password-confirm-error");
let emailErrorBlock = document.querySelector("#email-error");
let birthDayErrorBlock = document.querySelector("#birth-day-error");

let classChanger = function (element, isValid) {
    element.classList.remove("invalid");
    element.classList.remove("valid");
    if (isValid === 3) {
    } else if (isValid) {
        element.classList.add("valid");
    } else if (!isValid) {
        element.classList.add("invalid");
    }
    buttonStatusCheck();
}
let formReset = function () {
    form.addEventListener('reset', (event) => {
        classChanger(firstNameInput, 3);
        classChanger(lastNameInput, 3);
        classChanger(emailInput, 3);
        classChanger(passwordInput, 3);
        classChanger(passwordConfirmInput, 3);
        classChanger(birthDayInput, 3);
        passwordErrorBlock.setAttribute("hidden", true);
        passwordConfirmErrorBlock.setAttribute("hidden", true);
        emailErrorBlock.setAttribute("hidden", true);
        birthDayErrorBlock.setAttribute("hidden", true);
        formButton.setAttribute("disabled", true);
        lastNameErrorBlock.setAttribute("disabled", true);
        firstNameErrorBlock.setAttribute("disabled", true);
    });
}

let nameValidation = function (element, elementErrorBlock) {
    element.addEventListener("focusout", (event) => {
        let name = element.value;
        let isValid = false;
        let errorText = '';
        name = name.toLowerCase();
        if ((/^[А-ЯЁ]{1}[А-ЯЁ]+$/i.test(name)) || (/^[A-Z]{1}[A-Z]+$/i.test(name))) {
            isValid = true;
            elementErrorBlock.setAttribute("hidden", true);
        }
        classChanger(element, isValid);
        if (!isValid) {
            errorText = "Имя Фамилия должны быть написаны на английском или русском, а так же быть длиной от 2 до 50 символов"
            errorAlert(elementErrorBlock, errorText);
        }
    });
}
let emailValidation = function (emailInput) {
    emailInput.addEventListener("focusout", (event) => {
        let email = emailInput.value;
        let isValid = false;
        let errorText = '';
        if (/^(.+)@(.+)\.(.+)$/i.test(email)) {
            isValid = true;
            emailErrorBlock.setAttribute("hidden", true);
        }
        classChanger(emailInput, isValid);
        if (!isValid) {
            errorText = "Почта дожна быть вида example@mail.com"
            errorAlert(emailErrorBlock, errorText);
        }
    });
}
let birthDayValidation = function (element) {
    element.addEventListener("focusout", (event) => {
        let birthDay = element.value.split('-');
        console.log(birthDay);
        let isValid = false;
        let errorText = '';
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        if (birthDay[0] < year - 18) {
            isValid = true;
            birthDayErrorBlock.setAttribute("hidden", true);
        } else if (birthDay[0] == year - 18) {
            if (birthDay[1] < month + 1) {
                isValid = true;
                birthDayErrorBlock.setAttribute("hidden", true);
            } else if (birthDay[1] == month + 1) {
                if (birthDay[2] <= day) {
                    isValid = true;
                    birthDayErrorBlock.setAttribute("hidden", true);
                }
            }
        }
        classChanger(element, isValid);
        if (!isValid) {
            errorText = "Вам должно быть больше 18 лет!";
            errorAlert(birthDayErrorBlock, errorText);
        }
    });
}

let errorAlert = function (element, errorMessage) {
    element.textContent = errorMessage;
    element.removeAttribute("hidden");
}

let passwordValidation = function (element) {
    passwordInput.addEventListener('focusout', () => {
        let password = element.value;
        let isValid = false;
        let specSympols = ['/', '@', '!'];
        let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let errorText = '';
        let passwordLength = password.length;
        if (passwordLength >= 8) {
            if (specSympols.some(element => password.includes(element))) {
                if (numbers.some(element => password.includes(element))) {
                    if (password != password.toLowerCase()) {
                        isValid = true;
                        passwordErrorBlock.setAttribute("hidden", true);
                    } else {
                        errorText = "Нужно использовать хотя бы 1 заглавную и 1 строчную букву";
                    }
                } else {
                    errorText = "Нужно использовать хотя бы 1 цифру";
                }
            } else {
                errorText = "Нужно использовать хотя бы 1 из символов !, @, /";
            }
        } else {
            errorText = "Пароль должен быть больше 8 символов";
        }
        classChanger(element, isValid);
        if (!isValid) {
            errorAlert(passwordErrorBlock, errorText);
        }
    });
}

let passwordConfirmValidation = function (element) {
    element.addEventListener('focusout', (Event) => {
        let errorText = '';
        let isValid = false;
        if (passwordInput.classList.contains("valid")) {
            if (passwordInput.value === element.value) {
                isValid = true;
                passwordConfirmErrorBlock.setAttribute("hidden", true);
            } else {
                errorText = "Пароли не совпадают";
            }
        } else {
            errorText = "Прошлый пароль не валиден";
        }
        classChanger(element, isValid);
        if (!isValid) {
            errorAlert(passwordConfirmErrorBlock, errorText);
        }
    });
}

let buttonStatusCheck = function () {
    formButton.setAttribute("disabled", true);
    if (firstNameInput.classList.contains("valid")) {
        if (lastNameInput.classList.contains("valid")) {
            if (emailInput.classList.contains("valid")) {
                if (passwordInput.classList.contains("valid")) {
                    if (passwordConfirmInput.classList.contains("valid")) {
                        if (birthDayInput.classList.contains("valid")) {
                            formButton.removeAttribute("disabled");
                        }
                    }
                }
            }
        }
    }
}

let formValidation = function () {
    nameValidation(firstNameInput, firstNameErrorBlock);
    nameValidation(lastNameInput, lastNameErrorBlock);
    emailValidation(emailInput);
    passwordValidation(passwordInput);
    passwordConfirmValidation(passwordConfirmInput);
    birthDayValidation(birthDayInput);
    formReset();
}
formValidation();
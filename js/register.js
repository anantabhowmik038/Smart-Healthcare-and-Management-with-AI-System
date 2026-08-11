const registerForm = document.getElementById("registerForm");

const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("regEmail");
const phoneInput = document.getElementById("phone");

const passwordInput = document.getElementById("regPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");

const registerError = document.getElementById("registerError");

const registrationModal =
    document.getElementById("registrationModal");

const continueLoginBtn =
    document.getElementById("continueLoginBtn");


registerForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;


    registerError.textContent = "";

    confirmPasswordInput.classList.remove(
        "register-input-error"
    );


    if (fullName.length < 3) {

        registerError.textContent =
            "Please enter your full name.";

        return;
    }


    if (email === "") {

        registerError.textContent =
            "Please enter your email address.";

        return;
    }


    if (phone.length < 10) {

        registerError.textContent =
            "Please enter a valid phone number.";

        return;
    }


    if (password.length < 6) {

        registerError.textContent =
            "Password must contain at least 6 characters.";

        return;
    }


    if (password !== confirmPassword) {

        registerError.textContent =
            "Passwords do not match.";

        confirmPasswordInput.classList.add(
            "register-input-error"
        );

        return;
    }


    /*
        Prototype registration only.

        Patient information will later be stored
        in the database during backend integration.
    */

    registrationModal.classList.add("show");

});


continueLoginBtn.addEventListener("click", function () {

    window.location.href = "login.html";

});
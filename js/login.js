const loginForm = document.getElementById("loginForm");

const roleInput = document.getElementById("role");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const loginError = document.getElementById("loginError");


loginForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const role = roleInput.value;
    const email = emailInput.value.trim();
    const password = passwordInput.value;


    loginError.textContent = "";


    if (role === "") {

        loginError.textContent =
            "Please select your user role.";

        return;
    }


    if (email === "") {

        loginError.textContent =
            "Please enter your email address.";

        return;
    }


    if (password.length < 6) {

        loginError.textContent =
            "Password must contain at least 6 characters.";

        return;
    }


    /*
        Prototype role-based navigation.
        Authentication with a database will be
        implemented during backend integration.
    */

    if (role === "patient") {

        window.location.href =
            "patient-dashboard.html";

    }

    else if (role === "doctor") {

        window.location.href =
            "doctor-dashboard.html";

    }

    else if (role === "receptionist") {

        window.location.href =
            "receptionist-dashboard.html";

    }

    else if (role === "pharmacist") {

        window.location.href =
            "pharmacist-dashboard.html";

    }

    else if (role === "lab") {

        window.location.href =
            "lab-dashboard.html";

    }

    else if (role === "admin") {

        window.location.href =
            "admin-dashboard.html";

    }

});
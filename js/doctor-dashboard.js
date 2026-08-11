const doctorSidebar =
    document.getElementById("doctorSidebar");

const doctorMenuToggle =
    document.getElementById("doctorMenuToggle");

const doctorLogoutBtn =
    document.getElementById("doctorLogoutBtn");

const doctorLogoutModal =
    document.getElementById("doctorLogoutModal");

const doctorCancelLogout =
    document.getElementById("doctorCancelLogout");

const doctorConfirmLogout =
    document.getElementById("doctorConfirmLogout");


/* ================= MOBILE SIDEBAR ================= */

doctorMenuToggle.addEventListener("click", function () {

    doctorSidebar.classList.toggle("open");

});


/* ================= OPEN LOGOUT MODAL ================= */

doctorLogoutBtn.addEventListener("click", function () {

    doctorLogoutModal.classList.add("show");

});


/* ================= CANCEL LOGOUT ================= */

doctorCancelLogout.addEventListener("click", function () {

    doctorLogoutModal.classList.remove("show");

});


/* ================= CONFIRM LOGOUT ================= */

doctorConfirmLogout.addEventListener("click", function () {

    window.location.href = "login.html";

});


/* ================= CLICK OUTSIDE TO CLOSE ================= */

doctorLogoutModal.addEventListener("click", function (event) {

    if (event.target === doctorLogoutModal) {

        doctorLogoutModal.classList.remove("show");

    }

});
const pharmacistSidebar =
    document.getElementById("pharmacistSidebar");

const pharmacistMenuToggle =
    document.getElementById("pharmacistMenuToggle");

const pharmacistLogoutBtn =
    document.getElementById("pharmacistLogoutBtn");

const pharmacistLogoutModal =
    document.getElementById("pharmacistLogoutModal");

const pharmacistCancelLogout =
    document.getElementById("pharmacistCancelLogout");

const pharmacistConfirmLogout =
    document.getElementById("pharmacistConfirmLogout");


/* ================= MOBILE SIDEBAR ================= */

pharmacistMenuToggle.addEventListener("click", function () {

    pharmacistSidebar.classList.toggle("open");

});


/* ================= OPEN LOGOUT MODAL ================= */

pharmacistLogoutBtn.addEventListener("click", function () {

    pharmacistLogoutModal.classList.add("show");

});


/* ================= CANCEL LOGOUT ================= */

pharmacistCancelLogout.addEventListener("click", function () {

    pharmacistLogoutModal.classList.remove("show");

});


/* ================= CONFIRM LOGOUT ================= */

pharmacistConfirmLogout.addEventListener("click", function () {

    window.location.href = "login.html";

});


/* ================= CLICK OUTSIDE TO CLOSE ================= */

pharmacistLogoutModal.addEventListener("click", function (event) {

    if (event.target === pharmacistLogoutModal) {

        pharmacistLogoutModal.classList.remove("show");

    }

});
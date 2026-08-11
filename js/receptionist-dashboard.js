const receptionistSidebar =
    document.getElementById("receptionistSidebar");

const receptionistMenuToggle =
    document.getElementById("receptionistMenuToggle");

const receptionistLogoutBtn =
    document.getElementById("receptionistLogoutBtn");

const receptionistLogoutModal =
    document.getElementById("receptionistLogoutModal");

const receptionistCancelLogout =
    document.getElementById("receptionistCancelLogout");

const receptionistConfirmLogout =
    document.getElementById("receptionistConfirmLogout");


/* ================= MOBILE SIDEBAR ================= */

receptionistMenuToggle.addEventListener("click", function () {

    receptionistSidebar.classList.toggle("open");

});


/* ================= OPEN LOGOUT MODAL ================= */

receptionistLogoutBtn.addEventListener("click", function () {

    receptionistLogoutModal.classList.add("show");

});


/* ================= CANCEL LOGOUT ================= */

receptionistCancelLogout.addEventListener("click", function () {

    receptionistLogoutModal.classList.remove("show");

});


/* ================= CONFIRM LOGOUT ================= */

receptionistConfirmLogout.addEventListener("click", function () {

    window.location.href = "login.html";

});


/* ================= CLICK OUTSIDE TO CLOSE ================= */

receptionistLogoutModal.addEventListener("click", function (event) {

    if (event.target === receptionistLogoutModal) {

        receptionistLogoutModal.classList.remove("show");

    }

});
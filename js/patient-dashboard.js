const dashboardSidebar =
    document.getElementById("dashboardSidebar");

const dashboardMenuToggle =
    document.getElementById("dashboardMenuToggle");

const logoutBtn =
    document.getElementById("logoutBtn");

const logoutModal =
    document.getElementById("logoutModal");

const cancelLogoutBtn =
    document.getElementById("cancelLogoutBtn");

const confirmLogoutBtn =
    document.getElementById("confirmLogoutBtn");


/* ================= MOBILE SIDEBAR ================= */

dashboardMenuToggle.addEventListener("click", function () {

    dashboardSidebar.classList.toggle("open");

});


/* ================= LOGOUT MODAL ================= */

logoutBtn.addEventListener("click", function () {

    logoutModal.classList.add("show");

});


cancelLogoutBtn.addEventListener("click", function () {

    logoutModal.classList.remove("show");

});


confirmLogoutBtn.addEventListener("click", function () {

    window.location.href = "login.html";

});


/* Close modal when clicking outside the modal card */

logoutModal.addEventListener("click", function (event) {

    if (event.target === logoutModal) {

        logoutModal.classList.remove("show");

    }

});
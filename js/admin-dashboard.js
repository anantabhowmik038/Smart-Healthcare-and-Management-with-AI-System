const adminSidebar =
    document.getElementById("adminSidebar");

const adminMenuToggle =
    document.getElementById("adminMenuToggle");

const adminLogoutBtn =
    document.getElementById("adminLogoutBtn");

const adminLogoutModal =
    document.getElementById("adminLogoutModal");

const adminCancelLogout =
    document.getElementById("adminCancelLogout");

const adminConfirmLogout =
    document.getElementById("adminConfirmLogout");


/* MOBILE SIDEBAR */

adminMenuToggle.addEventListener("click", function () {

    adminSidebar.classList.toggle("open");

});


/* OPEN LOGOUT MODAL */

adminLogoutBtn.addEventListener("click", function () {

    adminLogoutModal.classList.add("show");

});


/* CANCEL LOGOUT */

adminCancelLogout.addEventListener("click", function () {

    adminLogoutModal.classList.remove("show");

});


/* CONFIRM LOGOUT */

adminConfirmLogout.addEventListener("click", function () {

    window.location.href = "login.html";

});


/* CLICK OUTSIDE TO CLOSE */

adminLogoutModal.addEventListener("click", function (event) {

    if (event.target === adminLogoutModal) {

        adminLogoutModal.classList.remove("show");

    }

});
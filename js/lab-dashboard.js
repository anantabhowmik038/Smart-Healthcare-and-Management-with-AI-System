const labSidebar =
    document.getElementById("labSidebar");

const labMenuToggle =
    document.getElementById("labMenuToggle");

const labLogoutBtn =
    document.getElementById("labLogoutBtn");

const labLogoutModal =
    document.getElementById("labLogoutModal");

const labCancelLogout =
    document.getElementById("labCancelLogout");

const labConfirmLogout =
    document.getElementById("labConfirmLogout");


/* MOBILE SIDEBAR */

labMenuToggle.addEventListener("click", function () {

    labSidebar.classList.toggle("open");

});


/* OPEN LOGOUT MODAL */

labLogoutBtn.addEventListener("click", function () {

    labLogoutModal.classList.add("show");

});


/* CANCEL LOGOUT */

labCancelLogout.addEventListener("click", function () {

    labLogoutModal.classList.remove("show");

});


/* CONFIRM LOGOUT */

labConfirmLogout.addEventListener("click", function () {

    window.location.href = "login.html";

});


/* CLICK OUTSIDE TO CLOSE */

labLogoutModal.addEventListener("click", function (event) {

    if (event.target === labLogoutModal) {

        labLogoutModal.classList.remove("show");

    }

});
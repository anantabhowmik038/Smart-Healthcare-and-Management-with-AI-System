const appointmentSidebar =
    document.getElementById("appointmentSidebar");

const appointmentMenuToggle =
    document.getElementById("appointmentMenuToggle");

const filterButtons =
    document.querySelectorAll(".appointment-filter-btn");

const appointmentCards =
    document.querySelectorAll(".appointment-item-card");

const appointmentNoResults =
    document.getElementById("appointmentNoResults");

const upcomingCount =
    document.getElementById("upcomingCount");

const completedCount =
    document.getElementById("completedCount");

const cancelledCount =
    document.getElementById("cancelledCount");

const totalCount =
    document.getElementById("totalCount");

const appointmentCancelModal =
    document.getElementById("appointmentCancelModal");

const cancelAppointmentId =
    document.getElementById("cancelAppointmentId");

const cancelDoctorName =
    document.getElementById("cancelDoctorName");

const keepAppointmentBtn =
    document.getElementById("keepAppointmentBtn");

const confirmCancelAppointmentBtn =
    document.getElementById("confirmCancelAppointmentBtn");

const appointmentSuccessModal =
    document.getElementById("appointmentSuccessModal");

const appointmentSuccessBtn =
    document.getElementById("appointmentSuccessBtn");

const appointmentLogoutBtn =
    document.getElementById("appointmentLogoutBtn");

const appointmentLogoutModal =
    document.getElementById("appointmentLogoutModal");

const appointmentCancelLogout =
    document.getElementById("appointmentCancelLogout");

const appointmentConfirmLogout =
    document.getElementById("appointmentConfirmLogout");


let selectedAppointmentCard = null;


/* MOBILE SIDEBAR */

appointmentMenuToggle.addEventListener("click", function () {

    appointmentSidebar.classList.toggle("open");

});


/* FILTER APPOINTMENTS */

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        filterButtons.forEach(function (filterButton) {

            filterButton.classList.remove("active");

        });


        button.classList.add("active");


        const selectedFilter =
            button.dataset.filter;

        let visibleAppointments = 0;


        appointmentCards.forEach(function (card) {

            const appointmentStatus =
                card.dataset.status;


            if (
                selectedFilter === "all" ||
                appointmentStatus === selectedFilter
            ) {

                card.style.display = "grid";

                visibleAppointments++;

            }
            else {

                card.style.display = "none";

            }

        });


        if (visibleAppointments === 0) {

            appointmentNoResults.classList.add("show");

        }
        else {

            appointmentNoResults.classList.remove("show");

        }

    });

});


/* UPDATE SUMMARY */

function updateAppointmentSummary() {

    let upcoming = 0;
    let completed = 0;
    let cancelled = 0;


    appointmentCards.forEach(function (card) {

        if (card.dataset.status === "upcoming") {

            upcoming++;

        }
        else if (card.dataset.status === "completed") {

            completed++;

        }
        else if (card.dataset.status === "cancelled") {

            cancelled++;

        }

    });


    upcomingCount.textContent = upcoming;

    completedCount.textContent = completed;

    cancelledCount.textContent = cancelled;

    totalCount.textContent =
        appointmentCards.length;

}


/* OPEN CANCEL MODAL */

const cancelAppointmentButtons =
    document.querySelectorAll(
        ".appointment-cancel-action"
    );


cancelAppointmentButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        selectedAppointmentCard =
            button.closest(".appointment-item-card");


        cancelAppointmentId.textContent =
            selectedAppointmentCard.dataset.appointmentId;


        cancelDoctorName.textContent =
            selectedAppointmentCard.dataset.doctor;


        appointmentCancelModal.classList.add("show");

    });

});


/* KEEP APPOINTMENT */

keepAppointmentBtn.addEventListener("click", function () {

    appointmentCancelModal.classList.remove("show");

    selectedAppointmentCard = null;

});


/* CONFIRM CANCELLATION */

confirmCancelAppointmentBtn.addEventListener("click", function () {

    if (selectedAppointmentCard === null) {

        return;

    }


    selectedAppointmentCard.dataset.status =
        "cancelled";


    const statusBadge =
        selectedAppointmentCard.querySelector(
            ".appointment-status-badge"
        );


    statusBadge.textContent =
        "Cancelled";

    statusBadge.classList.remove("upcoming");

    statusBadge.classList.add("cancelled");


    const dateCard =
        selectedAppointmentCard.querySelector(
            ".appointment-date-card"
        );


    dateCard.classList.add("cancelled");


    const actionSection =
        selectedAppointmentCard.querySelector(
            ".appointment-card-actions"
        );


    if (actionSection) {

        actionSection.remove();

    }


    appointmentCancelModal.classList.remove("show");

    appointmentSuccessModal.classList.add("show");


    updateAppointmentSummary();

});


/* CLOSE SUCCESS MODAL */

appointmentSuccessBtn.addEventListener("click", function () {

    appointmentSuccessModal.classList.remove("show");

    selectedAppointmentCard = null;

});


/* CLICK OUTSIDE TO CLOSE CANCEL MODAL */

appointmentCancelModal.addEventListener("click", function (event) {

    if (event.target === appointmentCancelModal) {

        appointmentCancelModal.classList.remove("show");

        selectedAppointmentCard = null;

    }

});


/* CLICK OUTSIDE TO CLOSE SUCCESS MODAL */

appointmentSuccessModal.addEventListener("click", function (event) {

    if (event.target === appointmentSuccessModal) {

        appointmentSuccessModal.classList.remove("show");

        selectedAppointmentCard = null;

    }

});


/* OPEN LOGOUT MODAL */

appointmentLogoutBtn.addEventListener("click", function () {

    appointmentLogoutModal.classList.add("show");

});


/* CANCEL LOGOUT */

appointmentCancelLogout.addEventListener("click", function () {

    appointmentLogoutModal.classList.remove("show");

});


/* CONFIRM LOGOUT */

appointmentConfirmLogout.addEventListener("click", function () {

    window.location.href = "login.html";

});


/* CLICK OUTSIDE TO CLOSE */

appointmentLogoutModal.addEventListener("click", function (event) {

    if (event.target === appointmentLogoutModal) {

        appointmentLogoutModal.classList.remove("show");

    }

});


/* INITIAL SUMMARY */

updateAppointmentSummary();
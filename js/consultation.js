const consultationSidebar =
    document.getElementById("consultationSidebar");

const consultationMenuToggle =
    document.getElementById("consultationMenuToggle");

const consultationForm =
    document.getElementById("consultationForm");

const patientConcern =
    document.getElementById("patientConcern");

const doctorObservation =
    document.getElementById("doctorObservation");

const followUpRequired =
    document.getElementById("followUpRequired");

const followUpPeriod =
    document.getElementById("followUpPeriod");

const consultationRecommendation =
    document.getElementById("consultationRecommendation");

const consultationError =
    document.getElementById("consultationError");

const consultationSuccessModal =
    document.getElementById("consultationSuccessModal");

const consultationSuccessBtn =
    document.getElementById("consultationSuccessBtn");

const consultationLogoutBtn =
    document.getElementById("consultationLogoutBtn");

const consultationLogoutModal =
    document.getElementById("consultationLogoutModal");

const consultationCancelLogout =
    document.getElementById("consultationCancelLogout");

const consultationConfirmLogout =
    document.getElementById("consultationConfirmLogout");


/* MOBILE SIDEBAR */

consultationMenuToggle.addEventListener("click", function () {

    consultationSidebar.classList.toggle("open");

});


/* FOLLOW-UP OPTION */

followUpRequired.addEventListener("change", function () {

    if (followUpRequired.value === "yes") {

        followUpPeriod.disabled = false;

    }
    else {

        followUpPeriod.value = "";

        followUpPeriod.disabled = true;

    }

});


/* COMPLETE CONSULTATION */

consultationForm.addEventListener("submit", function (event) {

    event.preventDefault();

    consultationError.textContent = "";


    if (patientConcern.value.trim().length < 5) {

        consultationError.textContent =
            "Please enter the patient's reason for consultation.";

        return;

    }


    if (doctorObservation.value.trim().length < 5) {

        consultationError.textContent =
            "Please enter the doctor's consultation observation.";

        return;

    }


    if (followUpRequired.value === "") {

        consultationError.textContent =
            "Please select whether follow-up is required.";

        return;

    }


    if (
        followUpRequired.value === "yes" &&
        followUpPeriod.value === ""
    ) {

        consultationError.textContent =
            "Please select a follow-up period.";

        return;

    }


    if (
        consultationRecommendation.value.trim().length < 5
    ) {

        consultationError.textContent =
            "Please enter a professional recommendation.";

        return;

    }


    consultationSuccessModal.classList.add("show");

});


/* SUCCESS MODAL */

consultationSuccessBtn.addEventListener("click", function () {

    window.location.href =
        "doctor-dashboard.html";

});


consultationSuccessModal.addEventListener("click", function (event) {

    if (event.target === consultationSuccessModal) {

        consultationSuccessModal.classList.remove("show");

    }

});


/* OPEN LOGOUT MODAL */

consultationLogoutBtn.addEventListener("click", function () {

    consultationLogoutModal.classList.add("show");

});


/* CANCEL LOGOUT */

consultationCancelLogout.addEventListener("click", function () {

    consultationLogoutModal.classList.remove("show");

});


/* CONFIRM LOGOUT */

consultationConfirmLogout.addEventListener("click", function () {

    window.location.href = "login.html";

});


/* CLICK OUTSIDE TO CLOSE */

consultationLogoutModal.addEventListener("click", function (event) {

    if (event.target === consultationLogoutModal) {

        consultationLogoutModal.classList.remove("show");

    }

});
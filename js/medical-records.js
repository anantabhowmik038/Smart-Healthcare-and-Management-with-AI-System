const medicalSidebar =
    document.getElementById("medicalSidebar");

const medicalMenuToggle =
    document.getElementById("medicalMenuToggle");

const medicalSearch =
    document.getElementById("medicalSearch");

const medicalTypeFilter =
    document.getElementById("medicalTypeFilter");

const medicalRecordCards =
    document.querySelectorAll(".medical-record-card");

const medicalResultCount =
    document.getElementById("medicalResultCount");

const medicalNoResults =
    document.getElementById("medicalNoResults");

const medicalDetailsModal =
    document.getElementById("medicalDetailsModal");

const medicalViewButtons =
    document.querySelectorAll(".medical-view-btn");

const modalRecordTitle =
    document.getElementById("modalRecordTitle");

const modalRecordId =
    document.getElementById("modalRecordId");

const modalRecordDoctor =
    document.getElementById("modalRecordDoctor");

const modalRecordSpecialty =
    document.getElementById("modalRecordSpecialty");

const modalRecordDate =
    document.getElementById("modalRecordDate");

const modalAppointmentId =
    document.getElementById("modalAppointmentId");

const modalRecordNote =
    document.getElementById("modalRecordNote");

const medicalModalClose =
    document.getElementById("medicalModalClose");

const medicalModalDone =
    document.getElementById("medicalModalDone");

const medicalLogoutBtn =
    document.getElementById("medicalLogoutBtn");

const medicalLogoutModal =
    document.getElementById("medicalLogoutModal");

const medicalCancelLogout =
    document.getElementById("medicalCancelLogout");

const medicalConfirmLogout =
    document.getElementById("medicalConfirmLogout");


/* MOBILE SIDEBAR */

medicalMenuToggle.addEventListener("click", function () {

    medicalSidebar.classList.toggle("open");

});


/* FILTER RECORDS */

function filterMedicalRecords() {

    const searchValue =
        medicalSearch.value.toLowerCase().trim();

    const selectedType =
        medicalTypeFilter.value;

    let visibleRecords = 0;


    medicalRecordCards.forEach(function (card) {

        const recordSearch =
            card.dataset.search;

        const recordType =
            card.dataset.type;


        const matchesSearch =
            recordSearch.includes(searchValue);

        const matchesType =
            selectedType === "all" ||
            recordType === selectedType;


        if (matchesSearch && matchesType) {

            card.style.display = "grid";

            visibleRecords++;

        }
        else {

            card.style.display = "none";

        }

    });


    if (visibleRecords === 1) {

        medicalResultCount.textContent =
            "Showing 1 record";

    }
    else {

        medicalResultCount.textContent =
            "Showing " + visibleRecords + " records";

    }


    if (visibleRecords === 0) {

        medicalNoResults.classList.add("show");

    }
    else {

        medicalNoResults.classList.remove("show");

    }

}


medicalSearch.addEventListener(
    "input",
    filterMedicalRecords
);


medicalTypeFilter.addEventListener(
    "change",
    filterMedicalRecords
);


/* OPEN RECORD DETAILS */

medicalViewButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        modalRecordTitle.textContent =
            button.dataset.title;

        modalRecordId.textContent =
            button.dataset.id;

        modalRecordDoctor.textContent =
            button.dataset.doctor;

        modalRecordSpecialty.textContent =
            button.dataset.specialty;

        modalRecordDate.textContent =
            button.dataset.date;

        modalAppointmentId.textContent =
            button.dataset.appointment;

        modalRecordNote.textContent =
            button.dataset.note;


        medicalDetailsModal.classList.add("show");

    });

});


/* CLOSE RECORD DETAILS */

medicalModalClose.addEventListener("click", function () {

    medicalDetailsModal.classList.remove("show");

});


medicalModalDone.addEventListener("click", function () {

    medicalDetailsModal.classList.remove("show");

});


/* CLICK OUTSIDE TO CLOSE */

medicalDetailsModal.addEventListener("click", function (event) {

    if (event.target === medicalDetailsModal) {

        medicalDetailsModal.classList.remove("show");

    }

});


/* OPEN LOGOUT MODAL */

medicalLogoutBtn.addEventListener("click", function () {

    medicalLogoutModal.classList.add("show");

});


/* CANCEL LOGOUT */

medicalCancelLogout.addEventListener("click", function () {

    medicalLogoutModal.classList.remove("show");

});


/* CONFIRM LOGOUT */

medicalConfirmLogout.addEventListener("click", function () {

    window.location.href = "login.html";

});


/* CLICK OUTSIDE TO CLOSE */

medicalLogoutModal.addEventListener("click", function (event) {

    if (event.target === medicalLogoutModal) {

        medicalLogoutModal.classList.remove("show");

    }

});
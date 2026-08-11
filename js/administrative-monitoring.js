const monitoringSidebar =
    document.getElementById("monitoringSidebar");

const monitoringMenuToggle =
    document.getElementById("monitoringMenuToggle");

const complaintRows =
    document.querySelectorAll(".monitoring-complaint-row");

const complaintFilterButtons =
    document.querySelectorAll(".monitoring-filter-btn");

const monitoringNoComplaints =
    document.getElementById("monitoringNoComplaints");

const openComplaintCount =
    document.getElementById("openComplaintCount");

const resolvedComplaintCount =
    document.getElementById("resolvedComplaintCount");

const complaintManageModal =
    document.getElementById("complaintManageModal");

const complaintModalSubject =
    document.getElementById("complaintModalSubject");

const complaintModalId =
    document.getElementById("complaintModalId");

const complaintModalPatient =
    document.getElementById("complaintModalPatient");

const complaintModalCategory =
    document.getElementById("complaintModalCategory");

const complaintModalPriority =
    document.getElementById("complaintModalPriority");

const complaintModalCurrentStatus =
    document.getElementById("complaintModalCurrentStatus");

const complaintNewStatus =
    document.getElementById("complaintNewStatus");

const complaintResolutionNote =
    document.getElementById("complaintResolutionNote");

const complaintModalError =
    document.getElementById("complaintModalError");

const complaintModalClose =
    document.getElementById("complaintModalClose");

const complaintModalCancel =
    document.getElementById("complaintModalCancel");

const complaintModalSave =
    document.getElementById("complaintModalSave");

const monitoringSuccessModal =
    document.getElementById("monitoringSuccessModal");

const monitoringSuccessBtn =
    document.getElementById("monitoringSuccessBtn");

const auditSearch =
    document.getElementById("auditSearch");

const auditTypeFilter =
    document.getElementById("auditTypeFilter");

const auditRows =
    document.querySelectorAll(".monitoring-audit-row");

const auditNoResults =
    document.getElementById("auditNoResults");

const monitoringLogoutBtn =
    document.getElementById("monitoringLogoutBtn");

const monitoringLogoutModal =
    document.getElementById("monitoringLogoutModal");

const monitoringCancelLogout =
    document.getElementById("monitoringCancelLogout");

const monitoringConfirmLogout =
    document.getElementById("monitoringConfirmLogout");


let selectedComplaintRow = null;


/* MOBILE SIDEBAR */

monitoringMenuToggle.addEventListener("click", function () {

    monitoringSidebar.classList.toggle("open");

});


/* COMPLAINT FILTER */

complaintFilterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        complaintFilterButtons.forEach(function (filterButton) {

            filterButton.classList.remove("active");

        });


        button.classList.add("active");


        const selectedFilter =
            button.dataset.filter;

        let visibleComplaints = 0;


        complaintRows.forEach(function (row) {

            if (
                selectedFilter === "all" ||
                row.dataset.status === selectedFilter
            ) {

                row.style.display = "grid";

                visibleComplaints++;

            }
            else {

                row.style.display = "none";

            }

        });


        if (visibleComplaints === 0) {

            monitoringNoComplaints.classList.add("show");

        }
        else {

            monitoringNoComplaints.classList.remove("show");

        }

    });

});


/* UPDATE COMPLAINT SUMMARY */

function updateComplaintSummary() {

    let openCount = 0;
    let resolvedCount = 0;


    complaintRows.forEach(function (row) {

        if (row.dataset.status === "open") {

            openCount++;

        }
        else if (row.dataset.status === "resolved") {

            resolvedCount++;

        }

    });


    openComplaintCount.textContent =
        openCount;

    resolvedComplaintCount.textContent =
        resolvedCount;

}


/* OPEN COMPLAINT MODAL */

const complaintManageButtons =
    document.querySelectorAll(
        ".monitoring-manage-complaint-btn"
    );


complaintManageButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        selectedComplaintRow =
            button.closest(".monitoring-complaint-row");


        complaintModalSubject.textContent =
            selectedComplaintRow.dataset.subject;


        complaintModalId.textContent =
            selectedComplaintRow.dataset.id;


        complaintModalPatient.textContent =
            selectedComplaintRow.dataset.patient;


        complaintModalCategory.textContent =
            selectedComplaintRow.dataset.category;


        complaintModalPriority.textContent =
            selectedComplaintRow.dataset.priority;


        if (selectedComplaintRow.dataset.status === "resolved") {

            complaintModalCurrentStatus.textContent =
                "Resolved";

        }
        else {

            complaintModalCurrentStatus.textContent =
                "Under Review";

        }


        complaintNewStatus.value =
            selectedComplaintRow.dataset.status;


        complaintResolutionNote.value = "";

        complaintModalError.textContent = "";


        complaintManageModal.classList.add("show");

    });

});


/* CLOSE COMPLAINT MODAL */

function closeComplaintModal() {

    complaintManageModal.classList.remove("show");

    complaintResolutionNote.value = "";

    complaintModalError.textContent = "";

    selectedComplaintRow = null;

}


complaintModalClose.addEventListener(
    "click",
    closeComplaintModal
);


complaintModalCancel.addEventListener(
    "click",
    closeComplaintModal
);


complaintManageModal.addEventListener("click", function (event) {

    if (event.target === complaintManageModal) {

        closeComplaintModal();

    }

});


/* SAVE COMPLAINT UPDATE */

complaintModalSave.addEventListener("click", function () {

    if (selectedComplaintRow === null) {

        return;

    }


    if (complaintResolutionNote.value.trim().length < 5) {

        complaintModalError.textContent =
            "Please enter a short administrative review note.";

        return;

    }


    const newStatus =
        complaintNewStatus.value;


    selectedComplaintRow.dataset.status =
        newStatus;


    const statusBadge =
        selectedComplaintRow.querySelector(
            ".monitoring-complaint-status"
        );


    const complaintIcon =
        selectedComplaintRow.querySelector(
            ".monitoring-complaint-icon"
        );


    statusBadge.classList.remove(
        "open",
        "resolved"
    );


    complaintIcon.classList.remove(
        "resolved"
    );


    if (newStatus === "resolved") {

        statusBadge.textContent =
            "Resolved";

        statusBadge.classList.add(
            "resolved"
        );

        complaintIcon.classList.add(
            "resolved"
        );

    }
    else {

        statusBadge.textContent =
            "Under Review";

        statusBadge.classList.add(
            "open"
        );

    }


    complaintManageModal.classList.remove("show");

    monitoringSuccessModal.classList.add("show");


    selectedComplaintRow = null;


    updateComplaintSummary();

});


/* SUCCESS MODAL */

monitoringSuccessBtn.addEventListener("click", function () {

    monitoringSuccessModal.classList.remove("show");

});


monitoringSuccessModal.addEventListener("click", function (event) {

    if (event.target === monitoringSuccessModal) {

        monitoringSuccessModal.classList.remove("show");

    }

});


/* AUDIT FILTER */

function filterAuditLogs() {

    const searchValue =
        auditSearch.value.toLowerCase().trim();

    const selectedType =
        auditTypeFilter.value;

    let visibleLogs = 0;


    auditRows.forEach(function (row) {

        const searchData =
            row.dataset.search;

        const type =
            row.dataset.type;


        const matchesSearch =
            searchData.includes(searchValue);

        const matchesType =
            selectedType === "all" ||
            type === selectedType;


        if (
            matchesSearch &&
            matchesType
        ) {

            row.style.display = "table-row";

            visibleLogs++;

        }
        else {

            row.style.display = "none";

        }

    });


    if (visibleLogs === 0) {

        auditNoResults.classList.add("show");

    }
    else {

        auditNoResults.classList.remove("show");

    }

}


auditSearch.addEventListener(
    "input",
    filterAuditLogs
);


auditTypeFilter.addEventListener(
    "change",
    filterAuditLogs
);


/* OPEN LOGOUT MODAL */

monitoringLogoutBtn.addEventListener("click", function () {

    monitoringLogoutModal.classList.add("show");

});


/* CANCEL LOGOUT */

monitoringCancelLogout.addEventListener("click", function () {

    monitoringLogoutModal.classList.remove("show");

});


/* CONFIRM LOGOUT */

monitoringConfirmLogout.addEventListener("click", function () {

    window.location.href = "login.html";

});


/* CLICK OUTSIDE TO CLOSE */

monitoringLogoutModal.addEventListener("click", function (event) {

    if (event.target === monitoringLogoutModal) {

        monitoringLogoutModal.classList.remove("show");

    }

});


/* INITIAL SUMMARY */

updateComplaintSummary();
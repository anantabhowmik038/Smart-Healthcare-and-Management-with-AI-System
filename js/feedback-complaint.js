const feedbackSidebar =
    document.getElementById("feedbackSidebar");

const feedbackMenuToggle =
    document.getElementById("feedbackMenuToggle");

const feedbackForm =
    document.getElementById("feedbackForm");

const submissionType =
    document.getElementById("submissionType");

const submissionCategory =
    document.getElementById("submissionCategory");

const feedbackRatingGroup =
    document.getElementById("feedbackRatingGroup");

const feedbackRating =
    document.getElementById("feedbackRating");

const complaintPriorityGroup =
    document.getElementById("complaintPriorityGroup");

const complaintPriority =
    document.getElementById("complaintPriority");

const submissionSubject =
    document.getElementById("submissionSubject");

const submissionMessage =
    document.getElementById("submissionMessage");

const feedbackConfirmation =
    document.getElementById("feedbackConfirmation");

const feedbackError =
    document.getElementById("feedbackError");

const feedbackResetBtn =
    document.getElementById("feedbackResetBtn");

const historyFilters =
    document.querySelectorAll(".feedback-history-filter");

const historyRows =
    document.querySelectorAll(".feedback-history-row");

const feedbackNoHistory =
    document.getElementById("feedbackNoHistory");

const feedbackSuccessModal =
    document.getElementById("feedbackSuccessModal");

const feedbackSuccessMessage =
    document.getElementById("feedbackSuccessMessage");

const feedbackReferenceId =
    document.getElementById("feedbackReferenceId");

const feedbackSuccessBtn =
    document.getElementById("feedbackSuccessBtn");

const feedbackLogoutBtn =
    document.getElementById("feedbackLogoutBtn");

const feedbackLogoutModal =
    document.getElementById("feedbackLogoutModal");

const feedbackCancelLogout =
    document.getElementById("feedbackCancelLogout");

const feedbackConfirmLogout =
    document.getElementById("feedbackConfirmLogout");


/* MOBILE SIDEBAR */

feedbackMenuToggle.addEventListener("click", function () {

    feedbackSidebar.classList.toggle("open");

});


/* SUBMISSION TYPE */

submissionType.addEventListener("change", function () {

    feedbackError.textContent = "";


    if (submissionType.value === "feedback") {

        feedbackRatingGroup.classList.add("show");

        complaintPriorityGroup.classList.remove("show");

        complaintPriority.value = "";

    }
    else if (submissionType.value === "complaint") {

        complaintPriorityGroup.classList.add("show");

        feedbackRatingGroup.classList.remove("show");

        feedbackRating.value = "";

    }
    else {

        feedbackRatingGroup.classList.remove("show");

        complaintPriorityGroup.classList.remove("show");

        feedbackRating.value = "";

        complaintPriority.value = "";

    }

});


/* FILTER HISTORY */

historyFilters.forEach(function (button) {

    button.addEventListener("click", function () {

        historyFilters.forEach(function (filterButton) {

            filterButton.classList.remove("active");

        });


        button.classList.add("active");


        const selectedFilter =
            button.dataset.filter;

        let visibleRows = 0;


        historyRows.forEach(function (row) {

            if (
                selectedFilter === "all" ||
                row.dataset.type === selectedFilter
            ) {

                row.style.display = "grid";

                visibleRows++;

            }
            else {

                row.style.display = "none";

            }

        });


        if (visibleRows === 0) {

            feedbackNoHistory.classList.add("show");

        }
        else {

            feedbackNoHistory.classList.remove("show");

        }

    });

});


/* SUBMIT */

feedbackForm.addEventListener("submit", function (event) {

    event.preventDefault();

    feedbackError.textContent = "";


    if (submissionType.value === "") {

        feedbackError.textContent =
            "Please select a submission type.";

        return;

    }


    if (submissionCategory.value === "") {

        feedbackError.textContent =
            "Please select a service category.";

        return;

    }


    if (
        submissionType.value === "feedback" &&
        feedbackRating.value === ""
    ) {

        feedbackError.textContent =
            "Please select a service rating.";

        return;

    }


    if (
        submissionType.value === "complaint" &&
        complaintPriority.value === ""
    ) {

        feedbackError.textContent =
            "Please select the complaint priority.";

        return;

    }


    if (submissionSubject.value.trim().length < 4) {

        feedbackError.textContent =
            "Please enter a clear subject.";

        return;

    }


    if (submissionMessage.value.trim().length < 10) {

        feedbackError.textContent =
            "Please provide a more detailed description.";

        return;

    }


    if (!feedbackConfirmation.checked) {

        feedbackError.textContent =
            "Please confirm that the submitted information is accurate.";

        return;

    }


    generateSubmissionReference();

});


/* GENERATE REFERENCE */

function generateSubmissionReference() {

    const randomNumber =
        Math.floor(
            1000 + Math.random() * 9000
        );


    if (submissionType.value === "complaint") {

        feedbackReferenceId.textContent =
            "#CMP" + randomNumber;

        feedbackSuccessMessage.textContent =
            "Your complaint has been submitted for administrative review in this prototype session.";

    }
    else {

        feedbackReferenceId.textContent =
            "#FDB" + randomNumber;

        feedbackSuccessMessage.textContent =
            "Your feedback has been recorded successfully in this prototype session.";

    }


    feedbackSuccessModal.classList.add("show");

}


/* SUCCESS MODAL */

feedbackSuccessBtn.addEventListener("click", function () {

    feedbackSuccessModal.classList.remove("show");

    feedbackForm.reset();

    feedbackRatingGroup.classList.remove("show");

    complaintPriorityGroup.classList.remove("show");

    feedbackError.textContent = "";

});


feedbackSuccessModal.addEventListener("click", function (event) {

    if (event.target === feedbackSuccessModal) {

        feedbackSuccessModal.classList.remove("show");

    }

});


/* RESET FORM */

feedbackResetBtn.addEventListener("click", function () {

    feedbackRatingGroup.classList.remove("show");

    complaintPriorityGroup.classList.remove("show");

    feedbackError.textContent = "";

});


/* OPEN LOGOUT MODAL */

feedbackLogoutBtn.addEventListener("click", function () {

    feedbackLogoutModal.classList.add("show");

});


/* CANCEL LOGOUT */

feedbackCancelLogout.addEventListener("click", function () {

    feedbackLogoutModal.classList.remove("show");

});


/* CONFIRM LOGOUT */

feedbackConfirmLogout.addEventListener("click", function () {

    window.location.href = "login.html";

});


/* CLICK OUTSIDE TO CLOSE */

feedbackLogoutModal.addEventListener("click", function (event) {

    if (event.target === feedbackLogoutModal) {

        feedbackLogoutModal.classList.remove("show");

    }

});
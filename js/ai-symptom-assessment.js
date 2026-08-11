const aiSidebar =
    document.getElementById("aiSidebar");

const aiMenuToggle =
    document.getElementById("aiMenuToggle");

const aiAssessmentForm =
    document.getElementById("aiAssessmentForm");

const symptomDescription =
    document.getElementById("symptomDescription");

const symptomDuration =
    document.getElementById("symptomDuration");

const symptomSeverity =
    document.getElementById("symptomSeverity");

const patientAgeGroup =
    document.getElementById("patientAgeGroup");

const existingCondition =
    document.getElementById("existingCondition");

const additionalSymptoms =
    document.getElementById("additionalSymptoms");

const aiAgreement =
    document.getElementById("aiAgreement");

const aiAssessmentError =
    document.getElementById("aiAssessmentError");

const aiResultCard =
    document.getElementById("aiResultCard");

const aiResultTitle =
    document.getElementById("aiResultTitle");

const aiResultStatus =
    document.getElementById("aiResultStatus");

const aiAssessmentLevel =
    document.getElementById("aiAssessmentLevel");

const aiRecommendedAction =
    document.getElementById("aiRecommendedAction");

const aiDoctorReview =
    document.getElementById("aiDoctorReview");

const aiResultMessage =
    document.getElementById("aiResultMessage");

const newAssessmentBtn =
    document.getElementById("newAssessmentBtn");

const aiLogoutBtn =
    document.getElementById("aiLogoutBtn");

const aiLogoutModal =
    document.getElementById("aiLogoutModal");

const aiCancelLogout =
    document.getElementById("aiCancelLogout");

const aiConfirmLogout =
    document.getElementById("aiConfirmLogout");


/* MOBILE SIDEBAR */

aiMenuToggle.addEventListener("click", function () {

    aiSidebar.classList.toggle("open");

});


/* SUBMIT ASSESSMENT */

aiAssessmentForm.addEventListener("submit", function (event) {

    event.preventDefault();

    aiAssessmentError.textContent = "";


    const symptoms =
        symptomDescription.value.trim();


    if (symptoms.length < 10) {

        aiAssessmentError.textContent =
            "Please provide a clearer description of your symptoms.";

        return;

    }


    if (symptomDuration.value === "") {

        aiAssessmentError.textContent =
            "Please select how long you have experienced the symptoms.";

        return;

    }


    if (symptomSeverity.value === "") {

        aiAssessmentError.textContent =
            "Please select the current symptom severity.";

        return;

    }


    if (patientAgeGroup.value === "") {

        aiAssessmentError.textContent =
            "Please select an age group.";

        return;

    }


    if (existingCondition.value === "") {

        aiAssessmentError.textContent =
            "Please select an option for existing medical conditions.";

        return;

    }


    if (!aiAgreement.checked) {

        aiAssessmentError.textContent =
            "Please confirm that you understand the AI assessment limitation.";

        return;

    }


    generateAssessment();

});


/* GENERATE PROTOTYPE ASSESSMENT */

function generateAssessment() {

    const severity =
        symptomSeverity.value;

    const duration =
        symptomDuration.value;

    const condition =
        existingCondition.value;


    if (
        severity === "severe" ||
        condition === "yes"
    ) {

        aiResultTitle.textContent =
            "Professional Review Recommended";

        aiAssessmentLevel.textContent =
            "Higher Review Priority";

        aiRecommendedAction.textContent =
            "Doctor Consultation";

        aiDoctorReview.textContent =
            "Recommended";

        aiResultMessage.textContent =
            "Based on the information provided, this case should receive professional medical review. The AI module is not making a diagnosis and recommends continuing the assessment with a qualified healthcare professional.";

        aiResultStatus.textContent =
            "Doctor Review";

    }
    else if (
        severity === "moderate" ||
        duration === "longer"
    ) {

        aiResultTitle.textContent =
            "Additional Review Suggested";

        aiAssessmentLevel.textContent =
            "Moderate Review Priority";

        aiRecommendedAction.textContent =
            "Consider Consultation";

        aiDoctorReview.textContent =
            "Suggested";

        aiResultMessage.textContent =
            "The information provided suggests that additional professional review may be useful. This preliminary AI result should not be treated as a diagnosis.";

        aiResultStatus.textContent =
            "Review Suggested";

    }
    else {

        aiResultTitle.textContent =
            "Preliminary Guidance";

        aiAssessmentLevel.textContent =
            "Standard Review";

        aiRecommendedAction.textContent =
            "Monitor and Review";

        aiDoctorReview.textContent =
            "Available if Needed";

        aiResultMessage.textContent =
            "The submitted information has been reviewed by the prototype assessment workflow. No medical diagnosis has been generated. You may continue to monitor your condition or request professional medical consultation if needed.";

        aiResultStatus.textContent =
            "Assessment Complete";

    }


    aiResultCard.classList.add("show");


    aiResultCard.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* NEW ASSESSMENT */

newAssessmentBtn.addEventListener("click", function () {

    aiAssessmentForm.reset();

    aiAssessmentError.textContent = "";

    aiResultCard.classList.remove("show");


    symptomDescription.focus();

});


/* OPEN LOGOUT MODAL */

aiLogoutBtn.addEventListener("click", function () {

    aiLogoutModal.classList.add("show");

});


/* CANCEL LOGOUT */

aiCancelLogout.addEventListener("click", function () {

    aiLogoutModal.classList.remove("show");

});


/* CONFIRM LOGOUT */

aiConfirmLogout.addEventListener("click", function () {

    window.location.href = "login.html";

});


/* CLICK OUTSIDE TO CLOSE */

aiLogoutModal.addEventListener("click", function (event) {

    if (event.target === aiLogoutModal) {

        aiLogoutModal.classList.remove("show");

    }

});
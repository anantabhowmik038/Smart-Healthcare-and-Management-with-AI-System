const profileSidebar =
    document.getElementById("profileSidebar");

const profileMenuToggle =
    document.getElementById("profileMenuToggle");

const editProfileBtn =
    document.getElementById("editProfileBtn");

const profileForm =
    document.getElementById("profileForm");

const profileFormActions =
    document.getElementById("profileFormActions");

const cancelProfileBtn =
    document.getElementById("cancelProfileBtn");

const profileDisplayName =
    document.getElementById("profileDisplayName");

const profileSuccessModal =
    document.getElementById("profileSuccessModal");

const profileSuccessBtn =
    document.getElementById("profileSuccessBtn");

const profileLogoutBtn =
    document.getElementById("profileLogoutBtn");

const profileLogoutModal =
    document.getElementById("profileLogoutModal");

const profileCancelLogout =
    document.getElementById("profileCancelLogout");

const profileConfirmLogout =
    document.getElementById("profileConfirmLogout");


const editableFields = [
    "profileFullName",
    "profileDob",
    "profileGender",
    "profileEmail",
    "profilePhone",
    "profileAddress",
    "bloodGroup",
    "allergies",
    "medicalConditions",
    "emergencyName",
    "emergencyRelation",
    "emergencyPhone"
];


let originalValues = {};


/* MOBILE SIDEBAR */

profileMenuToggle.addEventListener("click", function () {

    profileSidebar.classList.toggle("open");

});


/* EDIT PROFILE */

editProfileBtn.addEventListener("click", function () {

    originalValues = {};


    editableFields.forEach(function (fieldId) {

        const field = document.getElementById(fieldId);

        originalValues[fieldId] = field.value;

        field.disabled = false;

    });


    profileFormActions.classList.add("show");

    editProfileBtn.style.display = "none";

});


/* CANCEL EDIT */

cancelProfileBtn.addEventListener("click", function () {

    editableFields.forEach(function (fieldId) {

        const field = document.getElementById(fieldId);

        field.value = originalValues[fieldId];

        field.disabled = true;

    });


    profileFormActions.classList.remove("show");

    editProfileBtn.style.display = "block";

});


/* SAVE PROFILE */

profileForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const fullName =
        document.getElementById("profileFullName").value.trim();


    if (fullName.length < 3) {

        return;
    }


    profileDisplayName.textContent = fullName;


    editableFields.forEach(function (fieldId) {

        document.getElementById(fieldId).disabled = true;

    });


    profileFormActions.classList.remove("show");

    editProfileBtn.style.display = "block";

    profileSuccessModal.classList.add("show");

});


/* CLOSE SUCCESS MODAL */

profileSuccessBtn.addEventListener("click", function () {

    profileSuccessModal.classList.remove("show");

});


/* OPEN LOGOUT MODAL */

profileLogoutBtn.addEventListener("click", function () {

    profileLogoutModal.classList.add("show");

});


/* CANCEL LOGOUT */

profileCancelLogout.addEventListener("click", function () {

    profileLogoutModal.classList.remove("show");

});


/* CONFIRM LOGOUT */

profileConfirmLogout.addEventListener("click", function () {

    window.location.href = "login.html";

});


/* CLICK OUTSIDE TO CLOSE */

profileLogoutModal.addEventListener("click", function (event) {

    if (event.target === profileLogoutModal) {

        profileLogoutModal.classList.remove("show");

    }

});


profileSuccessModal.addEventListener("click", function (event) {

    if (event.target === profileSuccessModal) {

        profileSuccessModal.classList.remove("show");

    }

});
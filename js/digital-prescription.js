const prescriptionSidebar =
    document.getElementById("prescriptionSidebar");

const prescriptionMenuToggle =
    document.getElementById("prescriptionMenuToggle");

const prescriptionForm =
    document.getElementById("prescriptionForm");

const medicineList =
    document.getElementById("medicineList");

const addMedicineBtn =
    document.getElementById("addMedicineBtn");

const medicineCount =
    document.getElementById("medicineCount");

const prescriptionAdvice =
    document.getElementById("prescriptionAdvice");

const prescriptionFollowUp =
    document.getElementById("prescriptionFollowUp");

const prescriptionValidity =
    document.getElementById("prescriptionValidity");

const prescriptionError =
    document.getElementById("prescriptionError");

const prescriptionDateDisplay =
    document.getElementById("prescriptionDateDisplay");

const prescriptionSuccessModal =
    document.getElementById("prescriptionSuccessModal");

const prescriptionSuccessBtn =
    document.getElementById("prescriptionSuccessBtn");

const successMedicineCount =
    document.getElementById("successMedicineCount");

const prescriptionLogoutBtn =
    document.getElementById("prescriptionLogoutBtn");

const prescriptionLogoutModal =
    document.getElementById("prescriptionLogoutModal");

const prescriptionCancelLogout =
    document.getElementById("prescriptionCancelLogout");

const prescriptionConfirmLogout =
    document.getElementById("prescriptionConfirmLogout");


/* MOBILE SIDEBAR */

prescriptionMenuToggle.addEventListener("click", function () {

    prescriptionSidebar.classList.toggle("open");

});


/* CURRENT DATE */

const currentDate =
    new Date();

prescriptionDateDisplay.textContent =
    currentDate.toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );


/* UPDATE MEDICINE NUMBERS */

function updateMedicineNumbers() {

    const medicineItems =
        document.querySelectorAll(
            ".prescription-medicine-item"
        );


    medicineItems.forEach(function (item, index) {

        const number =
            item.querySelector(
                ".prescription-medicine-number"
            );

        const removeButton =
            item.querySelector(
                ".prescription-remove-btn"
            );


        number.textContent =
            index + 1;


        removeButton.disabled =
            medicineItems.length === 1;

    });


    medicineCount.textContent =
        medicineItems.length;

}


/* ADD MEDICINE */

addMedicineBtn.addEventListener("click", function () {

    const medicineItem =
        document.createElement("div");


    medicineItem.className =
        "prescription-medicine-item";


    medicineItem.innerHTML = `
        <div class="prescription-medicine-number">
            1
        </div>

        <div class="prescription-medicine-fields">

            <div class="prescription-form-grid">

                <div class="prescription-form-group">

                    <label>
                        Medicine Name
                    </label>

                    <input
                        type="text"
                        class="medicine-name"
                        placeholder="Enter medicine name"
                    >

                </div>


                <div class="prescription-form-group">

                    <label>
                        Dosage
                    </label>

                    <input
                        type="text"
                        class="medicine-dosage"
                        placeholder="Enter prescribed dosage"
                    >

                </div>


                <div class="prescription-form-group">

                    <label>
                        Frequency
                    </label>

                    <select class="medicine-frequency">

                        <option value="">
                            Select Frequency
                        </option>

                        <option value="once">
                            Once Daily
                        </option>

                        <option value="twice">
                            Twice Daily
                        </option>

                        <option value="three">
                            Three Times Daily
                        </option>

                        <option value="other">
                            Other
                        </option>

                    </select>

                </div>


                <div class="prescription-form-group">

                    <label>
                        Duration
                    </label>

                    <input
                        type="text"
                        class="medicine-duration"
                        placeholder="Enter duration"
                    >

                </div>

            </div>


            <div class="prescription-form-group">

                <label>
                    Medicine Instructions
                </label>

                <input
                    type="text"
                    class="medicine-instruction"
                    placeholder="Enter doctor-provided instructions"
                >

            </div>

        </div>


        <button
            type="button"
            class="prescription-remove-btn"
        >
            ×
        </button>
    `;


    medicineList.appendChild(medicineItem);

    updateMedicineNumbers();

});


/* REMOVE MEDICINE */

medicineList.addEventListener("click", function (event) {

    if (
        event.target.classList.contains(
            "prescription-remove-btn"
        )
    ) {

        const medicineItem =
            event.target.closest(
                ".prescription-medicine-item"
            );


        medicineItem.remove();

        updateMedicineNumbers();

    }

});


/* VALIDATE MEDICINES */

function validateMedicines() {

    const medicineItems =
        document.querySelectorAll(
            ".prescription-medicine-item"
        );


    for (let i = 0; i < medicineItems.length; i++) {

        const item =
            medicineItems[i];

        const name =
            item.querySelector(
                ".medicine-name"
            ).value.trim();

        const dosage =
            item.querySelector(
                ".medicine-dosage"
            ).value.trim();

        const frequency =
            item.querySelector(
                ".medicine-frequency"
            ).value;

        const duration =
            item.querySelector(
                ".medicine-duration"
            ).value.trim();


        if (
            name === "" ||
            dosage === "" ||
            frequency === "" ||
            duration === ""
        ) {

            return false;

        }

    }


    return true;

}


/* CREATE PRESCRIPTION */

prescriptionForm.addEventListener("submit", function (event) {

    event.preventDefault();

    prescriptionError.textContent = "";


    if (!validateMedicines()) {

        prescriptionError.textContent =
            "Please complete all required medicine information.";

        return;

    }


    if (prescriptionAdvice.value.trim().length < 5) {

        prescriptionError.textContent =
            "Please enter general prescription instructions.";

        return;

    }


    if (prescriptionFollowUp.value === "") {

        prescriptionError.textContent =
            "Please select a follow-up option.";

        return;

    }


    if (prescriptionValidity.value === "") {

        prescriptionError.textContent =
            "Please select prescription validity.";

        return;

    }


    const totalMedicines =
        document.querySelectorAll(
            ".prescription-medicine-item"
        ).length;


    successMedicineCount.textContent =
        totalMedicines;


    prescriptionSuccessModal.classList.add("show");

});


/* SUCCESS MODAL */

prescriptionSuccessBtn.addEventListener("click", function () {

    window.location.href =
        "doctor-dashboard.html";

});


prescriptionSuccessModal.addEventListener("click", function (event) {

    if (event.target === prescriptionSuccessModal) {

        prescriptionSuccessModal.classList.remove("show");

    }

});


/* OPEN LOGOUT MODAL */

prescriptionLogoutBtn.addEventListener("click", function () {

    prescriptionLogoutModal.classList.add("show");

});


/* CANCEL LOGOUT */

prescriptionCancelLogout.addEventListener("click", function () {

    prescriptionLogoutModal.classList.remove("show");

});


/* CONFIRM LOGOUT */

prescriptionConfirmLogout.addEventListener("click", function () {

    window.location.href = "login.html";

});


/* CLICK OUTSIDE TO CLOSE */

prescriptionLogoutModal.addEventListener("click", function (event) {

    if (event.target === prescriptionLogoutModal) {

        prescriptionLogoutModal.classList.remove("show");

    }

});


/* INITIAL MEDICINE COUNT */

updateMedicineNumbers();
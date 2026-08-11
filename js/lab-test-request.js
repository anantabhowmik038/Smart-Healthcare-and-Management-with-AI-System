const labRequestSidebar =
    document.getElementById("labRequestSidebar");

const labRequestMenuToggle =
    document.getElementById("labRequestMenuToggle");

const labRequestForm =
    document.getElementById("labRequestForm");

const labTestList =
    document.getElementById("labTestList");

const addLabTestBtn =
    document.getElementById("addLabTestBtn");

const labTestCount =
    document.getElementById("labTestCount");

const labClinicalReason =
    document.getElementById("labClinicalReason");

const labRequestError =
    document.getElementById("labRequestError");

const labRequestDate =
    document.getElementById("labRequestDate");

const labRequestSuccessModal =
    document.getElementById("labRequestSuccessModal");

const successLabTestCount =
    document.getElementById("successLabTestCount");

const labRequestSuccessBtn =
    document.getElementById("labRequestSuccessBtn");

const labRequestLogoutBtn =
    document.getElementById("labRequestLogoutBtn");

const labRequestLogoutModal =
    document.getElementById("labRequestLogoutModal");

const labRequestCancelLogout =
    document.getElementById("labRequestCancelLogout");

const labRequestConfirmLogout =
    document.getElementById("labRequestConfirmLogout");


/* MOBILE SIDEBAR */

labRequestMenuToggle.addEventListener("click", function () {

    labRequestSidebar.classList.toggle("open");

});


/* CURRENT DATE */

const currentDate =
    new Date();

labRequestDate.textContent =
    currentDate.toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );


/* UPDATE TEST NUMBERS */

function updateLabTestNumbers() {

    const testItems =
        document.querySelectorAll(
            ".lab-request-test-item"
        );


    testItems.forEach(function (item, index) {

        const number =
            item.querySelector(
                ".lab-request-test-number"
            );

        const removeButton =
            item.querySelector(
                ".lab-request-remove-btn"
            );


        number.textContent =
            index + 1;


        removeButton.disabled =
            testItems.length === 1;

    });


    labTestCount.textContent =
        testItems.length;

}


/* ADD TEST */

addLabTestBtn.addEventListener("click", function () {

    const testItem =
        document.createElement("div");


    testItem.className =
        "lab-request-test-item";


    testItem.innerHTML = `
        <div class="lab-request-test-number">
            1
        </div>

        <div class="lab-request-test-fields">

            <div class="lab-request-form-grid">

                <div class="lab-request-form-group">

                    <label>
                        Test Name
                    </label>

                    <select class="lab-test-name">

                        <option value="">
                            Select Test
                        </option>

                        <option value="cbc">
                            Complete Blood Count
                        </option>

                        <option value="glucose">
                            Blood Glucose Test
                        </option>

                        <option value="lipid">
                            Lipid Profile
                        </option>

                        <option value="urine">
                            Urine Analysis
                        </option>

                        <option value="liver">
                            Liver Function Test
                        </option>

                        <option value="kidney">
                            Kidney Function Test
                        </option>

                        <option value="other">
                            Other Laboratory Test
                        </option>

                    </select>

                </div>


                <div class="lab-request-form-group">

                    <label>
                        Priority
                    </label>

                    <select class="lab-test-priority">

                        <option value="">
                            Select Priority
                        </option>

                        <option value="routine">
                            Routine
                        </option>

                        <option value="priority">
                            Priority
                        </option>

                    </select>

                </div>

            </div>


            <div class="lab-request-form-group">

                <label>
                    Test Instruction
                </label>

                <input
                    type="text"
                    class="lab-test-instruction"
                    placeholder="Optional professional instruction for the laboratory"
                >

            </div>

        </div>


        <button
            type="button"
            class="lab-request-remove-btn"
        >
            ×
        </button>
    `;


    labTestList.appendChild(testItem);

    updateLabTestNumbers();

});


/* REMOVE TEST */

labTestList.addEventListener("click", function (event) {

    if (
        event.target.classList.contains(
            "lab-request-remove-btn"
        )
    ) {

        const testItem =
            event.target.closest(
                ".lab-request-test-item"
            );


        testItem.remove();

        updateLabTestNumbers();

    }

});


/* VALIDATE TESTS */

function validateLabTests() {

    const testItems =
        document.querySelectorAll(
            ".lab-request-test-item"
        );


    for (let i = 0; i < testItems.length; i++) {

        const testName =
            testItems[i].querySelector(
                ".lab-test-name"
            ).value;

        const priority =
            testItems[i].querySelector(
                ".lab-test-priority"
            ).value;


        if (
            testName === "" ||
            priority === ""
        ) {

            return false;

        }

    }


    return true;

}


/* SUBMIT REQUEST */

labRequestForm.addEventListener("submit", function (event) {

    event.preventDefault();

    labRequestError.textContent = "";


    if (!validateLabTests()) {

        labRequestError.textContent =
            "Please complete all required laboratory test information.";

        return;

    }


    if (labClinicalReason.value.trim().length < 5) {

        labRequestError.textContent =
            "Please enter the clinical reason for the laboratory request.";

        return;

    }


    const totalTests =
        document.querySelectorAll(
            ".lab-request-test-item"
        ).length;


    successLabTestCount.textContent =
        totalTests;


    labRequestSuccessModal.classList.add("show");

});


/* SUCCESS MODAL */

labRequestSuccessBtn.addEventListener("click", function () {

    window.location.href =
        "doctor-dashboard.html";

});


labRequestSuccessModal.addEventListener("click", function (event) {

    if (event.target === labRequestSuccessModal) {

        labRequestSuccessModal.classList.remove("show");

    }

});


/* OPEN LOGOUT MODAL */

labRequestLogoutBtn.addEventListener("click", function () {

    labRequestLogoutModal.classList.add("show");

});


/* CANCEL LOGOUT */

labRequestCancelLogout.addEventListener("click", function () {

    labRequestLogoutModal.classList.remove("show");

});


/* CONFIRM LOGOUT */

labRequestConfirmLogout.addEventListener("click", function () {

    window.location.href = "login.html";

});


/* CLICK OUTSIDE TO CLOSE */

labRequestLogoutModal.addEventListener("click", function (event) {

    if (event.target === labRequestLogoutModal) {

        labRequestLogoutModal.classList.remove("show");

    }

});


/* INITIAL TEST COUNT */

updateLabTestNumbers();
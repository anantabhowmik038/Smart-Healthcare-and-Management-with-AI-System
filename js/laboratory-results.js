const labResultSidebar =
    document.getElementById("labResultSidebar");

const labResultMenuToggle =
    document.getElementById("labResultMenuToggle");

const labResultForm =
    document.getElementById("labResultForm");

const collectionDate =
    document.getElementById("collectionDate");

const sampleType =
    document.getElementById("sampleType");

const resultDate =
    document.getElementById("resultDate");

const resultValueList =
    document.getElementById("resultValueList");

const addResultBtn =
    document.getElementById("addResultBtn");

const resultParameterCount =
    document.getElementById("resultParameterCount");

const reportStatus =
    document.getElementById("reportStatus");

const labResultSummaryStatus =
    document.getElementById("labResultSummaryStatus");

const labResultError =
    document.getElementById("labResultError");

const labResultSuccessModal =
    document.getElementById("labResultSuccessModal");

const successResultCount =
    document.getElementById("successResultCount");

const labResultSuccessBtn =
    document.getElementById("labResultSuccessBtn");

const labResultLogoutBtn =
    document.getElementById("labResultLogoutBtn");

const labResultLogoutModal =
    document.getElementById("labResultLogoutModal");

const labResultCancelLogout =
    document.getElementById("labResultCancelLogout");

const labResultConfirmLogout =
    document.getElementById("labResultConfirmLogout");


/* MOBILE SIDEBAR */

labResultMenuToggle.addEventListener("click", function () {

    labResultSidebar.classList.toggle("open");

});


/* SET DEFAULT RESULT DATE */

const today =
    new Date();

const year =
    today.getFullYear();

const month =
    String(today.getMonth() + 1).padStart(2, "0");

const day =
    String(today.getDate()).padStart(2, "0");

const formattedToday =
    year + "-" + month + "-" + day;


collectionDate.max =
    formattedToday;

resultDate.max =
    formattedToday;

resultDate.value =
    formattedToday;


/* UPDATE RESULT NUMBERS */

function updateResultNumbers() {

    const resultItems =
        document.querySelectorAll(
            ".lab-result-value-item"
        );


    resultItems.forEach(function (item, index) {

        const number =
            item.querySelector(
                ".lab-result-value-number"
            );

        const removeButton =
            item.querySelector(
                ".lab-result-remove-btn"
            );


        number.textContent =
            index + 1;


        removeButton.disabled =
            resultItems.length === 1;

    });


    resultParameterCount.textContent =
        resultItems.length;

}


/* ADD RESULT */

addResultBtn.addEventListener("click", function () {

    const resultItem =
        document.createElement("div");


    resultItem.className =
        "lab-result-value-item";


    resultItem.innerHTML = `
        <div class="lab-result-value-number">
            1
        </div>

        <div class="lab-result-value-fields">

            <div class="lab-result-value-grid">

                <div class="lab-result-form-group">

                    <label>
                        Parameter
                    </label>

                    <input
                        type="text"
                        class="result-parameter"
                        placeholder="Enter test parameter"
                    >

                </div>


                <div class="lab-result-form-group">

                    <label>
                        Result Value
                    </label>

                    <input
                        type="text"
                        class="result-value"
                        placeholder="Enter measured value"
                    >

                </div>


                <div class="lab-result-form-group">

                    <label>
                        Unit
                    </label>

                    <input
                        type="text"
                        class="result-unit"
                        placeholder="Enter unit"
                    >

                </div>


                <div class="lab-result-form-group">

                    <label>
                        Reference Information
                    </label>

                    <input
                        type="text"
                        class="result-reference"
                        placeholder="Enter laboratory reference information"
                    >

                </div>

            </div>

        </div>


        <button
            type="button"
            class="lab-result-remove-btn"
        >
            ×
        </button>
    `;


    resultValueList.appendChild(resultItem);

    updateResultNumbers();

});


/* REMOVE RESULT */

resultValueList.addEventListener("click", function (event) {

    if (
        event.target.classList.contains(
            "lab-result-remove-btn"
        )
    ) {

        const resultItem =
            event.target.closest(
                ".lab-result-value-item"
            );


        resultItem.remove();

        updateResultNumbers();

    }

});


/* UPDATE STATUS SUMMARY */

reportStatus.addEventListener("change", function () {

    if (reportStatus.value === "completed") {

        labResultSummaryStatus.textContent =
            "Completed";

    }
    else if (reportStatus.value === "review") {

        labResultSummaryStatus.textContent =
            "Ready for Doctor Review";

    }
    else {

        labResultSummaryStatus.textContent =
            "In Progress";

    }

});


/* VALIDATE RESULTS */

function validateResultValues() {

    const resultItems =
        document.querySelectorAll(
            ".lab-result-value-item"
        );


    for (let i = 0; i < resultItems.length; i++) {

        const parameter =
            resultItems[i].querySelector(
                ".result-parameter"
            ).value.trim();

        const value =
            resultItems[i].querySelector(
                ".result-value"
            ).value.trim();

        const unit =
            resultItems[i].querySelector(
                ".result-unit"
            ).value.trim();

        const reference =
            resultItems[i].querySelector(
                ".result-reference"
            ).value.trim();


        if (
            parameter === "" ||
            value === "" ||
            unit === "" ||
            reference === ""
        ) {

            return false;

        }

    }


    return true;

}


/* SAVE REPORT */

labResultForm.addEventListener("submit", function (event) {

    event.preventDefault();

    labResultError.textContent = "";


    if (collectionDate.value === "") {

        labResultError.textContent =
            "Please select the sample collection date.";

        return;

    }


    if (sampleType.value === "") {

        labResultError.textContent =
            "Please select the sample type.";

        return;

    }


    if (resultDate.value === "") {

        labResultError.textContent =
            "Please select the result date.";

        return;

    }


    if (!validateResultValues()) {

        labResultError.textContent =
            "Please complete all laboratory result fields.";

        return;

    }


    if (reportStatus.value === "") {

        labResultError.textContent =
            "Please select the laboratory report status.";

        return;

    }


    const totalResults =
        document.querySelectorAll(
            ".lab-result-value-item"
        ).length;


    successResultCount.textContent =
        totalResults;


    labResultSuccessModal.classList.add("show");

});


/* SUCCESS MODAL */

labResultSuccessBtn.addEventListener("click", function () {

    window.location.href =
        "lab-dashboard.html";

});


labResultSuccessModal.addEventListener("click", function (event) {

    if (event.target === labResultSuccessModal) {

        labResultSuccessModal.classList.remove("show");

    }

});


/* OPEN LOGOUT MODAL */

labResultLogoutBtn.addEventListener("click", function () {

    labResultLogoutModal.classList.add("show");

});


/* CANCEL LOGOUT */

labResultCancelLogout.addEventListener("click", function () {

    labResultLogoutModal.classList.remove("show");

});


/* CONFIRM LOGOUT */

labResultConfirmLogout.addEventListener("click", function () {

    window.location.href = "login.html";

});


/* CLICK OUTSIDE TO CLOSE */

labResultLogoutModal.addEventListener("click", function (event) {

    if (event.target === labResultLogoutModal) {

        labResultLogoutModal.classList.remove("show");

    }

});


/* INITIAL RESULT COUNT */

updateResultNumbers();
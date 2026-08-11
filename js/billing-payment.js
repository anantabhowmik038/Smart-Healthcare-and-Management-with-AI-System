const billingSidebar =
    document.getElementById("billingSidebar");

const billingMenuToggle =
    document.getElementById("billingMenuToggle");

const billingCards =
    document.querySelectorAll(".billing-item-card");

const billingFilterButtons =
    document.querySelectorAll(".billing-filter-btn");

const billingNoResults =
    document.getElementById("billingNoResults");

const billingTotalCount =
    document.getElementById("billingTotalCount");

const billingPendingCount =
    document.getElementById("billingPendingCount");

const billingPaidCount =
    document.getElementById("billingPaidCount");

const billingPendingAmount =
    document.getElementById("billingPendingAmount");

const billingDetailsModal =
    document.getElementById("billingDetailsModal");

const billingDetailsClose =
    document.getElementById("billingDetailsClose");

const billingDetailsDone =
    document.getElementById("billingDetailsDone");

const detailsService =
    document.getElementById("detailsService");

const detailsBillId =
    document.getElementById("detailsBillId");

const detailsDate =
    document.getElementById("detailsDate");

const detailsServiceName =
    document.getElementById("detailsServiceName");

const detailsStatus =
    document.getElementById("detailsStatus");

const detailsAmount =
    document.getElementById("detailsAmount");

const billingPayModal =
    document.getElementById("billingPayModal");

const billingPayClose =
    document.getElementById("billingPayClose");

const billingPaymentCancel =
    document.getElementById("billingPaymentCancel");

const billingPaymentConfirm =
    document.getElementById("billingPaymentConfirm");

const paymentBillId =
    document.getElementById("paymentBillId");

const paymentAmount =
    document.getElementById("paymentAmount");

const paymentMethod =
    document.getElementById("paymentMethod");

const billingPaymentError =
    document.getElementById("billingPaymentError");

const billingSuccessModal =
    document.getElementById("billingSuccessModal");

const billingSuccessBtn =
    document.getElementById("billingSuccessBtn");

const billingTransactionId =
    document.getElementById("billingTransactionId");

const billingLogoutBtn =
    document.getElementById("billingLogoutBtn");

const billingLogoutModal =
    document.getElementById("billingLogoutModal");

const billingCancelLogout =
    document.getElementById("billingCancelLogout");

const billingConfirmLogout =
    document.getElementById("billingConfirmLogout");


let selectedBillCard = null;


/* MOBILE SIDEBAR */

billingMenuToggle.addEventListener("click", function () {

    billingSidebar.classList.toggle("open");

});


/* FILTER BILLS */

billingFilterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        billingFilterButtons.forEach(function (filterButton) {

            filterButton.classList.remove("active");

        });


        button.classList.add("active");


        const selectedFilter =
            button.dataset.filter;

        let visibleBills = 0;


        billingCards.forEach(function (card) {

            if (
                selectedFilter === "all" ||
                card.dataset.status === selectedFilter
            ) {

                card.style.display = "grid";

                visibleBills++;

            }
            else {

                card.style.display = "none";

            }

        });


        if (visibleBills === 0) {

            billingNoResults.classList.add("show");

        }
        else {

            billingNoResults.classList.remove("show");

        }

    });

});


/* UPDATE BILLING SUMMARY */

function updateBillingSummary() {

    let pending = 0;
    let paid = 0;
    let pendingAmount = 0;


    billingCards.forEach(function (card) {

        if (card.dataset.status === "pending") {

            pending++;

            pendingAmount +=
                Number(card.dataset.amount);

        }
        else if (card.dataset.status === "paid") {

            paid++;

        }

    });


    billingTotalCount.textContent =
        billingCards.length;

    billingPendingCount.textContent =
        pending;

    billingPaidCount.textContent =
        paid;

    billingPendingAmount.textContent =
        "৳" + pendingAmount.toLocaleString();

}


/* VIEW BILL DETAILS */

const billingDetailsButtons =
    document.querySelectorAll(
        ".billing-details-btn"
    );


billingDetailsButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const billCard =
            button.closest(".billing-item-card");


        detailsService.textContent =
            billCard.dataset.service;

        detailsBillId.textContent =
            billCard.dataset.id;

        detailsDate.textContent =
            billCard.dataset.date;

        detailsServiceName.textContent =
            billCard.dataset.service;

        detailsStatus.textContent =
            billCard.dataset.status === "paid"
                ? "Paid"
                : "Pending";

        detailsAmount.textContent =
            "৳" +
            Number(
                billCard.dataset.amount
            ).toLocaleString();


        billingDetailsModal.classList.add("show");

    });

});


/* CLOSE DETAILS MODAL */

function closeBillingDetails() {

    billingDetailsModal.classList.remove("show");

}


billingDetailsClose.addEventListener(
    "click",
    closeBillingDetails
);


billingDetailsDone.addEventListener(
    "click",
    closeBillingDetails
);


billingDetailsModal.addEventListener("click", function (event) {

    if (event.target === billingDetailsModal) {

        closeBillingDetails();

    }

});


/* OPEN PAYMENT MODAL */

const billingPayButtons =
    document.querySelectorAll(".billing-pay-btn");


billingPayButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        selectedBillCard =
            button.closest(".billing-item-card");


        paymentBillId.textContent =
            selectedBillCard.dataset.id;


        paymentAmount.textContent =
            "৳" +
            Number(
                selectedBillCard.dataset.amount
            ).toLocaleString();


        paymentMethod.value = "";

        billingPaymentError.textContent = "";


        billingPayModal.classList.add("show");

    });

});


/* CLOSE PAYMENT MODAL */

function closePaymentModal() {

    billingPayModal.classList.remove("show");

    paymentMethod.value = "";

    billingPaymentError.textContent = "";

    selectedBillCard = null;

}


billingPayClose.addEventListener(
    "click",
    closePaymentModal
);


billingPaymentCancel.addEventListener(
    "click",
    closePaymentModal
);


billingPayModal.addEventListener("click", function (event) {

    if (event.target === billingPayModal) {

        closePaymentModal();

    }

});


/* CONFIRM DEMO PAYMENT */

billingPaymentConfirm.addEventListener("click", function () {

    if (selectedBillCard === null) {

        return;

    }


    if (paymentMethod.value === "") {

        billingPaymentError.textContent =
            "Please select a payment method.";

        return;

    }


    selectedBillCard.dataset.status =
        "paid";


    const statusBadge =
        selectedBillCard.querySelector(
            ".billing-status"
        );


    statusBadge.textContent =
        "Paid";

    statusBadge.classList.remove("pending");

    statusBadge.classList.add("paid");


    const payButton =
        selectedBillCard.querySelector(
            ".billing-pay-btn"
        );


    if (payButton) {

        payButton.remove();

    }


    const transactionNumber =
        Math.floor(
            100000 + Math.random() * 900000
        );


    billingTransactionId.textContent =
        "DEMO-" + transactionNumber;


    billingPayModal.classList.remove("show");

    billingSuccessModal.classList.add("show");


    selectedBillCard = null;


    updateBillingSummary();

});


/* SUCCESS MODAL */

billingSuccessBtn.addEventListener("click", function () {

    billingSuccessModal.classList.remove("show");

});


billingSuccessModal.addEventListener("click", function (event) {

    if (event.target === billingSuccessModal) {

        billingSuccessModal.classList.remove("show");

    }

});


/* OPEN LOGOUT MODAL */

billingLogoutBtn.addEventListener("click", function () {

    billingLogoutModal.classList.add("show");

});


/* CANCEL LOGOUT */

billingCancelLogout.addEventListener("click", function () {

    billingLogoutModal.classList.remove("show");

});


/* CONFIRM LOGOUT */

billingConfirmLogout.addEventListener("click", function () {

    window.location.href = "login.html";

});


/* CLICK OUTSIDE TO CLOSE */

billingLogoutModal.addEventListener("click", function (event) {

    if (event.target === billingLogoutModal) {

        billingLogoutModal.classList.remove("show");

    }

});


/* INITIAL SUMMARY */

updateBillingSummary();
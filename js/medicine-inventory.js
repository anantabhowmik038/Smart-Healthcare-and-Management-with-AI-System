const inventorySidebar =
    document.getElementById("inventorySidebar");

const inventoryMenuToggle =
    document.getElementById("inventoryMenuToggle");

const inventorySearch =
    document.getElementById("inventorySearch");

const inventoryCategoryFilter =
    document.getElementById("inventoryCategoryFilter");

const inventoryStatusFilter =
    document.getElementById("inventoryStatusFilter");

const inventoryRows =
    document.querySelectorAll(".inventory-row");

const inventoryResultCount =
    document.getElementById("inventoryResultCount");

const inventoryNoResults =
    document.getElementById("inventoryNoResults");

const inventoryTotalCount =
    document.getElementById("inventoryTotalCount");

const inventoryInStockCount =
    document.getElementById("inventoryInStockCount");

const inventoryLowStockCount =
    document.getElementById("inventoryLowStockCount");

const inventoryOutStockCount =
    document.getElementById("inventoryOutStockCount");

const inventoryStockModal =
    document.getElementById("inventoryStockModal");

const selectedMedicineName =
    document.getElementById("selectedMedicineName");

const selectedMedicineId =
    document.getElementById("selectedMedicineId");

const currentStockQuantity =
    document.getElementById("currentStockQuantity");

const newStockQuantity =
    document.getElementById("newStockQuantity");

const inventoryModalError =
    document.getElementById("inventoryModalError");

const inventoryModalClose =
    document.getElementById("inventoryModalClose");

const inventoryModalCancel =
    document.getElementById("inventoryModalCancel");

const inventoryModalSave =
    document.getElementById("inventoryModalSave");

const inventorySuccessModal =
    document.getElementById("inventorySuccessModal");

const inventorySuccessBtn =
    document.getElementById("inventorySuccessBtn");

const inventoryLogoutBtn =
    document.getElementById("inventoryLogoutBtn");

const inventoryLogoutModal =
    document.getElementById("inventoryLogoutModal");

const inventoryCancelLogout =
    document.getElementById("inventoryCancelLogout");

const inventoryConfirmLogout =
    document.getElementById("inventoryConfirmLogout");


let selectedInventoryRow = null;


/* MOBILE SIDEBAR */

inventoryMenuToggle.addEventListener("click", function () {

    inventorySidebar.classList.toggle("open");

});


/* FILTER INVENTORY */

function filterInventory() {

    const searchValue =
        inventorySearch.value.toLowerCase().trim();

    const selectedCategory =
        inventoryCategoryFilter.value;

    const selectedStatus =
        inventoryStatusFilter.value;

    let visibleItems = 0;


    inventoryRows.forEach(function (row) {

        const searchData =
            row.dataset.search;

        const category =
            row.dataset.category;

        const status =
            row.dataset.status;


        const matchesSearch =
            searchData.includes(searchValue);

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        const matchesStatus =
            selectedStatus === "all" ||
            status === selectedStatus;


        if (
            matchesSearch &&
            matchesCategory &&
            matchesStatus
        ) {

            row.style.display = "table-row";

            visibleItems++;

        }
        else {

            row.style.display = "none";

        }

    });


    if (visibleItems === 1) {

        inventoryResultCount.textContent =
            "Showing 1 medicine";

    }
    else {

        inventoryResultCount.textContent =
            "Showing " + visibleItems + " medicines";

    }


    if (visibleItems === 0) {

        inventoryNoResults.classList.add("show");

    }
    else {

        inventoryNoResults.classList.remove("show");

    }

}


inventorySearch.addEventListener(
    "input",
    filterInventory
);


inventoryCategoryFilter.addEventListener(
    "change",
    filterInventory
);


inventoryStatusFilter.addEventListener(
    "change",
    filterInventory
);


/* UPDATE SUMMARY */

function updateInventorySummary() {

    let inStock = 0;
    let lowStock = 0;
    let outOfStock = 0;


    inventoryRows.forEach(function (row) {

        if (row.dataset.status === "in-stock") {

            inStock++;

        }
        else if (row.dataset.status === "low-stock") {

            lowStock++;

        }
        else if (row.dataset.status === "out-of-stock") {

            outOfStock++;

        }

    });


    inventoryTotalCount.textContent =
        inventoryRows.length;

    inventoryInStockCount.textContent =
        inStock;

    inventoryLowStockCount.textContent =
        lowStock;

    inventoryOutStockCount.textContent =
        outOfStock;

}


/* OPEN UPDATE STOCK MODAL */

const inventoryUpdateButtons =
    document.querySelectorAll(
        ".inventory-update-btn"
    );


inventoryUpdateButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        selectedInventoryRow =
            button.closest(".inventory-row");


        selectedMedicineName.textContent =
            selectedInventoryRow.dataset.name;

        selectedMedicineId.textContent =
            "#" + selectedInventoryRow.dataset.id;

        currentStockQuantity.textContent =
            selectedInventoryRow.dataset.quantity;

        newStockQuantity.value =
            selectedInventoryRow.dataset.quantity;

        inventoryModalError.textContent = "";


        inventoryStockModal.classList.add("show");

    });

});


/* CLOSE UPDATE MODAL */

function closeInventoryModal() {

    inventoryStockModal.classList.remove("show");

    inventoryModalError.textContent = "";

    selectedInventoryRow = null;

}


inventoryModalClose.addEventListener(
    "click",
    closeInventoryModal
);


inventoryModalCancel.addEventListener(
    "click",
    closeInventoryModal
);


/* SAVE STOCK */

inventoryModalSave.addEventListener("click", function () {

    if (selectedInventoryRow === null) {

        return;

    }


    const quantity =
        Number(newStockQuantity.value);


    if (
        newStockQuantity.value === "" ||
        quantity < 0 ||
        !Number.isInteger(quantity)
    ) {

        inventoryModalError.textContent =
            "Please enter a valid whole-number stock quantity.";

        return;

    }


    selectedInventoryRow.dataset.quantity =
        quantity;


    const quantityCell =
        selectedInventoryRow.querySelector(
            ".inventory-quantity"
        );


    quantityCell.textContent =
        quantity;


    const statusElement =
        selectedInventoryRow.querySelector(
            ".inventory-status"
        );


    statusElement.classList.remove(
        "in-stock",
        "low-stock",
        "out-of-stock"
    );


    if (quantity === 0) {

        selectedInventoryRow.dataset.status =
            "out-of-stock";

        statusElement.textContent =
            "Out of Stock";

        statusElement.classList.add(
            "out-of-stock"
        );

    }
    else if (quantity <= 20) {

        selectedInventoryRow.dataset.status =
            "low-stock";

        statusElement.textContent =
            "Low Stock";

        statusElement.classList.add(
            "low-stock"
        );

    }
    else {

        selectedInventoryRow.dataset.status =
            "in-stock";

        statusElement.textContent =
            "In Stock";

        statusElement.classList.add(
            "in-stock"
        );

    }


    inventoryStockModal.classList.remove("show");

    inventorySuccessModal.classList.add("show");


    selectedInventoryRow = null;


    updateInventorySummary();

    filterInventory();

});


/* CLICK OUTSIDE TO CLOSE STOCK MODAL */

inventoryStockModal.addEventListener("click", function (event) {

    if (event.target === inventoryStockModal) {

        closeInventoryModal();

    }

});


/* SUCCESS MODAL */

inventorySuccessBtn.addEventListener("click", function () {

    inventorySuccessModal.classList.remove("show");

});


inventorySuccessModal.addEventListener("click", function (event) {

    if (event.target === inventorySuccessModal) {

        inventorySuccessModal.classList.remove("show");

    }

});


/* OPEN LOGOUT MODAL */

inventoryLogoutBtn.addEventListener("click", function () {

    inventoryLogoutModal.classList.add("show");

});


/* CANCEL LOGOUT */

inventoryCancelLogout.addEventListener("click", function () {

    inventoryLogoutModal.classList.remove("show");

});


/* CONFIRM LOGOUT */

inventoryConfirmLogout.addEventListener("click", function () {

    window.location.href = "login.html";

});


/* CLICK OUTSIDE TO CLOSE */

inventoryLogoutModal.addEventListener("click", function (event) {

    if (event.target === inventoryLogoutModal) {

        inventoryLogoutModal.classList.remove("show");

    }

});


/* INITIAL SUMMARY */

updateInventorySummary();
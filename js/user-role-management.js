const userRoleSidebar =
    document.getElementById("userRoleSidebar");

const userRoleMenuToggle =
    document.getElementById("userRoleMenuToggle");

const userSearch =
    document.getElementById("userSearch");

const roleFilter =
    document.getElementById("roleFilter");

const userStatusFilter =
    document.getElementById("userStatusFilter");

const userRows =
    document.querySelectorAll(".user-management-row");

const userResultCount =
    document.getElementById("userResultCount");

const userRoleNoResults =
    document.getElementById("userRoleNoResults");

const totalUsersCount =
    document.getElementById("totalUsersCount");

const activeUsersCount =
    document.getElementById("activeUsersCount");

const inactiveUsersCount =
    document.getElementById("inactiveUsersCount");

const userManageModal =
    document.getElementById("userManageModal");

const manageUserName =
    document.getElementById("manageUserName");

const manageUserId =
    document.getElementById("manageUserId");

const manageUserRole =
    document.getElementById("manageUserRole");

const manageUserStatus =
    document.getElementById("manageUserStatus");

const userManageError =
    document.getElementById("userManageError");

const userManageModalClose =
    document.getElementById("userManageModalClose");

const userManageCancelBtn =
    document.getElementById("userManageCancelBtn");

const userManageSaveBtn =
    document.getElementById("userManageSaveBtn");

const userRoleSuccessModal =
    document.getElementById("userRoleSuccessModal");

const userRoleSuccessBtn =
    document.getElementById("userRoleSuccessBtn");

const userRoleLogoutBtn =
    document.getElementById("userRoleLogoutBtn");

const userRoleLogoutModal =
    document.getElementById("userRoleLogoutModal");

const userRoleCancelLogout =
    document.getElementById("userRoleCancelLogout");

const userRoleConfirmLogout =
    document.getElementById("userRoleConfirmLogout");


let selectedUserRow = null;


/* MOBILE SIDEBAR */

userRoleMenuToggle.addEventListener("click", function () {

    userRoleSidebar.classList.toggle("open");

});


/* FILTER USERS */

function filterUsers() {

    const searchValue =
        userSearch.value.toLowerCase().trim();

    const selectedRole =
        roleFilter.value;

    const selectedStatus =
        userStatusFilter.value;

    let visibleUsers = 0;


    userRows.forEach(function (row) {

        const searchData =
            row.dataset.search;

        const role =
            row.dataset.role;

        const status =
            row.dataset.status;


        const matchesSearch =
            searchData.includes(searchValue);

        const matchesRole =
            selectedRole === "all" ||
            role === selectedRole;

        const matchesStatus =
            selectedStatus === "all" ||
            status === selectedStatus;


        if (
            matchesSearch &&
            matchesRole &&
            matchesStatus
        ) {

            row.style.display = "table-row";

            visibleUsers++;

        }
        else {

            row.style.display = "none";

        }

    });


    if (visibleUsers === 1) {

        userResultCount.textContent =
            "Showing 1 user";

    }
    else {

        userResultCount.textContent =
            "Showing " + visibleUsers + " users";

    }


    if (visibleUsers === 0) {

        userRoleNoResults.classList.add("show");

    }
    else {

        userRoleNoResults.classList.remove("show");

    }

}


userSearch.addEventListener(
    "input",
    filterUsers
);


roleFilter.addEventListener(
    "change",
    filterUsers
);


userStatusFilter.addEventListener(
    "change",
    filterUsers
);


/* UPDATE SUMMARY */

function updateUserSummary() {

    let activeUsers = 0;
    let inactiveUsers = 0;


    userRows.forEach(function (row) {

        if (row.dataset.status === "active") {

            activeUsers++;

        }
        else if (row.dataset.status === "inactive") {

            inactiveUsers++;

        }

    });


    totalUsersCount.textContent =
        userRows.length;

    activeUsersCount.textContent =
        activeUsers;

    inactiveUsersCount.textContent =
        inactiveUsers;

}


/* OPEN MANAGE USER MODAL */

const userManageButtons =
    document.querySelectorAll(".user-manage-btn");


userManageButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        selectedUserRow =
            button.closest(".user-management-row");


        manageUserName.textContent =
            selectedUserRow.dataset.name;


        manageUserId.textContent =
            "#" + selectedUserRow.dataset.id;


        manageUserRole.value =
            selectedUserRow.dataset.role;


        manageUserStatus.value =
            selectedUserRow.dataset.status;


        userManageError.textContent = "";


        userManageModal.classList.add("show");

    });

});


/* CLOSE MANAGE MODAL */

function closeUserManageModal() {

    userManageModal.classList.remove("show");

    userManageError.textContent = "";

    selectedUserRow = null;

}


userManageModalClose.addEventListener(
    "click",
    closeUserManageModal
);


userManageCancelBtn.addEventListener(
    "click",
    closeUserManageModal
);


/* ROLE DISPLAY */

function getRoleDisplayName(role) {

    if (role === "patient") {

        return "Patient";

    }

    if (role === "doctor") {

        return "Doctor";

    }

    if (role === "receptionist") {

        return "Receptionist";

    }

    if (role === "pharmacist") {

        return "Pharmacist";

    }

    if (role === "lab") {

        return "Lab Technician";

    }

    return "Administrator";

}


/* SAVE USER CHANGES */

userManageSaveBtn.addEventListener("click", function () {

    if (selectedUserRow === null) {

        return;

    }


    const newRole =
        manageUserRole.value;

    const newStatus =
        manageUserStatus.value;


    if (
        newRole === "" ||
        newStatus === ""
    ) {

        userManageError.textContent =
            "Please select both user role and account status.";

        return;

    }


    selectedUserRow.dataset.role =
        newRole;

    selectedUserRow.dataset.status =
        newStatus;


    const roleBadge =
        selectedUserRow.querySelector(
            ".user-role-badge"
        );


    roleBadge.className =
        "user-role-badge " + newRole;


    roleBadge.textContent =
        getRoleDisplayName(newRole);


    const statusBadge =
        selectedUserRow.querySelector(
            ".user-status-badge"
        );


    statusBadge.className =
        "user-status-badge " + newStatus;


    if (newStatus === "active") {

        statusBadge.textContent =
            "Active";

    }
    else {

        statusBadge.textContent =
            "Inactive";

    }


    userManageModal.classList.remove("show");

    userRoleSuccessModal.classList.add("show");


    selectedUserRow = null;


    updateUserSummary();

    filterUsers();

});


/* CLICK OUTSIDE TO CLOSE */

userManageModal.addEventListener("click", function (event) {

    if (event.target === userManageModal) {

        closeUserManageModal();

    }

});


/* SUCCESS MODAL */

userRoleSuccessBtn.addEventListener("click", function () {

    userRoleSuccessModal.classList.remove("show");

});


userRoleSuccessModal.addEventListener("click", function (event) {

    if (event.target === userRoleSuccessModal) {

        userRoleSuccessModal.classList.remove("show");

    }

});


/* OPEN LOGOUT MODAL */

userRoleLogoutBtn.addEventListener("click", function () {

    userRoleLogoutModal.classList.add("show");

});


/* CANCEL LOGOUT */

userRoleCancelLogout.addEventListener("click", function () {

    userRoleLogoutModal.classList.remove("show");

});


/* CONFIRM LOGOUT */

userRoleConfirmLogout.addEventListener("click", function () {

    window.location.href = "login.html";

});


/* CLICK OUTSIDE TO CLOSE */

userRoleLogoutModal.addEventListener("click", function (event) {

    if (event.target === userRoleLogoutModal) {

        userRoleLogoutModal.classList.remove("show");

    }

});


/* INITIAL SUMMARY */

updateUserSummary();
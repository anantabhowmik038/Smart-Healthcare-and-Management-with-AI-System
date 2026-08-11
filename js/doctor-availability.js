const availabilitySidebar =
    document.getElementById("availabilitySidebar");

const availabilityMenuToggle =
    document.getElementById("availabilityMenuToggle");

const doctorSearch =
    document.getElementById("doctorSearch");

const specialtyFilter =
    document.getElementById("specialtyFilter");

const doctorCards =
    document.querySelectorAll(".doctor-availability-card");

const doctorResultCount =
    document.getElementById("doctorResultCount");

const availabilityNoResults =
    document.getElementById("availabilityNoResults");

const availabilityLogoutBtn =
    document.getElementById("availabilityLogoutBtn");

const availabilityLogoutModal =
    document.getElementById("availabilityLogoutModal");

const availabilityCancelLogout =
    document.getElementById("availabilityCancelLogout");

const availabilityConfirmLogout =
    document.getElementById("availabilityConfirmLogout");


/* MOBILE SIDEBAR */

availabilityMenuToggle.addEventListener("click", function () {

    availabilitySidebar.classList.toggle("open");

});


/* FILTER DOCTORS */

function filterDoctors() {

    const searchValue =
        doctorSearch.value.toLowerCase().trim();

    const selectedSpecialty =
        specialtyFilter.value;

    let visibleDoctors = 0;


    doctorCards.forEach(function (doctorCard) {

        const doctorName =
            doctorCard.dataset.name;

        const doctorSpecialty =
            doctorCard.dataset.specialty;


        const matchesName =
            doctorName.includes(searchValue);

        const matchesSpecialty =
            selectedSpecialty === "all" ||
            doctorSpecialty === selectedSpecialty;


        if (matchesName && matchesSpecialty) {

            doctorCard.style.display = "block";

            visibleDoctors++;

        }
        else {

            doctorCard.style.display = "none";

        }

    });


    if (visibleDoctors === 1) {

        doctorResultCount.textContent =
            "Showing 1 doctor";

    }
    else {

        doctorResultCount.textContent =
            "Showing " + visibleDoctors + " doctors";

    }


    if (visibleDoctors === 0) {

        availabilityNoResults.classList.add("show");

    }
    else {

        availabilityNoResults.classList.remove("show");

    }

}


doctorSearch.addEventListener("input", filterDoctors);

specialtyFilter.addEventListener("change", filterDoctors);


/* OPEN LOGOUT MODAL */

availabilityLogoutBtn.addEventListener("click", function () {

    availabilityLogoutModal.classList.add("show");

});


/* CANCEL LOGOUT */

availabilityCancelLogout.addEventListener("click", function () {

    availabilityLogoutModal.classList.remove("show");

});


/* CONFIRM LOGOUT */

availabilityConfirmLogout.addEventListener("click", function () {

    window.location.href = "login.html";

});


/* CLICK OUTSIDE TO CLOSE */

availabilityLogoutModal.addEventListener("click", function (event) {

    if (event.target === availabilityLogoutModal) {

        availabilityLogoutModal.classList.remove("show");

    }

});
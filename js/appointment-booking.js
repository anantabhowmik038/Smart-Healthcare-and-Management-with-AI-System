const bookingSidebar =
    document.getElementById("bookingSidebar");

const bookingMenuToggle =
    document.getElementById("bookingMenuToggle");

const appointmentBookingForm =
    document.getElementById("appointmentBookingForm");

const bookingSpecialty =
    document.getElementById("bookingSpecialty");

const bookingDoctor =
    document.getElementById("bookingDoctor");

const bookingDate =
    document.getElementById("bookingDate");

const consultationType =
    document.getElementById("consultationType");

const appointmentReason =
    document.getElementById("appointmentReason");

const bookingTimeSlots =
    document.getElementById("bookingTimeSlots");

const bookingError =
    document.getElementById("bookingError");

const summaryDoctorAvatar =
    document.getElementById("summaryDoctorAvatar");

const summaryDoctorName =
    document.getElementById("summaryDoctorName");

const summarySpecialty =
    document.getElementById("summarySpecialty");

const summaryDate =
    document.getElementById("summaryDate");

const summaryTime =
    document.getElementById("summaryTime");

const summaryConsultation =
    document.getElementById("summaryConsultation");

const bookingSuccessModal =
    document.getElementById("bookingSuccessModal");

const bookingSuccessBtn =
    document.getElementById("bookingSuccessBtn");

const modalDoctor =
    document.getElementById("modalDoctor");

const modalDate =
    document.getElementById("modalDate");

const modalTime =
    document.getElementById("modalTime");

const bookingLogoutBtn =
    document.getElementById("bookingLogoutBtn");

const bookingLogoutModal =
    document.getElementById("bookingLogoutModal");

const bookingCancelLogout =
    document.getElementById("bookingCancelLogout");

const bookingConfirmLogout =
    document.getElementById("bookingConfirmLogout");


let selectedTime = "";


/* DOCTOR DATA */

const doctorData = {

    general: [
        {
            name: "Dr. Sarah Ahmed",
            initials: "SA",
            times: ["09:30 AM", "10:30 AM", "11:30 AM"]
        }
    ],

    cardiology: [
        {
            name: "Dr. Mahmud Hasan",
            initials: "MH",
            times: ["02:00 PM", "03:00 PM", "04:00 PM"]
        }
    ],

    dermatology: [
        {
            name: "Dr. Nabila Rahman",
            initials: "NR",
            times: ["10:00 AM", "12:00 PM", "01:30 PM"]
        }
    ],

    pediatrics: [
        {
            name: "Dr. Farhana Islam",
            initials: "FI",
            times: ["09:00 AM", "11:00 AM", "02:30 PM"]
        }
    ]

};


/* MOBILE SIDEBAR */

bookingMenuToggle.addEventListener("click", function () {

    bookingSidebar.classList.toggle("open");

});


/* SET MINIMUM DATE */

const today = new Date();

const year = today.getFullYear();

const month =
    String(today.getMonth() + 1).padStart(2, "0");

const day =
    String(today.getDate()).padStart(2, "0");

bookingDate.min =
    year + "-" + month + "-" + day;


/* LOAD DOCTORS */

bookingSpecialty.addEventListener("change", function () {

    const specialty =
        bookingSpecialty.value;


    bookingDoctor.innerHTML = "";

    selectedTime = "";

    resetTimeSlots();


    if (specialty === "") {

        bookingDoctor.disabled = true;

        bookingDoctor.innerHTML =
            '<option value="">Select Specialty First</option>';

        resetDoctorSummary();

        return;

    }


    bookingDoctor.disabled = false;


    const defaultOption =
        document.createElement("option");

    defaultOption.value = "";

    defaultOption.textContent =
        "Select Doctor";

    bookingDoctor.appendChild(defaultOption);


    doctorData[specialty].forEach(function (doctor, index) {

        const option =
            document.createElement("option");

        option.value = index;

        option.textContent = doctor.name;

        bookingDoctor.appendChild(option);

    });


    summarySpecialty.textContent =
        bookingSpecialty.options[
            bookingSpecialty.selectedIndex
        ].text;

});


/* LOAD TIME SLOTS */

bookingDoctor.addEventListener("change", function () {

    const specialty =
        bookingSpecialty.value;

    const doctorIndex =
        bookingDoctor.value;


    selectedTime = "";

    summaryTime.textContent =
        "Not Selected";


    if (doctorIndex === "") {

        resetDoctorSummary();

        resetTimeSlots();

        return;

    }


    const doctor =
        doctorData[specialty][doctorIndex];


    summaryDoctorName.textContent =
        doctor.name;

    summaryDoctorAvatar.textContent =
        doctor.initials;

    summarySpecialty.textContent =
        bookingSpecialty.options[
            bookingSpecialty.selectedIndex
        ].text;


    bookingTimeSlots.innerHTML = "";


    doctor.times.forEach(function (time) {

        const timeButton =
            document.createElement("button");

        timeButton.type = "button";

        timeButton.className =
            "booking-time-btn";

        timeButton.textContent =
            time;


        timeButton.addEventListener("click", function () {

            const allTimeButtons =
                document.querySelectorAll(
                    ".booking-time-btn"
                );


            allTimeButtons.forEach(function (button) {

                button.classList.remove("selected");

            });


            timeButton.classList.add("selected");

            selectedTime = time;

            summaryTime.textContent = time;

        });


        bookingTimeSlots.appendChild(timeButton);

    });

});


/* UPDATE DATE SUMMARY */

bookingDate.addEventListener("change", function () {

    if (bookingDate.value === "") {

        summaryDate.textContent =
            "Not Selected";

        return;

    }


    const selectedDate =
        new Date(bookingDate.value + "T00:00:00");


    summaryDate.textContent =
        selectedDate.toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

});


/* UPDATE CONSULTATION SUMMARY */

consultationType.addEventListener("change", function () {

    if (consultationType.value === "") {

        summaryConsultation.textContent =
            "Not Selected";

        return;

    }


    summaryConsultation.textContent =
        consultationType.options[
            consultationType.selectedIndex
        ].text;

});


/* RESET TIME SLOTS */

function resetTimeSlots() {

    bookingTimeSlots.innerHTML =
        '<p class="booking-time-placeholder">' +
        'Select a doctor to view available time slots.' +
        '</p>';

}


/* RESET DOCTOR SUMMARY */

function resetDoctorSummary() {

    summaryDoctorName.textContent =
        "No Doctor Selected";

    summaryDoctorAvatar.textContent =
        "DR";

    if (bookingSpecialty.value === "") {

        summarySpecialty.textContent =
            "Select a specialty";

    }

}


/* SUBMIT APPOINTMENT */

appointmentBookingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    bookingError.textContent = "";


    if (bookingSpecialty.value === "") {

        bookingError.textContent =
            "Please select a medical specialty.";

        return;

    }


    if (bookingDoctor.value === "") {

        bookingError.textContent =
            "Please select a doctor.";

        return;

    }


    if (bookingDate.value === "") {

        bookingError.textContent =
            "Please select an appointment date.";

        return;

    }


    if (consultationType.value === "") {

        bookingError.textContent =
            "Please select a consultation type.";

        return;

    }


    if (selectedTime === "") {

        bookingError.textContent =
            "Please select an available appointment time.";

        return;

    }


    if (appointmentReason.value.trim().length < 5) {

        bookingError.textContent =
            "Please briefly enter the reason for your appointment.";

        return;

    }


    const specialty =
        bookingSpecialty.value;

    const doctorIndex =
        bookingDoctor.value;

    const doctor =
        doctorData[specialty][doctorIndex];


    modalDoctor.textContent =
        doctor.name;

    modalDate.textContent =
        summaryDate.textContent;

    modalTime.textContent =
        selectedTime;


    bookingSuccessModal.classList.add("show");

});


/* SUCCESS MODAL */

bookingSuccessBtn.addEventListener("click", function () {

    window.location.href =
        "patient-dashboard.html";

});


bookingSuccessModal.addEventListener("click", function (event) {

    if (event.target === bookingSuccessModal) {

        bookingSuccessModal.classList.remove("show");

    }

});


/* OPEN LOGOUT MODAL */

bookingLogoutBtn.addEventListener("click", function () {

    bookingLogoutModal.classList.add("show");

});


/* CANCEL LOGOUT */

bookingCancelLogout.addEventListener("click", function () {

    bookingLogoutModal.classList.remove("show");

});


/* CONFIRM LOGOUT */

bookingConfirmLogout.addEventListener("click", function () {

    window.location.href = "login.html";

});


/* CLICK OUTSIDE TO CLOSE */

bookingLogoutModal.addEventListener("click", function (event) {

    if (event.target === bookingLogoutModal) {

        bookingLogoutModal.classList.remove("show");

    }

});
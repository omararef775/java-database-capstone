import { deleteDoctor } from '../services/doctorServices.js';
import { getPatientData } from '../services/patientServices.js';

export function createDoctorCard(doctor) {
    const card = document.createElement("div");
    card.classList.add("doctor-card");

    const role = localStorage.getItem("userRole");

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("doctor-info");

    const name = document.createElement("h3");
    name.textContent = doctor.name;

    const specialization = document.createElement("p");
    specialization.textContent = `التخصص: ${doctor.specialty}`;

    const email = document.createElement("p");
    email.textContent = `البريد: ${doctor.email}`;

    const availability = document.createElement("p");
    availability.textContent = `متاح: ${Array.isArray(doctor.availableTimes) ? doctor.availableTimes.join(" , ") : doctor.availableTimes}`;

    infoDiv.appendChild(name);
    infoDiv.appendChild(specialization);
    infoDiv.appendChild(email);
    infoDiv.appendChild(availability);

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("card-actions");

    if (role === "admin") {
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "حذف الطبيب";
        removeBtn.classList.add("delete-btn");

        removeBtn.addEventListener("click", async () => {
            const confirmDelete = confirm(`هل أنت متأكد من حذف الطبيب ${doctor.name}؟`);
            if (confirmDelete) {
                const token = localStorage.getItem("token");
                const success = await deleteDoctor(doctor.id, token);
                if (success) {
                    card.remove();
                } else {
                    alert("فشل حذف الطبيب. يرجى المحاولة لاحقاً.");
                }
            }
        });
        actionsDiv.appendChild(removeBtn);
    }
    else if (role === "patient") {
        const bookNow = document.createElement("button");
        bookNow.textContent = "احجز الآن";
        bookNow.classList.add("book-btn");

        bookNow.addEventListener("click", () => {
            alert("يرجى تسجيل الدخول أولاً لتتمكن من الحجز.");
        });
        actionsDiv.appendChild(bookNow);
    }
    else if (role === "loggedPatient") {
        const bookNow = document.createElement("button");
        bookNow.textContent = "احجز الآن";
        bookNow.classList.add("book-btn");

        bookNow.addEventListener("click", async (e) => {
            const token = localStorage.getItem("token");
            try {
                const patientData = await getPatientData(token);
                if (typeof showBookingOverlay === "function") {
                    showBookingOverlay(e, doctor, patientData);
                }
            } catch (error) {
                console.error("Error fetching patient data:", error);
                alert("حدث خطأ أثناء جلب بياناتك. يرجى إعادة تسجيل الدخول.");
            }
        });
        actionsDiv.appendChild(bookNow);
    }

    card.appendChild(infoDiv);
    card.appendChild(actionsDiv);

    return card;
}
import { getAllAppointments } from './services/appointmentRecordService.js';
import { createPatientRow } from './components/patientRows.js';

let selectedDate = new Date().toISOString().split('T')[0];
let patientName = "null";
const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", () => {
    if (typeof renderContent === "function") renderContent();

    const dateFilter = document.getElementById("dateFilter");
    if (dateFilter) {
        dateFilter.value = selectedDate;
    }

    loadAppointments();

    const searchBar = document.getElementById("searchBar");
    if (searchBar) {
        searchBar.addEventListener("input", (e) => {
            patientName = e.target.value.trim() !== "" ? e.target.value : "null";
            loadAppointments();
        });
    }

    const todayBtn = document.getElementById("todayBtn");
    if (todayBtn) {
        todayBtn.addEventListener("click", () => {
            selectedDate = new Date().toISOString().split('T')[0];
            if (dateFilter) dateFilter.value = selectedDate;
            loadAppointments();
        });
    }

    if (dateFilter) {
        dateFilter.addEventListener("change", (e) => {
            selectedDate = e.target.value;
            loadAppointments();
        });
    }
});

async function loadAppointments() {
    const tbody = document.querySelector("#patientTable tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    try {
        const appointments = await getAllAppointments(selectedDate, patientName, token);

        if (!appointments || appointments.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" class="noPatientRecord">لم يتم العثور على مواعيد لهذا اليوم</td></tr>`;
            return;
        }

        appointments.forEach(appointment => {
            const patientData = appointment.patient || appointment;
            const row = createPatientRow(patientData, appointment);
            tbody.appendChild(row);
        });
    } catch (error) {
        tbody.innerHTML = `<tr><td colspan="5" class="noPatientRecord">حدث خطأ أثناء جلب البيانات</td></tr>`;
    }
}
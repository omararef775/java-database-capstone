import { openModal } from './components/modals.js';
import { getDoctors, filterDoctors, saveDoctor } from './services/doctorServices.js';
import { createDoctorCard } from './components/doctorCard.js';

document.addEventListener("DOMContentLoaded", () => {
    loadDoctorCards();

    const addDocBtn = document.getElementById('addDocBtn');
    if (addDocBtn) {
        addDocBtn.addEventListener('click', () => {
            openModal('addDoctor');
        });
    }

    const searchBar = document.getElementById("searchBar");
    const filterTime = document.getElementById("timeFilter") || document.getElementById("filterTime");
    const filterSpecialty = document.getElementById("specialtyFilter") || document.getElementById("filterSpecialty");

    if (searchBar) searchBar.addEventListener("input", filterDoctorsOnChange);
    if (filterTime) filterTime.addEventListener("change", filterDoctorsOnChange);
    if (filterSpecialty) filterSpecialty.addEventListener("change", filterDoctorsOnChange);
});

async function loadDoctorCards() {
    const contentDiv = document.getElementById("content");
    if (!contentDiv) return;

    contentDiv.innerHTML = "";

    try {
        const doctors = await getDoctors();
        renderDoctorCards(doctors);
    } catch (error) {
        contentDiv.innerHTML = "<p>فشل في تحميل الأطباء.</p>";
    }
}

async function filterDoctorsOnChange() {
    const searchBar = document.getElementById("searchBar");
    const filterTime = document.getElementById("timeFilter") || document.getElementById("filterTime");
    const filterSpecialty = document.getElementById("specialtyFilter") || document.getElementById("filterSpecialty");

    const name = searchBar ? searchBar.value : "";
    const time = filterTime ? filterTime.value : "";
    const specialty = filterSpecialty ? filterSpecialty.value : "";

    const contentDiv = document.getElementById("content");
    if (!contentDiv) return;

    contentDiv.innerHTML = "";

    try {
        const doctors = await filterDoctors(name, time, specialty);
        if (doctors && doctors.length > 0) {
            renderDoctorCards(doctors);
        } else {
            contentDiv.innerHTML = "<p>لم يتم العثور على أطباء مطابقين.</p>";
        }
    } catch (error) {
        contentDiv.innerHTML = "<p>خطأ أثناء التصفية.</p>";
    }
}

function renderDoctorCards(doctors) {
    const contentDiv = document.getElementById("content");
    if (!contentDiv || !doctors) return;

    doctors.forEach(doctor => {
        const card = createDoctorCard(doctor);
        contentDiv.appendChild(card);
    });
}

window.adminAddDoctor = async function(event) {
    if (event) event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
        alert("رمز المصادقة مفقود. يرجى تسجيل الدخول مجدداً.");
        return;
    }

    const name = document.getElementById("docName").value;
    const specialty = document.getElementById("docSpecialty").value;
    const email = document.getElementById("docEmail").value;
    const password = document.getElementById("docPassword").value;
    const phone = document.getElementById("docPhone").value;

    const checkboxes = document.querySelectorAll('input[name="availability"]:checked');
    const availableTimes = Array.from(checkboxes).map(cb => cb.value);

    const newDoctor = { name, specialty, email, password, phone, availableTimes };

    try {
        const result = await saveDoctor(newDoctor, token);
        if (result.success) {
            alert(result.message);
            const modal = document.getElementById("modal");
            if (modal) modal.style.display = "none";
            loadDoctorCards();
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert("حدث خطأ أثناء إضافة الطبيب.");
    }
}
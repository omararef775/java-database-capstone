import { openModal } from '../components/modals.js';
import { API_BASE_URL } from '../config/config.js';

const ADMIN_API = API_BASE_URL + '/admin';
const DOCTOR_API = API_BASE_URL + '/doctor/login';

window.onload = function () {
    const adminBtn = document.getElementById('adminLogin') || document.getElementById('adminBtn');
    if (adminBtn) {
        adminBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('adminLogin');
        });
    }

    const doctorBtn = document.getElementById('doctorLogin') || document.getElementById('doctorBtn');
    if (doctorBtn) {
        doctorBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('doctorLogin');
        });
    }

    const patientBtn = document.getElementById('patientBtn');
    if (patientBtn) {
        patientBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.setItem('userRole', 'patient');
            window.location.href = '/pages/patientDashboard.html';
        });
    }
};

window.adminLoginHandler = async function () {
    const usernameInput = document.getElementById('adminUsername');
    const passwordInput = document.getElementById('adminPassword');

    if (!usernameInput || !passwordInput) return;

    const admin = {
        username: usernameInput.value,
        password: passwordInput.value
    };

    try {
        const response = await fetch(ADMIN_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(admin)
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', 'admin');
            window.location.href = `/adminDashboard/${token}`;
        } else {
            alert("بيانات اعتماد غير صالحة!");
        }
    } catch (error) {
        alert("حدث خطأ في الاتصال بالخادم.");
    }
};

window.doctorLoginHandler = async function () {
    const emailInput = document.getElementById('doctorEmail');
    const passwordInput = document.getElementById('doctorPassword');

    if (!emailInput || !passwordInput) return;

    const doctor = {
        email: emailInput.value,
        password: passwordInput.value
    };

    try {
        const response = await fetch(DOCTOR_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(doctor)
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', 'doctor');
            window.location.href = `/doctorDashboard/${token}`;
        } else {
            alert("بيانات اعتماد غير صالحة!");
        }
    } catch (error) {
        alert("حدث خطأ في الاتصال بالخادم.");
    }
};
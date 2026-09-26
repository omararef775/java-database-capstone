function renderHeader() {
    if (window.location.pathname.endsWith("/")) {
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
    }

    const role = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");
    const headerDiv = document.getElementById("header");

    if (!headerDiv) return;

    if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
        localStorage.removeItem("userRole");
        alert("انتهت الجلسة أو تسجيل الدخول غير صالح. يرجى تسجيل الدخول مرة أخرى.");
        window.location.href = "/";
        return;
    }

    let headerContent = "";

    if (role === "admin") {
        headerContent = `
            <div class="header-container">
                <div class="logo">نظام العيادة - الإدارة</div>
                <nav class="nav-links">
                    <button id="addDocBtn" class="adminBtn">إضافة طبيب</button>
                    <a href="#" id="logoutBtn">تسجيل خروج</a>
                </nav>
            </div>
        `;
    } else if (role === "doctor") {
        headerContent = `
            <div class="header-container">
                <div class="logo">بوابة الأطباء</div>
                <nav class="nav-links">
                    <a href="/doctorDashboard">الرئيسية</a>
                    <a href="#" id="logoutBtn">تسجيل خروج</a>
                </nav>
            </div>
        `;
    } else if (role === "patient") {
        headerContent = `
            <div class="header-container">
                <div class="logo">بوابة المرضى</div>
                <nav class="nav-links">
                    <a href="#" id="loginBtn">تسجيل الدخول</a>
                    <a href="#" id="registerBtn">إنشاء حساب</a>
                </nav>
            </div>
        `;
    } else if (role === "loggedPatient") {
        headerContent = `
            <div class="header-container">
                <div class="logo">بوابة المرضى</div>
                <nav class="nav-links">
                    <a href="/patientDashboard">الرئيسية</a>
                    <a href="/patientAppointments">مواعيدي</a>
                    <a href="#" id="logoutPatientBtn">تسجيل خروج</a>
                </nav>
            </div>
        `;
    }

    headerDiv.innerHTML = headerContent;
    attachHeaderButtonListeners();
}

function attachHeaderButtonListeners() {
    const addDocBtn = document.getElementById("addDocBtn");
    if (addDocBtn) {
        addDocBtn.addEventListener("click", () => {
            if (typeof openModal === "function") {
                openModal('addDoctor');
            }
        });
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }

    const logoutPatientBtn = document.getElementById("logoutPatientBtn");
    if (logoutPatientBtn) {
        logoutPatientBtn.addEventListener("click", logoutPatient);
    }

    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            if (typeof openModal === "function") openModal('login');
        });
    }

    const registerBtn = document.getElementById("registerBtn");
    if (registerBtn) {
        registerBtn.addEventListener("click", () => {
            if (typeof openModal === "function") openModal('register');
        });
    }
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    window.location.href = "/";
}

function logoutPatient() {
    localStorage.removeItem("token");
    localStorage.setItem("userRole", "patient");
    window.location.href = "/pages/patientDashboard.html";
}

document.addEventListener("DOMContentLoaded", renderHeader);
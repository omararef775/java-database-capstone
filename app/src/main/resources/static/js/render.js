function selectRole(role) {
  if (typeof setRole === "function") setRole(role);
  const token = localStorage.getItem('token');

  if (role === "admin") {
    if (token) {
      window.location.href = `/pages/adminDashboard.html`;
    }
  } else if (role === "patient") {
    window.location.href = "/pages/patientDashboard.html";
  } else if (role === "doctor") {
    if (token) {
      window.location.href = `/pages/doctorDashboard.html`;
    }
  } else if (role === "loggedPatient") {
    window.location.href = "/pages/loggedPatientDashboard.html";
  }
}

function renderContent() {
  const role = typeof getRole === "function" ? getRole() : localStorage.getItem("userRole");
  if (!role) {
    window.location.href = "/";
    return;
  }
}
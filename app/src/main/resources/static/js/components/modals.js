export function openModal(type) {
  if (typeof type !== 'string') {
    if (type && type.target && type.target.id) {
      type = type.target.id;
    } else {
      return;
    }
  }

  let modalContent = '';

  if (type === 'addDoctor') {
    modalContent = `
             <h2>Add Doctor</h2>
             <input type="text" id="docName" placeholder="Doctor Name" class="input-field">
             <select id="docSpecialty" class="input-field select-dropdown">
                 <option value="">Specialization</option>
                 <option value="Cardiologist">Cardiologist</option>
                 <option value="Dermatologist">Dermatologist</option>
                 <option value="Neurologist">Neurologist</option>
                 <option value="Pediatrician">Pediatrician</option>
                 <option value="Orthopedist">Orthopedist</option>
                 <option value="Gynecologist">Gynecologist</option>
                 <option value="Psychiatrist">Psychiatrist</option>
                 <option value="Dentist">Dentist</option>
                 <option value="Ophthalmologist">Ophthalmologist</option>
                 <option value="ENT Specialist">ENT Specialist</option>
                 <option value="Urologist">Urologist</option>
                 <option value="Oncologist">Oncologist</option>
                 <option value="Gastroenterologist">Gastroenterologist</option>
                 <option value="General Physician">General Physician</option>
            </select>
            <input type="email" id="docEmail" placeholder="Email" class="input-field">
            <input type="password" id="docPassword" placeholder="Password" class="input-field">
            <input type="text" id="docPhone" placeholder="Mobile No." class="input-field">
            <div class="availability-container">
            <label class="availabilityLabel">Select Availability:</label>
              <div class="checkbox-group">
                  <label><input type="checkbox" name="availability" value="09:00-10:00"> 9:00 AM - 10:00 AM</label>
                  <label><input type="checkbox" name="availability" value="10:00-11:00"> 10:00 AM - 11:00 AM</label>
                  <label><input type="checkbox" name="availability" value="11:00-12:00"> 11:00 AM - 12:00 PM</label>
                  <label><input type="checkbox" name="availability" value="12:00-13:00"> 12:00 PM - 1:00 PM</label>
                  <label><input type="checkbox" name="availability" value="13:00-14:00"> 1:00 PM - 2:00 PM</label>
                  <label><input type="checkbox" name="availability" value="14:00-15:00"> 2:00 PM - 3:00 PM</label>
                  <label><input type="checkbox" name="availability" value="15:00-16:00"> 3:00 PM - 4:00 PM</label>
                  <label><input type="checkbox" name="availability" value="16:00-17:00"> 4:00 PM - 5:00 PM</label>
              </div>
            </div>
            <button class="dashboard-btn" id="saveDoctorBtn">Save</button>
        `;
  } else if (type === 'patientLogin') {
    modalContent = `
            <h2>Patient Login</h2>
            <input type="text" id="email" placeholder="Email" class="input-field">
            <input type="password" id="password" placeholder="Password" class="input-field">
            <button class="dashboard-btn" id="loginBtn">Login</button>
        `;
  } else if (type === "patientSignup") {
    modalContent = `
            <h2>Patient Signup</h2>
            <input type="text" id="name" placeholder="Name" class="input-field">
            <input type="email" id="email" placeholder="Email" class="input-field">
            <input type="password" id="password" placeholder="Password" class="input-field">
            <input type="text" id="phone" placeholder="Phone" class="input-field">
            <input type="text" id="address" placeholder="Address" class="input-field">
            <button class="dashboard-btn" id="signupBtn">Signup</button>
        `;
  } else if (type === 'adminLogin') {
    modalContent = `
            <h2>Admin Login</h2>
            <input type="text" id="adminUsername" placeholder="Username" class="input-field">
            <input type="password" id="adminPassword" placeholder="Password" class="input-field">
            <button class="dashboard-btn" id="adminLoginBtn">Login</button>
        `;
  } else if (type === 'doctorLogin') {
    modalContent = `
            <h2>Doctor Login</h2>
            <input type="email" id="doctorEmail" placeholder="Email" class="input-field">
            <input type="password" id="doctorPassword" placeholder="Password" class="input-field">
            <button class="dashboard-btn" id="doctorLoginBtn">Login</button>
        `;
  }

  document.getElementById('modal-body').innerHTML = modalContent;
  document.getElementById('modal').style.display = 'block';

  const closeBtn = document.getElementById('closeModal');
  if (closeBtn) {
    closeBtn.onclick = () => {
      document.getElementById('modal').style.display = 'none';
    };
  }

  if (type === "patientSignup") {
    const btn = document.getElementById("signupBtn");
    if (btn) btn.addEventListener("click", window.signupPatient || function(){});
  }
  if (type === "patientLogin") {
    const btn = document.getElementById("loginBtn");
    if (btn) btn.addEventListener("click", window.loginPatient || function(){});
  }
  if (type === 'addDoctor') {
    const btn = document.getElementById('saveDoctorBtn');
    if (btn) btn.addEventListener('click', window.adminAddDoctor || function(){});
  }
  if (type === 'adminLogin') {
    const btn = document.getElementById('adminLoginBtn');
    if (btn) btn.addEventListener('click', window.adminLoginHandler || function(){});
  }
  if (type === 'doctorLogin') {
    const btn = document.getElementById('doctorLoginBtn');
    if (btn) btn.addEventListener('click', window.doctorLoginHandler || function(){});
  }
}

window.openModal = openModal;
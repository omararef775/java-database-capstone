# Smart Clinic Management System - User Stories

## 1. Admin User Stories

**Title: Admin Login**
_As an Admin, I want to login to the portal using my username and password, so that I can manage the platform securely._
**Acceptance Criteria:**
1. System validates credentials against the database.
2. Successful login redirects to Admin Dashboard.
**Priority:** High
**Story Points:** 3
**Notes:**
- Ensure passwords are hashed using BCrypt. Rate limit login attempts to prevent brute force attacks.

**Title: Admin Logout**
_As an Admin, I want to logout from the portal, so that I can protect system access._
**Acceptance Criteria:**
1. Clicking logout destroys the current session/JWT token.
2. User is redirected to the login page.
**Priority:** High
**Story Points:** 1
**Notes:**
- Clear JWT from local storage/cookies on the client side.

**Title: Add Doctor**
_As an Admin, I want to add doctors to the portal, so that patients can book appointments with them._
**Acceptance Criteria:**
1. Admin can fill a form with doctor details (name, specialty, email, etc.).
2. Data is saved correctly in the MySQL database.
**Priority:** High
**Story Points:** 5
**Notes:**
- Validate that the doctor's email is unique before saving.

**Title: Delete Doctor**
_As an Admin, I want to delete a doctor's profile from the portal, so that inactive doctors are removed._
**Acceptance Criteria:**
1. Admin can click a delete button next to a doctor's profile.
2. System asks for confirmation before deleting.
**Priority:** Medium
**Story Points:** 3
**Notes:**
- Use "Soft Delete" (change status to inactive) instead of hard delete to preserve old appointment records.

**Title: View Monthly Statistics**
_As an Admin, I want to trigger a stored procedure in MySQL to get the number of appointments per month, so that I can track platform usage._
**Acceptance Criteria:**
1. Admin clicks a button to view stats.
2. System executes a MySQL stored procedure and displays the results.
**Priority:** Low
**Story Points:** 5
**Notes:**
- Ensure the stored procedure is optimized for read performance.


---

## 2. Patient User Stories

**Title: Browse Doctors (Guest View)**
_As a Patient, I want to view a list of doctors without logging in, so that I can explore options before registering._
**Acceptance Criteria:**
1. Public endpoint displays available doctors and their specialties.
2. No authentication is required to view this page.
**Priority:** Medium
**Story Points:** 3
**Notes:**
- Add basic pagination if the list of doctors exceeds 20.

**Title: Patient Registration**
_As a Patient, I want to register using my email and password, so that I can book appointments._
**Acceptance Criteria:**
1. System validates email format and password strength.
2. A new patient record is created in the database.
**Priority:** High
**Story Points:** 5
**Notes:**
- Password must be at least 8 characters with numbers and special symbols.

**Title: Patient Login**
_As a Patient, I want to login to the portal, so that I can manage my bookings._
**Acceptance Criteria:**
1. System authenticates credentials and generates a secure session/JWT.
**Priority:** High
**Story Points:** 3
**Notes:**
- Show a generic "Invalid credentials" error to avoid user enumeration.

**Title: Patient Logout**
_As a Patient, I want to logout from the portal, so that I can secure my account._
**Acceptance Criteria:**
1. Session is terminated upon clicking logout.
**Priority:** High
**Story Points:** 1
**Notes:**
- Redirect to the guest homepage after logout.

**Title: Book Appointment**
_As a Patient, I want to book a 1-hour appointment to consult with a doctor, so that I can get medical advice._
**Acceptance Criteria:**
1. Patient selects a doctor, date, and available time slot.
2. System prevents double-booking the same slot.
**Priority:** High
**Story Points:** 8
**Notes:**
- Implement a database lock or transaction to prevent race conditions during booking.

**Title: View Upcoming Appointments**
_As a Patient, I want to view my upcoming appointments, so that I can prepare accordingly._
**Acceptance Criteria:**
1. System displays a list of future appointments linked to the logged-in patient ID.
**Priority:** Medium
**Story Points:** 3
**Notes:**
- Sort appointments chronologically (closest date first).


---

## 3. Doctor User Stories

**Title: Doctor Login**
_As a Doctor, I want to login to the portal, so that I can manage my appointments._
**Acceptance Criteria:**
1. Doctor is authenticated and redirected to the Doctor Dashboard.
**Priority:** High
**Story Points:** 3
**Notes:**
- Doctors should only be able to login if their account status is "Active".

**Title: Doctor Logout**
_As a Doctor, I want to logout from the portal, so that I can protect my data._
**Acceptance Criteria:**
1. Active session is securely terminated.
**Priority:** High
**Story Points:** 1
**Notes:**
- Similar implementation to Patient/Admin logout.

**Title: View Appointment Calendar**
_As a Doctor, I want to view my appointment calendar, so that I can stay organized._
**Acceptance Criteria:**
1. System displays appointments mapped to the doctor's ID.
**Priority:** High
**Story Points:** 5
**Notes:**
- Filter out cancelled appointments from the default view.

**Title: Set Unavailability**
_As a Doctor, I want to specify my unavailability, so that patients only see open slots._
**Acceptance Criteria:**
1. Doctor can block specific dates/hours.
2. Blocked slots do not appear for patients during booking.
**Priority:** Medium
**Story Points:** 5
**Notes:**
- Validate that the doctor cannot block a slot that already has a confirmed booking.

**Title: Update Profile**
_As a Doctor, I want to update my profile with specialty and contact info, so that patients have up-to-date details._
**Acceptance Criteria:**
1. Doctor can edit their own information.
2. Database is updated successfully.
**Priority:** Low
**Story Points:** 3
**Notes:**
- Email updates might require re-verification (optional based on final scope).

**Title: View Patient Details**
_As a Doctor, I want to view patient details for upcoming appointments, so that I am prepared for the consultation._
**Acceptance Criteria:**
1. Doctor can click on an appointment to see the patient's basic info and past prescriptions.
**Priority:** High
**Story Points:** 5
**Notes:**
- Fetch relational data from MySQL (Patient Info) and document data from MongoDB (Prescriptions) via the Service layer.
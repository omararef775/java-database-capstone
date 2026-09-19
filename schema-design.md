# Smart Clinic - Database Schema Design

## 1. MySQL Database Design (Relational Data)
MySQL is used for highly structured data where relationships and data integrity are strictly enforced.

### Table 1: admin
Stores platform administrators' credentials.
- **id**: INT, Primary Key, Auto Increment
- **username**: VARCHAR(50), UNIQUE, NOT NULL
- **password**: VARCHAR(255), NOT NULL (Hashed)
- **email**: VARCHAR(100), UNIQUE, NOT NULL
- **created_at**: TIMESTAMP, Default CURRENT_TIMESTAMP

### Table 2: patients
Stores patient profiles and contact information.
- **id**: INT, Primary Key, Auto Increment
- **first_name**: VARCHAR(50), NOT NULL
- **last_name**: VARCHAR(50), NOT NULL
- **email**: VARCHAR(100), UNIQUE, NOT NULL
- **password**: VARCHAR(255), NOT NULL
- **phone**: VARCHAR(20), UNIQUE
- **date_of_birth**: DATE
- **created_at**: TIMESTAMP, Default CURRENT_TIMESTAMP

### Table 3: doctors
Stores doctor profiles. Uses 'is_active' for soft deletion to preserve past appointment history.
- **id**: INT, Primary Key, Auto Increment
- **first_name**: VARCHAR(50), NOT NULL
- **last_name**: VARCHAR(50), NOT NULL
- **specialty**: VARCHAR(100), NOT NULL
- **email**: VARCHAR(100), UNIQUE, NOT NULL
- **phone**: VARCHAR(20)
- **is_active**: BOOLEAN, Default TRUE (Used for Soft Delete)

### Table 4: appointments
Links patients and doctors. Enforces logic to prevent double bookings.
- **id**: INT, Primary Key, Auto Increment
- **doctor_id**: INT, Foreign Key → doctors(id) (ON DELETE RESTRICT)
- **patient_id**: INT, Foreign Key → patients(id) (ON DELETE CASCADE)
- **appointment_date**: DATE, NOT NULL
- **appointment_time**: TIME, NOT NULL
- **status**: INT, NOT NULL Default 0 (0 = Scheduled, 1 = Completed, 2 = Cancelled)
- **Constraint**: UNIQUE(doctor_id, appointment_date, appointment_time) -> *Prevents double booking a doctor at the same time.*

---

## 2. MongoDB Collection Design (Unstructured/Flexible Data)
MongoDB is used for dynamic data like prescriptions and medical notes, which may vary significantly in length and structure.

### Collection: prescriptions
We store relationships using `patientId` and `doctorId` rather than embedding the entire user objects. This keeps the document lightweight and prevents data inconsistency if a patient's name changes in MySQL.

**JSON Document Example:**
```json
{
  "_id": { "$oid": "64abc123456789def0123456" },
  "appointmentId": 1052,
  "patientId": 42,
  "doctorId": 7,
  "diagnosis": "Acute Bronchitis",
  "medications": [
    {
      "name": "Amoxicillin",
      "dosage": "500mg",
      "frequency": "Every 8 hours",
      "duration": "7 days",
      "instructions": "Take after meals to avoid stomach upset."
    },
    {
      "name": "Ibuprofen",
      "dosage": "400mg",
      "frequency": "Every 6 hours",
      "duration": "As needed",
      "instructions": "Take for fever or pain."
    }
  ],
  "doctorNotes": "Patient advised to drink plenty of fluids and rest. Follow up in one week if symptoms persist.",
  "issueDate": "2023-11-15T14:30:00Z"
}
package com.project.back_end.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Min;

@Document(collection = "prescriptions")
public class Prescription {

    @Id
    private String id;

    @NotNull
    @Size(min = 3, max = 100)
    private String patientName;

    @NotNull
    private Long appointmentId;

    @NotNull
    @Size(min = 3, max = 100)
    private String medication;

    @NotNull
    @Size(min = 3, max = 20)
    private String dosage;

    @Size(max = 200)
    private String doctorNotes;

    // --- الحقل الجديد ---
    @Min(value = 0, message = "Refill count cannot be negative")
    private Integer refillCount;

    public Prescription() {}

    public Prescription(String patientName, Long appointmentId, String medication, String dosage, String doctorNotes, Integer refillCount) {
        this.patientName = patientName;
        this.appointmentId = appointmentId;
        this.medication = medication;
        this.dosage = dosage;
        this.doctorNotes = doctorNotes;
        this.refillCount = refillCount;
    }

    // --- Getters and Setters ---
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }
    public Long getAppointmentId() { return appointmentId; }
    public void setAppointmentId(Long appointmentId) { this.appointmentId = appointmentId; }
    public String getMedication() { return medication; }
    public void setMedication(String medication) { this.medication = medication; }
    public String getDosage() { return dosage; }
    public void setDosage(String dosage) { this.dosage = dosage; }
    public String getDoctorNotes() { return doctorNotes; }
    public void setDoctorNotes(String doctorNotes) { this.doctorNotes = doctorNotes; }
    public Integer getRefillCount() { return refillCount; }
    public void setRefillCount(Integer refillCount) { this.refillCount = refillCount; }
}
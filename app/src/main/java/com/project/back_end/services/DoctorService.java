package com.project.back_end.services;

import com.project.back_end.DTO.Login;
import com.project.back_end.models.Appointment;
import com.project.back_end.models.Doctor;
import com.project.back_end.repo.AppointmentRepository;
import com.project.back_end.repo.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;
    private final TokenService tokenService;

    @Autowired
    public DoctorService(DoctorRepository doctorRepository, AppointmentRepository appointmentRepository, TokenService tokenService) {
        this.doctorRepository = doctorRepository;
        this.appointmentRepository = appointmentRepository;
        this.tokenService = tokenService;
    }

    @Transactional
    public List<String> getDoctorAvailability(Long doctorId, LocalDate date) {
        Optional<Doctor> doctorOpt = doctorRepository.findById(doctorId);
        if (!doctorOpt.isPresent() || doctorOpt.get().getAvailableTimes() == null) {
            return new ArrayList<>();
        }

        List<String> availableTimes = new ArrayList<>(doctorOpt.get().getAvailableTimes());
        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.atTime(LocalTime.MAX);

        List<Appointment> bookedAppointments = appointmentRepository.findByDoctorIdAndAppointmentTimeBetween(doctorId, start, end);

        List<String> bookedTimes = bookedAppointments.stream()
                .map(a -> a.getAppointmentTime().toLocalTime().toString())
                .collect(Collectors.toList());

        availableTimes.removeIf(time -> bookedTimes.stream().anyMatch(b -> b.startsWith(time)));
        return availableTimes;
    }

    @Transactional
    public int saveDoctor(Doctor doctor) {
        try {
            if (doctorRepository.findByEmail(doctor.getEmail()) != null) {
                return -1;
            }
            doctorRepository.save(doctor);
            return 1;
        } catch (Exception e) {
            return 0;
        }
    }

    @Transactional
    public int updateDoctor(Doctor doctor) {
        try {
            if (!doctorRepository.existsById(doctor.getId())) {
                return -1;
            }
            doctorRepository.save(doctor);
            return 1;
        } catch (Exception e) {
            return 0;
        }
    }

    @Transactional
    public List<Doctor> getDoctors() {
        return doctorRepository.findAll();
    }

    @Transactional
    public int deleteDoctor(long id) {
        try {
            if (!doctorRepository.existsById(id)) {
                return -1;
            }
            appointmentRepository.deleteAllByDoctorId(id);
            doctorRepository.deleteById(id);
            return 1;
        } catch (Exception e) {
            return 0;
        }
    }

    @Transactional
    public ResponseEntity<Map<String, String>> validateDoctor(Login login) {
        Map<String, String> response = new HashMap<>();
        try {
            Doctor doctor = doctorRepository.findByEmail(login.getEmail());
            if (doctor != null && doctor.getPassword().equals(login.getPassword())) {
                String token = tokenService.generateToken(doctor.getEmail(), "doctor");
                response.put("token", token);
                return ResponseEntity.ok(response);
            } else {
                response.put("error", "Invalid credentials");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } catch (Exception e) {
            response.put("error", "Error validating doctor login");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @Transactional
    public Map<String, Object> findDoctorByName(String name) {
        Map<String, Object> map = new HashMap<>();
        map.put("doctors", doctorRepository.findByNameLike(name));
        return map;
    }

    @Transactional
    public Map<String, Object> filterDoctorsByNameSpecilityandTime(String name, String specialty, String amOrPm) {
        List<Doctor> doctors = doctorRepository.findByNameContainingIgnoreCaseAndSpecialtyIgnoreCase(name, specialty);
        doctors = filterDoctorByTime(doctors, amOrPm);
        Map<String, Object> map = new HashMap<>();
        map.put("doctors", doctors);
        return map;
    }

    @Transactional
    public Map<String, Object> filterDoctorByNameAndTime(String name, String amOrPm) {
        List<Doctor> doctors = doctorRepository.findByNameLike(name);
        doctors = filterDoctorByTime(doctors, amOrPm);
        Map<String, Object> map = new HashMap<>();
        map.put("doctors", doctors);
        return map;
    }

    @Transactional
    public Map<String, Object> filterDoctorByNameAndSpecility(String name, String specilty) {
        List<Doctor> doctors = doctorRepository.findByNameContainingIgnoreCaseAndSpecialtyIgnoreCase(name, specilty);
        Map<String, Object> map = new HashMap<>();
        map.put("doctors", doctors);
        return map;
    }

    @Transactional
    public Map<String, Object> filterDoctorByTimeAndSpecility(String specilty, String amOrPm) {
        List<Doctor> doctors = doctorRepository.findBySpecialtyIgnoreCase(specilty);
        doctors = filterDoctorByTime(doctors, amOrPm);
        Map<String, Object> map = new HashMap<>();
        map.put("doctors", doctors);
        return map;
    }

    @Transactional
    public Map<String, Object> filterDoctorBySpecility(String specilty) {
        List<Doctor> doctors = doctorRepository.findBySpecialtyIgnoreCase(specilty);
        Map<String, Object> map = new HashMap<>();
        map.put("doctors", doctors);
        return map;
    }

    @Transactional
    public Map<String, Object> filterDoctorsByTime(String amOrPm) {
        List<Doctor> doctors = doctorRepository.findAll();
        doctors = filterDoctorByTime(doctors, amOrPm);
        Map<String, Object> map = new HashMap<>();
        map.put("doctors", doctors);
        return map;
    }

    private List<Doctor> filterDoctorByTime(List<Doctor> doctors, String amOrPm) {
        return doctors.stream().filter(doctor -> {
            if (doctor.getAvailableTimes() == null) return false;
            return doctor.getAvailableTimes().stream().anyMatch(time -> {
                try {
                    LocalTime lt = LocalTime.parse(time);
                    if ("AM".equalsIgnoreCase(amOrPm)) return lt.getHour() < 12;
                    if ("PM".equalsIgnoreCase(amOrPm)) return lt.getHour() >= 12;
                    return false;
                } catch (Exception e) {
                    return time.toUpperCase().contains(amOrPm.toUpperCase());
                }
            });
        }).collect(Collectors.toList());
    }
}
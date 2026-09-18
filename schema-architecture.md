# Smart Clinic Management System - Architecture Design

## Section 1: Architecture Summary
This Spring Boot-based application utilizes both MVC and REST controllers to handle different client needs. Thymeleaf templates are strictly used for rendering the Admin and Doctor dashboards on the server-side, while REST APIs serve JSON data for all other modules (such as Appointments, Patient Dashboard, and Patient Records). The system interacts with a dual-database architecture: MySQL handles highly structured relational data (Patients, Doctors, Appointments, and Admins) via Spring Data JPA, whereas MongoDB handles flexible, document-based unstructured data (Prescriptions) via Spring Data MongoDB. All incoming requests are routed through controllers to a centralized Service Layer containing the core business logic, which then delegates data access to the appropriate repositories. 

## Section 2: Numbered Flow of Data and Control
Based on the reference architecture diagram, the data flow follows these 7 key steps:

1. **User Interface Interaction:** The user accesses either the Thymeleaf-based dashboards (AdminDashboard, DoctorDashboard) or the REST API modules (Appointments, PatientDashboard, PatientRecord).
2. **Controller Routing:** The interaction is routed to the appropriate backend controller. Dashboard requests hit the Thymeleaf Controllers, while JSON API requests hit the REST Controllers.
3. **Service Layer Execution:** The controllers delegate the processing and business logic to the centralized Service Layer.
4. **Repository Delegation:** The Service Layer determines the required data and uses either the MySQL Repositories (for relational data) or the MongoDB Repository (for unstructured document data).
5. **Database Access:** The repositories interact directly with their underlying databases (MySQL Database for structured entities, MongoDB Database for prescriptions).
6. **Model Binding:** Data retrieved from the databases is bound to Java models. MySQL data becomes JPA Entities (Patient, Doctor, Appointment, Admin), and MongoDB data becomes Document Models (Prescription).
7. **Response Delivery:** The populated models are returned back up the chain to the controllers, which then render the dynamic HTML (Thymeleaf) or serialize the data into JSON (REST API) to be sent back to the user.
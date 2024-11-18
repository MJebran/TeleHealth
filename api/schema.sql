-- Drop Tables if they exist (Drop in reverse order of dependencies)
DROP TABLE IF EXISTS Payments;
DROP TABLE IF EXISTS Files;
DROP TABLE IF EXISTS Responses;
DROP TABLE IF EXISTS Cases;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Roles;
DROP TABLE IF EXISTS Agreements;
DROP TABLE IF EXISTS CaseStatus;

-- Create Agreements Table to store agreement versions and text
CREATE TABLE Agreements (
    id SERIAL PRIMARY KEY,
    version VARCHAR(10) NOT NULL,
    agreement_text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create Roles Table
CREATE TABLE Roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(20) NOT NULL UNIQUE
);

-- Create CaseStatus Table (Enum for case statuses)
CREATE TABLE CaseStatus (
    id SERIAL PRIMARY KEY,
    status_name VARCHAR(20) NOT NULL UNIQUE
);

-- Insert Case Status Workflow into CaseStatus Table
INSERT INTO CaseStatus (status_name) VALUES 
('Open'),           -- Case created by scribe intern
('Draft'),          -- Case is a draft, editable by the scribe
('Ready for Doctor'), -- Case is ready for doctor review
('In Progress'),    -- Doctor accepted and working on the case
('Completed');      -- Case is completed by patient, doctor, or scribe

-- Create Users Table with full_name, gender, approval status, agreement acceptance, and agreement reference
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100),
    role_id INT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    verified BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Other')),
    has_accepted_agreement BOOLEAN DEFAULT FALSE,
    agreement_id INT,
    FOREIGN KEY (role_id) REFERENCES Roles(id) ON DELETE SET NULL,
    FOREIGN KEY (agreement_id) REFERENCES Agreements(id) ON DELETE SET NULL
);

-- Create Cases Table with scribe_id, symptoms, history, and status references
CREATE TABLE Cases (
    id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL,
    scribe_id INT,
    doctor_id INT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    symptoms TEXT,
    history TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    status_id INT DEFAULT 1, -- Defaults to 'Open' status
    FOREIGN KEY (status_id) REFERENCES CaseStatus(id),
    FOREIGN KEY (patient_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (scribe_id) REFERENCES Users(id) ON DELETE SET NULL,
    FOREIGN KEY (doctor_id) REFERENCES Users(id) ON DELETE SET NULL
);

-- Create Responses Table with optional recommendation field
CREATE TABLE Responses (
    id SERIAL PRIMARY KEY,
    case_id INT NOT NULL,
    doctor_id INT NOT NULL,
    response TEXT NOT NULL,
    recommendation TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES Cases(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES Users(id) ON DELETE SET NULL
);

-- Create Files Table with file_type column
CREATE TABLE Files (
    id SERIAL PRIMARY KEY,
    case_id INT NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    file_type VARCHAR(20) CHECK (file_type IN ('Report', 'Image', 'Other')),
    uploaded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES Cases(id) ON DELETE CASCADE
);

-- Create Payments Table for patient payments
CREATE TABLE Payments (
    id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(20) CHECK (payment_method IN ('SIM Credit', 'Credit Card', 'Debit Card')),
    payment_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- -- Insert Data into Agreements Table
-- INSERT INTO Agreements (version, agreement_text) VALUES
-- ('1.0', 'This is the initial version of the user agreement terms and conditions.'),
-- ('1.1', 'Updated terms and conditions for TeleHealth app usage.'),
-- ('2.0', 'Latest terms of service agreement with new privacy policies.');

-- -- Insert Data into Roles Table
-- INSERT INTO Roles (role_name) VALUES 
-- ('Doctor'),
-- ('Patient'),
-- ('Admin'),
-- ('Scribe Intern');

-- -- Insert Data into Users Table with references to agreement versions
-- INSERT INTO Users (username, password, email, full_name, role_id, verified, is_approved, gender, has_accepted_agreement, agreement_id, created_at) VALUES
-- ('doctor_jane', 'hashedpassword1', 'doctor_jane@example.com', 'Dr. Jane Smith', 1, TRUE, TRUE, 'Female', TRUE, 1, NOW()),
-- ('patient_john', 'hashedpassword2', 'patient_john@example.com', 'John Doe', 2, TRUE, TRUE, 'Male', TRUE, 2, NOW()),
-- ('admin_mark', 'hashedpassword3', 'admin_mark@example.com', 'Mark Robinson', 3, TRUE, TRUE, 'Male', TRUE, 3, NOW()),
-- ('scribe_anna', 'hashedpassword4', 'scribe_anna@example.com', 'Anna Lee', 4, TRUE, FALSE, 'Female', TRUE, 1, NOW()),
-- ('patient_sara', 'hashedpassword5', 'patient_sara@example.com', 'Sara Miller', 2, TRUE, TRUE, 'Female', TRUE, 2, NOW());

-- -- Insert Data into Cases Table with different statuses
-- INSERT INTO Cases (patient_id, scribe_id, doctor_id, title, description, symptoms, history, status_id, created_at) VALUES
-- (2, 4, 1, 'Severe Cough', 'Persistent cough lasting for weeks', 'Cough, shortness of breath', 'Smoker, history of asthma', 1, NOW()), -- Open
-- (5, 4, 1, 'Lower Back Pain', 'Chronic lower back pain', 'Pain, stiffness in lower back', 'Previous injury from sports', 3, NOW()), -- Ready for Doctor
-- (5, 4, 1, 'Migraine Headaches', 'Frequent migraines', 'Headaches, nausea, sensitivity to light', 'Migraines run in family', 4, NOW()); -- In Progress

-- -- Insert Data into Responses Table
-- INSERT INTO Responses (case_id, doctor_id, response, recommendation) VALUES
-- (1, 1, 'Prescribed cough suppressant and recommended chest X-ray', 'Follow-up if symptoms persist.'),
-- (2, 1, 'Advised physical therapy and ergonomic adjustments for work.', NULL),
-- (3, 1, 'Suggested keeping a headache diary and referred to a neurologist.', 'Monitor triggers and manage stress levels.');

-- -- Insert Data into Files Table
-- INSERT INTO Files (case_id, file_path, file_type) VALUES
-- (1, '/uploads/case_1/chest_xray_report.pdf', 'Report'),
-- (2, '/uploads/case_2/physical_therapy_recommendation.pdf', 'Report'),
-- (3, '/uploads/case_3/migraine_diary_template.pdf', 'Report');

-- -- Insert Data into Payments Table
-- INSERT INTO Payments (patient_id, amount, payment_method) VALUES
-- (2, 50.00, 'Credit Card'),
-- (5, 30.00, 'Debit Card'),
-- (5, 20.00, 'SIM Credit');
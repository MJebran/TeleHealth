-- Create Roles Table
CREATE TABLE Roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(20) NOT NULL UNIQUE
);

-- Create Users Table
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role_id INT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES Roles(id) ON DELETE SET NULL
);

-- Create Cases Table
CREATE TABLE Cases (
    id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'Open' CHECK (status IN ('Open', 'Closed', 'Pending')),
    FOREIGN KEY (patient_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Create Responses Table
CREATE TABLE Responses (
    id SERIAL PRIMARY KEY,
    case_id INT NOT NULL,
    doctor_id INT NOT NULL,
    response TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES Cases(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES Users(id) ON DELETE SET NULL
);

-- Create Files Table
CREATE TABLE Files (
    id SERIAL PRIMARY KEY,
    case_id INT NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES Cases(id) ON DELETE CASCADE
);




-- Drop Files Table (depends on Cases)
-- DROP TABLE IF EXISTS Files;

-- -- Drop Responses Table (depends on Cases and Users)
-- DROP TABLE IF EXISTS Responses;

-- -- Drop Cases Table (depends on Users)
-- DROP TABLE IF EXISTS Cases;

-- -- Drop Users Table (depends on Roles)
-- DROP TABLE IF EXISTS Users;

-- -- Drop Roles Table (no dependencies)
-- DROP TABLE IF EXISTS Roles;

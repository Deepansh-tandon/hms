CREATE DATABASE IF NOT EXISTS HMS;
USE HMS;

-- Hospitals
CREATE TABLE hospital (
  hospital_id INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  address     VARCHAR(255),
  phone       VARCHAR(20)
);

-- Departments in each hospital
CREATE TABLE department (
  department_id INT AUTO_INCREMENT PRIMARY KEY,
  hospital_id   INT NOT NULL,
  name          VARCHAR(100) NOT NULL,
  description   VARCHAR(255),
  FOREIGN KEY (hospital_id) REFERENCES hospital(hospital_id)
);

-- Staff members: doctors, nurses, admins
CREATE TABLE staff (
  staff_id      INT AUTO_INCREMENT PRIMARY KEY,
  department_id INT NOT NULL,
  first_name    VARCHAR(50) NOT NULL,
  last_name     VARCHAR(50) NOT NULL,
  date_of_birth DATE,
  gender        CHAR(1),
  phone         VARCHAR(20),
  address       VARCHAR(255),
  role          VARCHAR(50) NOT NULL,
  salary        DECIMAL(10,2),
  email         VARCHAR(100) UNIQUE NOT NULL,
  password      VARCHAR(255) NOT NULL,
  hire_date     DATE,
  FOREIGN KEY (department_id) REFERENCES department(department_id)
);

-- Patients
CREATE TABLE patient (
  patient_id        INT AUTO_INCREMENT PRIMARY KEY,
  first_name        VARCHAR(50) NOT NULL,
  last_name         VARCHAR(50) NOT NULL,
  date_of_birth     DATE NOT NULL,
  gender            CHAR(1) NOT NULL,
  phone             VARCHAR(20),
  address           VARCHAR(255),
  email             VARCHAR(100) UNIQUE NOT NULL,
  password          VARCHAR(255) NOT NULL,
  emergency_contact VARCHAR(50),
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointments
CREATE TABLE appointment (
  appointment_id   INT AUTO_INCREMENT PRIMARY KEY,
  patient_id       INT NOT NULL,
  staff_id         INT NOT NULL,
  appointment_date DATETIME NOT NULL,
  reason           VARCHAR(255),
  status           VARCHAR(50),
  FOREIGN KEY (patient_id) REFERENCES patient(patient_id),
  FOREIGN KEY (staff_id)   REFERENCES staff(staff_id)
);

-- Medicines in stock
CREATE TABLE medicine (
  medicine_id    INT AUTO_INCREMENT PRIMARY KEY,
  name           VARCHAR(100) NOT NULL,
  manufacturer   VARCHAR(100),
  cost_per_unit  DECIMAL(10,2),
  stock_quantity INT
);

-- Prescriptions written during appointments
CREATE TABLE prescription (
  prescription_id INT AUTO_INCREMENT PRIMARY KEY,
  appointment_id  INT NOT NULL,
  staff_id        INT NOT NULL,
  issue_date      DATETIME NOT NULL,
  notes           TEXT,
  FOREIGN KEY (appointment_id) REFERENCES appointment(appointment_id),
  FOREIGN KEY (staff_id)       REFERENCES staff(staff_id)
);

-- Link each prescription to medicines
CREATE TABLE prescription_detail (
  prescription_id INT NOT NULL,
  medicine_id     INT NOT NULL,
  dosage          VARCHAR(50),
  frequency       VARCHAR(50),
  quantity        INT,
  PRIMARY KEY (prescription_id, medicine_id),
  FOREIGN KEY (prescription_id) REFERENCES prescription(prescription_id),
  FOREIGN KEY (medicine_id)     REFERENCES medicine(medicine_id)
);

-- Billing records
CREATE TABLE bill (
  bill_id        INT AUTO_INCREMENT PRIMARY KEY,
  patient_id     INT NOT NULL,
  appointment_id INT,
  bill_date      DATETIME NOT NULL,
  total_amount   DECIMAL(10,2) NOT NULL,
  status         VARCHAR(50),
  FOREIGN KEY (patient_id)     REFERENCES patient(patient_id),
  FOREIGN KEY (appointment_id) REFERENCES appointment(appointment_id)
);

-- Payments made against bills
CREATE TABLE payment (
  payment_id       INT AUTO_INCREMENT PRIMARY KEY,
  bill_id          INT NOT NULL,
  payment_date     DATETIME NOT NULL,
  amount_paid      DECIMAL(10,2) NOT NULL,
  payment_method   VARCHAR(50),
  reference_number VARCHAR(50),
  FOREIGN KEY (bill_id) REFERENCES bill(bill_id)
);

ALTER TABLE medicines
  ADD COLUMN last_modified TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP;

DELIMITER $$

CREATE PROCEDURE sp_GetAllMedicines()
BEGIN
  SELECT * FROM medicines;
END $$

CREATE PROCEDURE sp_GetMedicineById(IN p_id INT)
BEGIN
  SELECT * FROM medicines WHERE medicine_id = p_id;
END $$

CREATE PROCEDURE sp_CreateMedicine(
  IN  p_name        VARCHAR(255),
  IN  p_description TEXT,
  IN  p_price       DECIMAL(10,2),
  IN  p_stock       INT,
  OUT p_new_id      INT
)
BEGIN
  INSERT INTO medicines(name, description, price, stock)
    VALUES(p_name, p_description, p_price, p_stock);
  SET p_new_id = LAST_INSERT_ID();
END $$

CREATE PROCEDURE sp_UpdateMedicine(
  IN  p_id          INT,
  IN  p_name        VARCHAR(255),
  IN  p_description TEXT,
  IN  p_price       DECIMAL(10,2),
  IN  p_stock       INT,
  OUT p_rows        INT
)
BEGIN
  UPDATE medicines
    SET name        = p_name,
        description = p_description,
        price       = p_price,
        stock       = p_stock
  WHERE medicine_id = p_id;
  SET p_rows = ROW_COUNT();
END $$

CREATE PROCEDURE sp_DeleteMedicine(
  IN  p_id     INT,
  OUT p_rows   INT
)
BEGIN
  DELETE FROM medicines WHERE medicine_id = p_id;
  SET p_rows = ROW_COUNT();
END $$

DELIMITER $$

CREATE TRIGGER trg_Medicines_Update
BEFORE UPDATE ON medicines
FOR EACH ROW
BEGIN
  SET NEW.last_updated = CURRENT_TIMESTAMP;
END $$

DELIMITER ;


CREATE PROCEDURE sp_ProcessLowStock()
BEGIN
  DECLARE done       INT DEFAULT 0;
  DECLARE v_id       INT;
  DECLARE v_name     VARCHAR(255);
  DECLARE v_stock    INT;

  DECLARE low_cur CURSOR FOR
    SELECT medicine_id, name, stock
      FROM medicines
     WHERE stock < 10;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

  OPEN low_cur;
  read_loop: LOOP
    FETCH low_cur INTO v_id, v_name, v_stock;
    IF done = 1 THEN 
      LEAVE read_loop;
    END IF;
    SELECT CONCAT('LOW STOCK: ', v_name, ' (ID=', v_id, ') has only ', v_stock, ' left') AS alert_message;
  END LOOP;
  CLOSE low_cur;
END $$

DELIMITER ;

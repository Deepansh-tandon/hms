import db from '../utils/db.js'

class Appointment {
  static async getAllappointments() {
    try {
      const [rows] = await db.query('SELECT * FROM appointment');
      return rows;
    } catch (error) {
      console.error('Error in getAllappointment:', error);
      throw new Error('Error fetching appointment');
    }
  }

  static async getAppointmentById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM appointment WHERE appointment_id = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error in getAppointmentById:', error);
      throw new Error('Error fetching appointment');
    }
  }

  static async getappointmentByPatient(patientId) {
    try {
      const [rows] = await db.query('SELECT * FROM appointment WHERE patient_id = ?', [patientId]);
      return rows;
    } catch (error) {
      console.error('Error in getappointmentByPatient:', error);
      throw new Error('Error fetching patient appointment');
    }
  }

  static async getappointmentByStaff(staffId) {
    try {
      const [rows] = await db.query('SELECT * FROM appointment WHERE staff_id = ?', [staffId]);
      return rows;
    } catch (error) {
      console.error('Error in getappointmentByStaff:', error);
      throw new Error('Error fetching staff appointment');
    }
  }

  static async createAppointment(data) {
    try {
      const { patient_id, staff_id, appointment_date,reason, status } = data;
      

      const [result] = await db.query(
        'INSERT INTO appointment (patient_id, staff_id, appointment_date,reason, status) VALUES (?, ?, ?,?, ?)',
        [patient_id, staff_id, appointment_date, reason,status]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error in createAppointment:', error);
      throw new Error('Error creating appointment');
    }
  }

  static async updateAppointment(id, data) {
    try {
      const { patient_id, staff_id, appointment_date, reason,status } = data;

      const [result] = await db.query(
        'UPDATE appointment SET patient_id = ?, staff_id = ?, appointment_date = ?,reason=?, status = ? WHERE appointment_id = ?',
        [patient_id, staff_id, appointment_date,reason, status, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error in updateAppointment:', error);
      throw new Error('Error updating appointment');
    }
  }

  static async deleteAppointment(id) {
    try {
      const [result] = await db.query('DELETE FROM appointment WHERE appointment_id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error in deleteAppointment:', error);
      throw new Error('Error deleting appointment');
    }
  }

  static async getDetailedAppointments() {
    try {
      const [rows] = await db.query(`
        SELECT 
          a.appointment_id,
          a.appointment_date,
          a.reason,
          a.status,
          p.first_name as patient_first_name,
          p.last_name as patient_last_name,
          s.first_name as doctor_first_name,
          s.last_name as doctor_last_name,
          d.name as department_name
        FROM appointment a
        JOIN patient p ON a.patient_id = p.patient_id
        JOIN staff s ON a.staff_id = s.staff_id
        JOIN department d ON s.department_id = d.department_id
        ORDER BY a.appointment_date DESC
      `);
      return rows;
    } catch (error) {
      console.error('Error in getDetailedAppointments:', error);
      throw new Error('Error fetching detailed appointments');
    }
  }
}

export default Appointment; 
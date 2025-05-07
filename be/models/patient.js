import db from '../utils/db.js';

class Patient {
  static async getAllpatient() {
    try {
      const [rows] = await db.query('SELECT * FROM patient');
      return rows;
    } catch (error) {
      console.error('Error in getAllpatient:', error);
      throw new Error('Error fetching patient');
    }
  }

  static async getPatientById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM patient WHERE patient_id = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error in getPatientById:', error);
      throw new Error('Error fetching patient');
    }
  }

  static async findOne(conditions) {
    try {
      const keys = Object.keys(conditions);
      const values = Object.values(conditions);
      const whereClause = keys.map(key => `${key} = ?`).join(' AND ');
      const [rows] = await db.query(`SELECT * FROM patient WHERE ${whereClause}`, values);
      return rows[0] || null;
    } catch (error) {
      console.error('Error in findOne:', error);
      throw new Error('Error finding patient');
    }
  }

  static async createPatient(data) {
    try {
      const { first_name,last_name, email, password, phone, address, date_of_birth, gender,emergency_contact } = data;
      

      const [result] = await db.query(
        'INSERT INTO patient (first_name,last_name, email, password, phone, address, date_of_birth, gender,emergency_contact) VALUES (?,?, ?, ?, ?, ?, ?, ?,?)',
        [first_name,last_name, email, password, phone, address, date_of_birth, gender,emergency_contact]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error in createPatient:', error);
      throw new Error('Error creating patient');
    }
  }

  static async updatePatient(id, data) {
    try {
      const { first_name,last_name, email, password, phone, address, date_of_birth, gender,emergency_contact } = data;
      if (!first_name||!last_name || !email || !phone || !date_of_birth || !gender) {
        throw new Error('Missing required fields');
      }

      const [result] = await db.query(
        'UPDATE patient SET first_name = ?,last_name=?, email = ?, password = ?, phone = ?, address = ?, date_of_birth = ?, gender = ?,emergency_contact=? WHERE patient_id = ?',
        [first_name,last_name, email, password, phone, address, date_of_birth, gender,emergency_contact, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error in updatePatient:', error);
      throw new Error('Error updating patient');
    }
  }

  static async deletePatient(id) {
    try {
      const [result] = await db.query('DELETE FROM patient WHERE patient_id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error in deletePatient:', error);
      throw new Error('Error deleting patient');
    }
  }
}

export default Patient; 
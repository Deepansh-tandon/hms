import db from '../utils/db.js'

class Bill {
  static async getAllBills() {
    try {
      const [rows] = await db.query('SELECT * FROM bills');
      return rows;
    } catch (error) {
      console.error('Error in getAllBills:', error);
      throw new Error('Error fetching bills');
    }
  }

  static async getBillById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM bills WHERE bill_id = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error in getBillById:', error);
      throw new Error('Error fetching bill');
    }
  }

  static async getBillsByPatient(patientId) {
    try {
      const [rows] = await db.query('SELECT * FROM bills WHERE patient_id = ?', [patientId]);
      return rows;
    } catch (error) {
      console.error('Error in getBillsByPatient:', error);
      throw new Error('Error fetching patient bills');
    }
  }

  static async createBill(data) {
    try {
      const { patient_id, appointment_id, total_amount, status } = data;
      if (!patient_id || !total_amount || !status) {
        throw new Error('Missing required fields');
      }

      const [result] = await db.query(
        'INSERT INTO bills (patient_id, appointment_id, total_amount, status) VALUES (?, ?, ?, ?)',
        [patient_id, appointment_id, total_amount, status]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error in createBill:', error);
      throw new Error('Error creating bill');
    }
  }

  static async updateBill(id, data) {
    try {
      const { patient_id, appointment_id, total_amount, status } = data;
      if (!patient_id || !total_amount || !status) {
        throw new Error('Missing required fields');
      }

      const [result] = await db.query(
        'UPDATE bills SET patient_id = ?, appointment_id = ?, total_amount = ?, status = ? WHERE bill_id = ?',
        [patient_id, appointment_id, total_amount, status, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error in updateBill:', error);
      throw new Error('Error updating bill');
    }
  }

  static async deleteBill(id) {
    try {
      const [result] = await db.query('DELETE FROM bills WHERE bill_id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error in deleteBill:', error);
      throw new Error('Error deleting bill');
    }
  }
}

export default Bill; 
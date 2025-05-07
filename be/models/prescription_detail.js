import db from '../utils/db.js'

class PrescriptionDetail {
  static async getAllPrescriptionMedicines() {
    try {
      const [rows] = await db.query('SELECT * FROM prescription_details');
      return rows;
    } catch (error) {
      console.error('Error in getAllPrescriptionMedicines:', error);
      throw new Error('Error fetching prescription medicines');
    }
  }

  static async getPrescriptionMedicineById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM prescription_details WHERE detail_id = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error in getPrescriptionMedicineById:', error);
      throw new Error('Error fetching prescription medicine');
    }
  }

  static async getMedicinesByPrescription(prescriptionId) {
    try {
      const [rows] = await db.query('SELECT * FROM prescription_details WHERE prescription_id = ?', [prescriptionId]);
      return rows;
    } catch (error) {
      console.error('Error in getMedicinesByPrescription:', error);
      throw new Error('Error fetching prescription medicines');
    }
  }

  static async createPrescriptionMedicine(data) {
    try {
      const { prescription_id, medicine_id, quantity, dosage } = data;
      if (!prescription_id || !medicine_id || !quantity || !dosage) {
        throw new Error('Missing required fields');
      }

      const [result] = await db.query(
        'INSERT INTO prescription_details (prescription_id, medicine_id, quantity, dosage) VALUES (?, ?, ?, ?)',
        [prescription_id, medicine_id, quantity, dosage]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error in createPrescriptionMedicine:', error);
      throw new Error('Error creating prescription medicine');
    }
  }

  static async updatePrescriptionMedicine(id, data) {
    try {
      const { prescription_id, medicine_id, quantity, dosage } = data;
      if (!prescription_id || !medicine_id || !quantity || !dosage) {
        throw new Error('Missing required fields');
      }

      const [result] = await db.query(
        'UPDATE prescription_details SET prescription_id = ?, medicine_id = ?, quantity = ?, dosage = ? WHERE detail_id = ?',
        [prescription_id, medicine_id, quantity, dosage, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error in updatePrescriptionMedicine:', error);
      throw new Error('Error updating prescription medicine');
    }
  }

  static async deletePrescriptionMedicine(id) {
    try {
      const [result] = await db.query('DELETE FROM prescription_details WHERE detail_id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error in deletePrescriptionMedicine:', error);
      throw new Error('Error deleting prescription medicine');
    }
  }
}

export default PrescriptionDetail; 
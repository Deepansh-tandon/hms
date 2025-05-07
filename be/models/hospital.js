import db from '../utils/db.js';

class Hospital {
    static async getAllHospitals() {
    try {
      const [rows] = await db.query('SELECT * FROM hospital');
      return rows;
    } catch (error) {
      console.error('Error in getAllhospital:', error);
      throw new Error('Error fetching hospital');
    }
  }

  static async getHospitalById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM hospital WHERE hospital_id = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error in getHospitalById:', error);
      throw new Error('Error fetching hospital');
    }
  }

  static async createHospital(data) {
    try {
      const { name, address, phone } = data;
      if (!name || !address || !phone) {
        throw new Error('Missing required fields');
      }

      const [result] = await db.query(
        'INSERT INTO hospital (name, address, phone) VALUES (?, ?, ?)',
        [name, address, phone]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error in createHospital:', error);
      throw new Error('Error creating hospital');
    }
  }

  static async updateHospital(id, data) {
    try {
      const { name, address, phone } = data;
      if (!name || !address || !phone) {
        throw new Error('Missing required fields');
      }

      const [result] = await db.query(
        'UPDATE hospital SET name = ?, address = ?, phone = ? WHERE hospital_id = ?',
        [name, address, phone, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error in updateHospital:', error);
      throw new Error('Error updating hospital');
    }
  }

  static async deleteHospital(id) {
    try {
      const [result] = await db.query('DELETE FROM hospital WHERE hospital_id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error in deleteHospital:', error);
      throw new Error('Error deleting hospital');
    }
  }
}

export default Hospital;
  
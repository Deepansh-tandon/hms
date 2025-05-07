import db from '../utils/db.js'

class Department {
  static async getAllDepartments() {
    try {
      const [rows] = await db.query('SELECT * FROM department');
      return rows;
    } catch (error) {
      console.error('Error in getAlldepartment:', error);
      throw new Error('Error fetching department');
    }
  }

  static async getDepartmentById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM department WHERE department_id = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error in getDepartmentById:', error);
      throw new Error('Error fetching department');
    }
  }

  static async getDepartmentsByHospital(hospitalId) {
    try {
      const [rows] = await db.query('SELECT * FROM department WHERE hospital_id = ?', [hospitalId]);
      return rows;
    } catch (error) {
      console.error('Error in getdepartmentByHospital:', error);
      throw new Error('Error fetching hospital department');
    }
  }

  static async createDepartment(data) {
    try {
      const { hospital_id, name, description } = data;
      if (!hospital_id || !name) {
        throw new Error('Missing required fields');
      }

      const [result] = await db.query(
        'INSERT INTO department (hospital_id, name, description) VALUES (?, ?, ?)',
        [hospital_id, name, description]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error in createDepartment:', error);
      throw new Error('Error creating department');
    }
  }

  static async updateDepartment(id, data) {
    try {
      const { hospital_id, name, description } = data;
      if (!hospital_id || !name) {
        throw new Error('Missing required fields');
      }

      const [result] = await db.query(
        'UPDATE department SET hospital_id = ?, name = ?, description = ? WHERE department_id = ?',
        [hospital_id, name, description, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error in updateDepartment:', error);
      throw new Error('Error updating department');
    }
  }

  static async deleteDepartment(id) {
    try {
      const [result] = await db.query('DELETE FROM department WHERE department_id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error in deleteDepartment:', error);
      throw new Error('Error deleting department');
    }
  }
}

export default Department; 
import db from '../utils/db.js';

class Staff {
  static async getAllStaff() {
    try {
      const [rows] = await db.query('SELECT * FROM staff');
      return rows;
    } catch (error) {
      console.error('Error in getAllStaff:', error);
      throw new Error('Error fetching staff');
    }
  }

  static async getStaffById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM staff WHERE staff_id = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error in getStaffById:', error);
      throw new Error('Error fetching staff member');
    }
  }

  static async getStaffByDepartment(departmentId) {
    try {
      const [rows] = await db.query('SELECT * FROM staff WHERE department_id = ?', [departmentId]);
      return rows;
    } catch (error) {
      console.error('Error in getStaffByDepartment:', error);
      throw new Error('Error fetching department staff');
    }
  }

  static async createStaff(data) {
    try {
      const { first_name,last_name, email, password, role, department_id,phone ,salary,gender} = data;
      

      const [result] = await db.query(
        'INSERT INTO staff (first_name,last_name, email, password, role, department_id,phone,salary,gender) VALUES (?,?, ?, ?, ?, ?,?, ?,?)',
        [first_name,last_name, email, password, role, department_id,phone,salary,gender]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error in createStaff:', error);
      throw new Error('Error creating staff member');
    }
  }

  static async updateStaff(id, data) {
    try {
      const { first_name,last_name, email, password, role, department_id,phone ,salary,gender} = data;
   
      const [result] = await db.query(
        'UPDATE staff SET first_name = ?,last_name=?, email = ?, password = ?, role = ?, department_id = ?,phone=?,salary=?,gender=? WHERE staff_id = ?',
        [first_name,last_name, email, password, role, department_id,phone,salary,gender]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error in updateStaff:', error);
      throw new Error('Error updating staff member');
    }
  }

  static async deleteStaff(id) {
    try {
      const [result] = await db.query('DELETE FROM staff WHERE staff_id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error in deleteStaff:', error);
      throw new Error('Error deleting staff member');
    }
  }
}

export default Staff; 
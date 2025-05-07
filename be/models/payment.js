import db from '../utils/db.js'

class Payment {
  static async getAllPayments() {
    try {
      const [rows] = await db.query('SELECT * FROM payments');
      return rows;
    } catch (error) {
      console.error('Error in getAllPayments:', error);
      throw new Error('Error fetching payments');
    }
  }

  static async getPaymentById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM payments WHERE payment_id = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error in getPaymentById:', error);
      throw new Error('Error fetching payment');
    }
  }

  static async getPaymentsByBill(billId) {
    try {
      const [rows] = await db.query('SELECT * FROM payments WHERE bill_id = ?', [billId]);
      return rows;
    } catch (error) {
      console.error('Error in getPaymentsByBill:', error);
      throw new Error('Error fetching bill payments');
    }
  }

  static async createPayment(data) {
    try {
      const { bill_id, amount, payment_date, payment_method } = data;
      if (!bill_id || !amount || !payment_date || !payment_method) {
        throw new Error('Missing required fields');
      }

      const [result] = await db.query(
        'INSERT INTO payments (bill_id, amount, payment_date, payment_method) VALUES (?, ?, ?, ?)',
        [bill_id, amount, payment_date, payment_method]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error in createPayment:', error);
      throw new Error('Error creating payment');
    }
  }

  static async updatePayment(id, data) {
    try {
      const { bill_id, amount, payment_date, payment_method } = data;
      if (!bill_id || !amount || !payment_date || !payment_method) {
        throw new Error('Missing required fields');
      }

      const [result] = await db.query(
        'UPDATE payments SET bill_id = ?, amount = ?, payment_date = ?, payment_method = ? WHERE payment_id = ?',
        [bill_id, amount, payment_date, payment_method, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error in updatePayment:', error);
      throw new Error('Error updating payment');
    }
  }

  static async deletePayment(id) {
    try {
      const [result] = await db.query('DELETE FROM payments WHERE payment_id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error in deletePayment:', error);
      throw new Error('Error deleting payment');
    }
  }
}

export default Payment; 
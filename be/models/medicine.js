// import db from '../utils/db.js'

// class Medicine {
//   static async getAllMedicines() {
//     try {
//       const [rows] = await db.query('SELECT * FROM medicines');
//       return rows;
//     } catch (error) {
//       console.error('Error in getAllMedicines:', error);
//       throw new Error('Error fetching medicines');
//     }
//   }

//   static async getMedicineById(id) {
//     try {
//       const [rows] = await db.query('SELECT * FROM medicines WHERE medicine_id = ?', [id]);
//       return rows[0] || null;
//     } catch (error) {
//       console.error('Error in getMedicineById:', error);
//       throw new Error('Error fetching medicine');
//     }
//   }

//   static async createMedicine(data) {
//     try {
//       const { name, description, price, stock } = data;
//       if (!name || !price || !stock) {
//         throw new Error('Missing required fields');
//       }

//       const [result] = await db.query(
//         'INSERT INTO medicines (name, description, price, stock) VALUES (?, ?, ?, ?)',
//         [name, description, price, stock]
//       );
//       return result.insertId;
//     } catch (error) {
//       console.error('Error in createMedicine:', error);
//       throw new Error('Error creating medicine');
//     }
//   }

//   static async updateMedicine(id, data) {
//     try {
//       const { name, description, price, stock } = data;
//       if (!name || !price || !stock) {
//         throw new Error('Missing required fields');
//       }

//       const [result] = await db.query(
//         'UPDATE medicines SET name = ?, description = ?, price = ?, stock = ? WHERE medicine_id = ?',
//         [name, description, price, stock, id]
//       );
//       return result.affectedRows > 0;
//     } catch (error) {
//       console.error('Error in updateMedicine:', error);
//       throw new Error('Error updating medicine');
//     }
//   }

//   static async deleteMedicine(id) {
//     try {
//       const [result] = await db.query('DELETE FROM medicines WHERE medicine_id = ?', [id]);
//       return result.affectedRows > 0;
//     } catch (error) {
//       console.error('Error in deleteMedicine:', error);
//       throw new Error('Error deleting medicine');
//     }
//   }
// }

// export default Medicine; 


import db from '../utils/db.js';

class Medicine {
  static async getAllMedicines() {
    // CALL the stored procedure
    const [[rows]] = await db.query('CALL sp_GetAllMedicines()');
    return rows;
  }

  static async getMedicineById(id) {
    const [[rows]] = await db.query('CALL sp_GetMedicineById(?)', [id]);
    return rows[0] || null;
  }

  static async createMedicine({ name, manufacturer, cost_per_unit, stock_quantity }) {
    const [[{ id }]] = await db.query(
      'CALL sp_CreateMedicine(?, ?, ?, ?)',
      [name, manufacturer, cost_per_unit, stock_quantity]
    );
    return id;
  }
  

  static async updateMedicine(id, { name, manufacturer, cost_per_unit, stock_quantity }) {
    const [[{ affected }]] = await db.query(
      'CALL sp_UpdateMedicine(?, ?, ?, ?, ?)',
      [id, name, manufacturer, cost_per_unit, stock_quantity]
    );
    return affected > 0;
  }
  

  static async deleteMedicine(id) {
    const sql = `
      CALL sp_DeleteMedicine(?, @affected);
      SELECT @affected AS affected;
    `;
    const [, [[{ affected }]]] = await db.query(sql, [id]);
    return affected > 0;
  }

  
  static async processLowStockAlerts() {
    // fire the proc — this may return an array of result-sets
    const [resultSets] = await db.query('CALL sp_ProcessLowStock()');
  
    // ensure we end up with a flat array of { alert_message } objects
    const alerts = [];
  
    if (Array.isArray(resultSets)) {
      // if it’s an array, it could be [ [row,row], [row,row], ... ]
      for (const rs of resultSets) {
        if (Array.isArray(rs)) {
          alerts.push(...rs);
        } else if (rs && typeof rs === 'object') {
          alerts.push(rs);
        }
      }
    } else if (resultSets && typeof resultSets === 'object') {
      // or if it’s a single result-set object
      alerts.push(resultSets);
    }
  
    return alerts;
  }
  
}

export default Medicine;

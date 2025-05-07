import db from '../utils/db.js'

function getAllPrescriptions(cb) {
  db.query('SELECT * FROM prescription', cb);
}

function getPrescriptionById(id, cb) {
  if (!id || typeof id !== 'number') {
    return cb(new Error('Invalid prescription ID'));
  }
  db.query('SELECT * FROM prescription where prescription_id =?', [id], cb);
}

function getPrescriptionsByAppointment(appointmentId, cb) {
  if (!appointmentId || typeof appointmentId !== 'number') {
    return cb(new Error('Invalid appointment ID'));
  }
  db.query('SELECT * FROM prescription where appointment_id =?', [appointmentId], cb);
}

function getPrescriptionsByStaff(staffId, cb) {
  if (!staffId || typeof staffId !== 'number') {
    return cb(new Error('Invalid staff ID'));
  }
  db.query('SELECT * FROM prescription where staff_id =?', [staffId], cb);
}

function createPrescription(data, cb) {
  const { appointment_id, staff_id, issue_date, notes } = data;
  if (!appointment_id || !staff_id || !issue_date) {
    return cb(new Error('Missing required fields'));
  }
  db.query(
    'INSERT INTO prescription (appointment_id, staff_id, issue_date, notes) VALUES (?, ?, ?, ?)',
    [appointment_id, staff_id, issue_date, notes],
    cb
  );
}

function updatePrescription(id, data, cb) {
  const { appointment_id, staff_id, issue_date, notes } = data;
  if (!id || typeof id !== 'number') {
    return cb(new Error('Invalid prescription ID'));
  }
  if (!appointment_id || !staff_id || !issue_date) {
    return cb(new Error('Missing required fields'));
  }
  db.query(
    'UPDATE prescription SET appointment_id = ?, staff_id = ?, issue_date = ?, notes = ? WHERE prescription_id = ?',
    [appointment_id, staff_id, issue_date, notes, id],
    cb
  );
}

function deletePrescription(id, cb) {
  if (!id || typeof id !== 'number') {
    return cb(new Error('Invalid prescription ID'));
  }
  db.query('DELETE FROM prescription WHERE prescription_id = ?', [id], cb);
}

export default  {
  getAllPrescriptions,
  getPrescriptionById,
  getPrescriptionsByAppointment,
  getPrescriptionsByStaff,
  createPrescription,
  updatePrescription,
  deletePrescription
}; 
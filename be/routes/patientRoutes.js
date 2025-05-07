import express from 'express';
import { 
  listPatients, 
  getPatient, 
  registerPatient, 
  updatePatient, 
  deletePatient 
} from '../controllers/patientController.js';

const router = express.Router();

// Public route for patient registration
router.post('/', registerPatient);

// Protected routes
// Get all patients (admin only)
router.get('/all/', listPatients);

// Get a single patient (admin, staff, or patient's own data)
router.get('/patient/:id', getPatient);

// Update a patient (admin or patient's own data)
router.put('/:id', updatePatient);

// Delete a patient (admin only)
router.delete('/:id', deletePatient);

export default router; 
import express from 'express';
import prescriptionController from '../controllers/prescriptionController.js';

const router = express.Router();

// Get all prescriptions
router.get('/', prescriptionController.listPrescriptions);

// Get a single prescription
router.get('/:id', prescriptionController.getPrescription);

// Get prescriptions by appointment
router.get('/appointment/:appointmentId', prescriptionController.getAppointmentPrescriptions);

// Get prescriptions by staff
router.get('/staff/:staffId', prescriptionController.getStaffPrescriptions);

// Create a new prescription
router.post('/', prescriptionController.createPrescription);

// Update a prescription
router.put('/:id', prescriptionController.updatePrescription);

// Delete a prescription
router.delete('/:id', prescriptionController.deletePrescription);

export default router; 
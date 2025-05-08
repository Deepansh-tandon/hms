import express from 'express';
import prescriptionController from '../controllers/prescriptionController.js';

const router = express.Router();

// Get all prescriptions
router.get('/prescription/', prescriptionController.listPrescriptions);

// Get a single prescription
router.get('/prescription/:id', prescriptionController.getPrescription);

// Get prescriptions by appointment
router.get('/prescription/appointment/:appointmentId', prescriptionController.getAppointmentPrescriptions);

// Get prescriptions by staff
router.get('/prescription/staff/:staffId', prescriptionController.getStaffPrescriptions);

// Create a new prescription
router.post('/prescription/', prescriptionController.createPrescription);

// Update a prescription
router.put('/prescription/:id', prescriptionController.updatePrescription);

// Delete a prescription
router.delete('/prescription/:id', prescriptionController.deletePrescription);

export default router; 
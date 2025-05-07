import express from 'express';
import appointmentController from '../controllers/appointmentController.js';

const router = express.Router();

// Get all appointments
router.get('/appointment/', appointmentController.listAppointments);

// Get a single appointment
router.get('/appointment/:id', appointmentController.getAppointment);

// Get appointments by patient
router.get('/appointment/patient/:patientId', appointmentController.getAppointmentsByPatient);

// Get appointments by staff
router.get('/appointment/staff/:staffId', appointmentController.getAppointmentsByStaff);

// Create a new appointment
router.post('/appointment/', appointmentController.createAppointment);

// Update an appointment
router.put('/appointment/:id', appointmentController.updateAppointment);

// Delete an appointment
router.delete('/appointment/:id', appointmentController.deleteAppointment);

export default router; 
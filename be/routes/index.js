import express from 'express';
import authRoutes from './authRoutes.js';
import hospitalRoutes from './hospitalRoutes.js';
import departmentRoutes from './departmentRoutes.js';
import staffRoutes from './staffRoutes.js';
import patientRoutes from './patientRoutes.js';
import appointmentRoutes from './appointmentRoutes.js';
import medicineRoutes from './medicineRoutes.js';
import prescriptionRoutes from './prescriptionRoutes.js';
import prescriptionMedicineRoutes from './prescriptionMedicineRoutes.js';
import billRoutes from './billRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import { verifyToken, adminOnly, staffOnly, patientOnly } from '../middleware/auth.js';

const router = express.Router();

// Public routes (no authentication required)
router.use('/auth', authRoutes);
router.use('/patient/register', patientRoutes); // Allow patient registration without auth

// Protected routes
// Admin routes
router.use('/admin', [
  hospitalRoutes,
  departmentRoutes,
  staffRoutes,
  medicineRoutes,
  patientRoutes // Admin can manage all patients
]);

// Staff routes
router.use('/staff', [
  appointmentRoutes,
  prescriptionRoutes,
  prescriptionMedicineRoutes,
  patientRoutes // Staff can view patient details
]);

// Patient routes (authenticated patients only)
router.use('/patient',  [
  appointmentRoutes,
  prescriptionRoutes,
  billRoutes,
  paymentRoutes
]);

export default router; 
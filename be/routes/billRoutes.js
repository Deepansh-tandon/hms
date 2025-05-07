import express from 'express';
import billController from '../controllers/billController.js';

const router = express.Router();

// Get all bills
router.get('/', billController.listBills);

// Get a single bill
router.get('/:id', billController.getBill);

// Get bills by patient
router.get('/patient/:patientId', billController.getBillsByPatient);

// Create a new bill
router.post('/', billController.createBill);

// Update a bill
router.put('/:id', billController.updateBill);

// Delete a bill
router.delete('/:id', billController.deleteBill);

export default router; 
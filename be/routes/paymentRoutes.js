import express from 'express';
import paymentController from '../controllers/paymentController.js';

const router = express.Router();

// Get all payments
router.get('/', paymentController.listPayments);

// Get a single payment
router.get('/:id', paymentController.getPayment);

// Get payments by bill
router.get('/bill/:billId', paymentController.getBillPayments);

// Create a new payment
router.post('/', paymentController.createPayment);

// Update a payment
router.put('/:id', paymentController.updatePayment);

// Delete a payment
router.delete('/:id', paymentController.deletePayment);

export default router; 
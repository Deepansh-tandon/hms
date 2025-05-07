import express from 'express';
import staffController from '../controllers/staffController.js';

const router = express.Router();

// Get all staff
router.get('/staff/', staffController.listStaff);

// Get a single staff member
router.get('/staff/:id', staffController.getStaff);

// Get staff by department
router.get('/staff/department/:departmentId', staffController.getStaffByDepartment);

// Create a new staff member
router.post('/staff/', staffController.createStaff);

// Update a staff member
router.put('/staff/:id', staffController.updateStaff);

// Delete a staff member
router.delete('/staff/:id', staffController.deleteStaff);

export default router; 
import express from 'express';
import departmentController from '../controllers/departmentController.js';

const router = express.Router();

// Get all departments
router.get('/department/', departmentController.listDepartments);

// Get a single department
router.get('/department/:id', departmentController.getDepartment);

// Get departments by hospital
router.get('/department/hospital/:hospitalId', departmentController.getHospitalDepartments);

// Create a new department
router.post('/department/', departmentController.createDepartment);

// Update a department
router.put('/department/:id', departmentController.updateDepartment);

// Delete a department
router.delete('/department/:id', departmentController.deleteDepartment);

export default router; 
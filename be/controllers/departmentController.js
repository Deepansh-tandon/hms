import departmentModel from '../models/department.js'

export const listDepartments = async (req, res) => {
  try {
    const departments = await departmentModel.getAllDepartments();
    res.json({ 
      success: true,
      data: departments 
    });
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching departments' 
    });
  }
};

export const getDepartment = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid department ID' 
      });
    }

    const department = await departmentModel.getDepartmentById(id);
    if (!department) {
      return res.status(404).json({ 
        success: false,
        error: 'Department not found' 
      });
    }

    res.json({ 
      success: true,
      data: department 
    });
  } catch (error) {
    console.error('Error fetching department:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching department' 
    });
  }
};

export const getHospitalDepartments = async (req, res) => {
  try {
    const hospitalId = parseInt(req.params.hospitalId);
    if (isNaN(hospitalId)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid hospital ID' 
      });
    }

    const departments = await departmentModel.getDepartmentsByHospital(hospitalId);
    res.json({ 
      success: true,
      data: departments 
    });
  } catch (error) {
    console.error('Error fetching hospital departments:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching hospital departments' 
    });
  }
};

export const createDepartment = async (req, res) => {
  try {
    const { hospital_id, name, description } = req.body;

    if (!hospital_id || !name) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    const departmentId = await departmentModel.createDepartment(req.body);
    res.status(201).json({ 
      success: true,
      id: departmentId,
      message: 'Department created successfully' 
    });
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error creating department' 
    });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid department ID' 
      });
    }

    const { hospital_id, name } = req.body;
    if (!hospital_id || !name) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    const result = await departmentModel.updateDepartment(id, req.body);
    if (!result) {
      return res.status(404).json({ 
        success: false,
        error: 'Department not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Department updated successfully' 
    });
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error updating department' 
    });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid department ID' 
      });
    }

    const result = await departmentModel.deleteDepartment(id);
    if (!result) {
      return res.status(404).json({ 
        success: false,
        error: 'Department not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Department deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error deleting department' 
    });
  }
};

export default {
  listDepartments,
  getDepartment,
  getHospitalDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment
}; 
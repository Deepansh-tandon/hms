import staffModel from '../models/staff.js'

export const listStaff = async (req, res) => {
  try {
    const staff = await staffModel.getAllStaff();
    res.json({ 
      success: true,
      data: staff 
    });
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching staff' 
    });
  }
};

export const getStaff = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid staff ID' 
      });
    }

    const staff = await staffModel.getStaffById(id);
    if (!staff) {
      return res.status(404).json({ 
        success: false,
        error: 'Staff not found' 
      });
    }

    res.json({ 
      success: true,
      data: staff 
    });
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching staff' 
    });
  }
};

export const getStaffByDepartment = async (req, res) => {
  try {
    const departmentId = parseInt(req.params.departmentId);
    if (isNaN(departmentId)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid department ID' 
      });
    }

    const staff = await staffModel.getStaffByDepartment(departmentId);
    res.json({ 
      success: true,
      data: staff 
    });
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching staff' 
    });
  }
};

export const createStaff = async (req, res) => {
  try {
    const { first_name,last_name, email, phone,role, department_id, hire_date,salary,gender } = req.body;

    if (!first_name ||!last_name|| !email || !department_id || !role || !department_id) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    const staffId = await staffModel.createStaff(req.body);
    res.status(201).json({ 
      success: true,
      id: staffId,
      message: 'Staff created successfully' 
    });
  } catch (error) {
    console.error('Error creating staff:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error creating staff' 
    });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid staff ID' 
      });
    }

    const { first_name,last_name, email, phone,role, department_id, hire_date,salary,gender } = req.body;
    if (!first_name ||!last_name|| !email || !department_id || !role || !department_id) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    const result = await staffModel.updateStaff(id, req.body);
    if (!result) {
      return res.status(404).json({ 
        success: false,
        error: 'Staff not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Staff updated successfully' 
    });
  } catch (error) {
    console.error('Error updating staff:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error updating staff' 
    });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid staff ID' 
      });
    }

    const result = await staffModel.deleteStaff(id);
    if (!result) {
      return res.status(404).json({ 
        success: false,
        error: 'Staff not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Staff deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting staff:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error deleting staff' 
    });
  }
};

export default {
  listStaff,
  getStaff,
  getStaffByDepartment,
  createStaff,
  updateStaff,
  deleteStaff
}; 
import appointmentModel from '../models/appointment.js'

export const listAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.getAllappointments();
    res.json({ 
      success: true,
      data: appointments 
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching appointments' 
    });
  }
};

export const getAppointment = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid appointment ID' 
      });
    }

    const appointment = await appointmentModel.getAppointmentById(id);
    if (!appointment) {
      return res.status(404).json({ 
        success: false,
        error: 'Appointment not found' 
      });
    }

    res.json({ 
      success: true,
      data: appointment 
    });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching appointment' 
    });
  }
};

export const getAppointmentsByPatient = async (req, res) => {
  try {
    const patientId = parseInt(req.params.patientId);
    if (isNaN(patientId)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid patient ID' 
      });
    }

    const appointments = await appointmentModel.getappointmentByPatient(patientId);
    res.json({ 
      success: true,
      data: appointments 
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching appointments' 
    });
  }
};

export const getAppointmentsByStaff = async (req, res) => {
  try {
    const staffId = parseInt(req.params.staffId);
    if (isNaN(staffId)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid staff ID' 
      });
    }

    const appointments = await appointmentModel.getappointmentByStaff(staffId);
    res.json({ 
      success: true,
      data: appointments 
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching appointments' 
    });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const { patient_id, staff_id, appointment_date, reason, status } = req.body;

    if (!patient_id || !staff_id || !appointment_date||!reason || !status) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    const appointmentId = await appointmentModel.createAppointment(req.body);
    res.status(201).json({ 
      success: true,
      id: appointmentId,
      message: 'Appointment created successfully' 
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error creating appointment' 
    });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid appointment ID' 
      });
    }

    const { patient_id, staff_id, appointment_date, reason, status } = req.body;
    if (!patient_id || !staff_id || !appointment_date||!reason||!status) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    const result = await appointmentModel.updateAppointment(id, req.body);
    if (!result) {
      return res.status(404).json({ 
        success: false,
        error: 'Appointment not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Appointment updated successfully' 
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error updating appointment' 
    });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid appointment ID' 
      });
    }

    const result = await appointmentModel.deleteAppointment(id);
    if (!result) {
      return res.status(404).json({ 
        success: false,
        error: 'Appointment not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Appointment deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error deleting appointment' 
    });
  }
};

export default {
  listAppointments,
  getAppointment,
  getAppointmentsByPatient,
  getAppointmentsByStaff,
  createAppointment,
  updateAppointment,
  deleteAppointment
}; 
import billModel from '../models/bill.js'

export const listBills = async (req, res) => {
  try {
    const bills = await billModel.getAllBills();
    res.json({ 
      success: true,
      data: bills 
    });
  } catch (error) {
    console.error('Error fetching bills:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching bills' 
    });
  }
};

export const getBill = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid bill ID' 
      });
    }

    const bill = await billModel.getBillById(id);
    if (!bill) {
      return res.status(404).json({ 
        success: false,
        error: 'Bill not found' 
      });
    }

    res.json({ 
      success: true,
      data: bill 
    });
  } catch (error) {
    console.error('Error fetching bill:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching bill' 
    });
  }
};

export const getBillsByPatient = async (req, res) => {
  try {
    const patientId = parseInt(req.params.patientId);
    if (isNaN(patientId)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid patient ID' 
      });
    }

    const bills = await billModel.getBillsByPatient(patientId);
    res.json({ 
      success: true,
      data: bills 
    });
  } catch (error) {
    console.error('Error fetching bills:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching bills' 
    });
  }
};

export const createBill = async (req, res) => {
  try {
    const { patient_id, amount, payment_status, due_date } = req.body;

    if (!patient_id || !amount || !due_date) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    const billId = await billModel.createBill(req.body);
    res.status(201).json({ 
      success: true,
      id: billId,
      message: 'Bill created successfully' 
    });
  } catch (error) {
    console.error('Error creating bill:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error creating bill' 
    });
  }
};

export const updateBill = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid bill ID' 
      });
    }

    const { patient_id, amount, payment_status, due_date } = req.body;
    if (!patient_id || !amount || !due_date) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    const result = await billModel.updateBill(id, req.body);
    if (!result) {
      return res.status(404).json({ 
        success: false,
        error: 'Bill not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Bill updated successfully' 
    });
  } catch (error) {
    console.error('Error updating bill:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error updating bill' 
    });
  }
};

export const deleteBill = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid bill ID' 
      });
    }

    const result = await billModel.deleteBill(id);
    if (!result) {
      return res.status(404).json({ 
        success: false,
        error: 'Bill not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Bill deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting bill:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error deleting bill' 
    });
  }
};

export default {
  listBills,
  getBill,
  getBillsByPatient,
  createBill,
  updateBill,
  deleteBill
}; 
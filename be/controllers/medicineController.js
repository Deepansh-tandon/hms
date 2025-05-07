import medicineModel from '../models/medicine.js'

export const listMedicines = async (req, res) => {
  try {
    const medicines = await medicineModel.getAllMedicines();
    res.json({ 
      success: true,
      data: medicines 
    });
  } catch (error) {
    console.error('Error fetching medicines:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching medicines' 
    });
  }
};



export const listLowStockAlerts = async (req, res) => {
  try {
    const alerts = await medicineModel.processLowStockAlerts();
    res.json({
      success: true,
      data: alerts.map(r => r.alert_message)
    });
  } catch (error) {
    console.error('Error fetching low stock alerts:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching low stock alerts'
    });
  }
};



export const getMedicine = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid medicine ID' 
      });
    }

    const medicine = await medicineModel.getMedicineById(id);
    if (!medicine) {
      return res.status(404).json({ 
        success: false,
        error: 'Medicine not found' 
      });
    }

    res.json({ 
      success: true,
      data: medicine 
    });
  } catch (error) {
    console.error('Error fetching medicine:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching medicine' 
    });
  }
};

export const createMedicine = async (req, res) => {
  try {
    const { name, manufacturer, cost_per_unit, stock_quantity } = req.body;

    if (!name || !manufacturer || !cost_per_unit || !stock_quantity) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    const medicineId = await medicineModel.createMedicine(req.body);
    res.status(201).json({ 
      success: true,
      id: medicineId,
      message: 'Medicine created successfully' 
    });
  } catch (error) {
    console.error('Error creating medicine:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error creating medicine' 
    });
  }
};

export const updateMedicine = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid medicine ID' 
      });
    }

    const { name, manufacturer, cost_per_unit, stock_quantity } = req.body;
    if (!name || !manufacturer || !cost_per_unit || !stock_quantity) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    const result = await medicineModel.updateMedicine(id, req.body);
    if (!result) {
      return res.status(404).json({ 
        success: false,
        error: 'Medicine not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Medicine updated successfully' 
    });
  } catch (error) {
    console.error('Error updating medicine:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error updating medicine' 
    });
  }
};

export const deleteMedicine = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid medicine ID' 
      });
    }

    const result = await medicineModel.deleteMedicine(id);
    if (!result) {
      return res.status(404).json({ 
        success: false,
        error: 'Medicine not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Medicine deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting medicine:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error deleting medicine' 
    });
  }
};

export default {
  listMedicines,
  getMedicine,
  createMedicine,
  updateMedicine,
  deleteMedicine,
  listLowStockAlerts
}; 
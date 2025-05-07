import paymentModel from '../models/payment.js'

export const listPayments = async (req, res) => {
  try {
    const payments = await paymentModel.getAllPayments();
    res.json({ 
      success: true,
      data: payments 
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching payments' 
    });
  }
};

export const getPayment = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid payment ID' 
      });
    }

    const payment = await paymentModel.getPaymentById(id);
    if (!payment) {
      return res.status(404).json({ 
        success: false,
        error: 'Payment not found' 
      });
    }

    res.json({ 
      success: true,
      data: payment 
    });
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching payment' 
    });
  }
};

export const getBillPayments = async (req, res) => {
  try {
    const billId = parseInt(req.params.billId);
    if (isNaN(billId)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid bill ID' 
      });
    }

    const payments = await paymentModel.getPaymentsByBill(billId);
    res.json({ 
      success: true,
      data: payments 
    });
  } catch (error) {
    console.error('Error fetching bill payments:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching bill payments' 
    });
  }
};

export const createPayment = async (req, res) => {
  try {
    const { bill_id, amount, payment_date, payment_method, status } = req.body;

    if (!bill_id || !amount || !payment_date || !payment_method) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    const paymentId = await paymentModel.createPayment(req.body);
    res.status(201).json({ 
      success: true,
      id: paymentId,
      message: 'Payment created successfully' 
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error creating payment' 
    });
  }
};

export const updatePayment = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid payment ID' 
      });
    }

    const { bill_id, amount, payment_date, payment_method } = req.body;
    if (!bill_id || !amount || !payment_date || !payment_method) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    const result = await paymentModel.updatePayment(id, req.body);
    if (!result) {
      return res.status(404).json({ 
        success: false,
        error: 'Payment not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Payment updated successfully' 
    });
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error updating payment' 
    });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid payment ID' 
      });
    }

    const result = await paymentModel.deletePayment(id);
    if (!result) {
      return res.status(404).json({ 
        success: false,
        error: 'Payment not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Payment deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting payment:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error deleting payment' 
    });
  }
};

export default {
  listPayments,
  getPayment,
  getBillPayments,
  createPayment,
  updatePayment,
  deletePayment
}; 
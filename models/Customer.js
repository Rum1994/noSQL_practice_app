import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    debt: { type: mongoose.Schema.Types.ObjectId, ref: 'Debt', required: true }
  });
  
  export default mongoose.model('Customer', customerSchema);
import mongoose from 'mongoose';

const debtSchema = new mongoose.Schema({
  debt_source: { type: String, required: true },
  interest_rate: { type: Number, required: true },
  minimum_payment: { type: Number, required: true },
  debt_amount: { type: Number },  // optional
  paid_off: { type: Boolean, default: false }
});

export default mongoose.model('Debt', debtSchema);



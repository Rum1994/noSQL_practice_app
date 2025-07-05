import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import Debt from './models/Debt.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/debts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Mongo error', err));

// Routes
app.get('/api/debts', async (req, res) => {
  const debts = await Debt.find();
  res.json(debts);
});

async function insertSampleDebt() {
    const newDebt = new Debt({
      debt_source: 'cc',
      interest_rate: 4.5,
      minimum_payment: 250,
      debt_amount: 10000,
      paid_off: false
    });
  
    try {
      const savedDebt = await newDebt.save();
      console.log('Saved debt:', savedDebt);
    } catch (err) {
      console.error('Error saving debt:', err);
    }
  }

const debts = await Debt.find(); 

console.log(debts); 


app.listen(3000, () => console.log('Server running on http://localhost:3000'));

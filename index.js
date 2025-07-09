import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import Debt from './models/Debt.js';
import Grades from './models/Grades.js';
import Customer from './models/Customer.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/debts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then( async () => {console.log('MongoDB connected');
await createCustomerWithDebt();
await runApp();})
  .catch(err => console.error('Mongo error', err));


// Routes
app.get('/api/debts', async (req, res) => {
  const debts = await Debt.find();
  res.json(debts);
});

app.get('/api/grades', async (req, res) => {
  const grades = await Grades.find();
  res.json(grades);
});

app.get('/api/customers', async (req, res) => {
  const customers = await Customer.find().populate('debt');
  res.json(customers);
});

app.get('/api/debts/total', async (req, res) => {
  const result = await Debt.aggregate([
    { $group: { _id: null, totalDebt: { $sum: '$debt_amount' } } }
  ]);
  res.json({ totalDebt: result[0]?.totalDebt || 0 });

  const totalDebt = result[0]?.totalDebt || 0;

  console.log('Total Debt:', totalDebt);
});
  async function createCustomerWithDebt() {
    const debt = await Debt.findOne({ debt_source: 'Credit Card' });
    if (!debt) {
      console.log('Debt not found');
      return;
    }
  
    const existing = await Customer.findOne({ name: 'John Doe' });
    if (existing) {
      console.log('Customer already exists');
      return;
    }
    const customer = new Customer({
      name: 'John Doe',
      address: '123 Main St',
      debt: debt._id
    });
  
    await customer.save();

  }




async function runApp() {
  try {
 

    const debts = await Debt.find(); 
    const grades = await Grades.find(); 
    const customers = await Customer.find().populate('debt');

  // console.log(customers[0])
  } catch (err) {
    console.error('Error:', err);
  }
}


runApp();

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

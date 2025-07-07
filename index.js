import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import Debt from './models/Debt.js';
import Grades from './models/Grades.js';

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

app.get('/api/grades', async (req, res) => {
  const grades = await Grades.find();
  res.json(grades);
});
async function insertSampleDebt() {
    const newDebt = new Debt({
      debt_source: 'cc',
      interest_rate: 4.5,
      minimum_payment: 250,
      debt_amount: 10000,
      paid_off: false
    });
  const newGrades = new Grades({
    class_name: 'Data management',
    grade_gpa: 3.8,
    date_passed: new Date()
  });
    try {
      const savedDebt = await newDebt.save();
      const saveGrades = await newGrades.save()
      console.log('Saved debt:', savedDebt);
      console.log('Saved grades:', saveGrades);
    } catch (err) {
      console.error('Error saving debt:', err);
    }
  }

const debts = await Debt.find(); 
const grades = await Grades.find(); 

console.log(debts, grades); 
async function runApp() {
  try {
    await insertSampleDebt();

    const debts = await Debt.find(); 
    const grades = await Grades.find(); 

    console.log('Debts:', debts);
    console.log('Grades:', grades);
  } catch (err) {
    console.error('Error:', err);
  }
}

runApp();

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

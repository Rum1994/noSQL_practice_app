import mongoose from 'mongoose';
import Debt from '../models/Debt.js';  // adjust path as needed

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/debts');

  const debts = [
    {
      debt_source: 'Credit Card',
      interest_rate: 18.9,
      minimum_payment: 200,
      debt_amount: 5000,
      paid_off: false
    },
    {
      debt_source: 'Student Loan',
      interest_rate: 5.5,
      minimum_payment: 150,
      debt_amount: 15000,
      paid_off: false
    },
    {
        debt_source: 'Student Loan',
        interest_rate: 2.5,
        minimum_payment: 50,
        debt_amount: 35000,
        paid_off: false
      }
  ];

  await Debt.deleteMany({}); // optional: clear existing debts
  await Debt.insertMany(debts);

  console.log('Seeded debts!');
  await mongoose.disconnect();
}

seed().catch(console.error);

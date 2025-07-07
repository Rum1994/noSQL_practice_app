import mongoose from 'mongoose';

const gradesSchema = new mongoose.Schema({
  class_name: { type: String, required: true },
  grade_gpa: { type: Number, required: true },
  date_passed: { type: Date }
});

export default mongoose.model('Grades', gradesSchema);

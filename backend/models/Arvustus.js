import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  nimi: String,
  kommentaar: String,
  hinne: Number,
  date: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, { timestamps: true });

export default mongoose.model('Arvustus', reviewSchema, 'Arvustused');

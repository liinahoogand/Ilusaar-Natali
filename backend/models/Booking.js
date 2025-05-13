import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  asukoht: String,
  teenusepakkuja: String,
  teenus: String,
  kuupäev: Date,
  kell: String,
  aeg: String,
  lõpp: String,
  nimi: String,
  email: String,
  telefon: String,
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema, 'Broneeringud');


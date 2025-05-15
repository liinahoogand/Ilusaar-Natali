import mongoose from "mongoose";

const KasutajaSchema = new mongoose.Schema({
  kasutajanimi: String,
  parool: String,
});

export default mongoose.model("Kasutajad", KasutajaSchema, "Kasutajad");

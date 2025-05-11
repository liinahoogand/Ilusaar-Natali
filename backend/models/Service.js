import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  slug: String,
  aeg: String,
  hind: String,
  kategooria: String,
  nimi: String,
  selgitus: String,
  Kuressaare: String,
  Salme: String,
  teenusepakkuja: String
});

export default mongoose.model("Service", ServiceSchema, "Teenused");

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB ühendus
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB ühendatud"))
  .catch((err) => console.log(err));

// Test API
app.get("/", (req, res) => {
  res.send("API töötab!");
});

app.listen(PORT, () => console.log(`Server töötab pordil ${PORT}`));

import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import Grid from "gridfs-stream";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

const mongoURI = process.env.MONGO_URI; // Lisa oma MongoDB ühenduse URL .env faili!
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// GridFS voogude seadistamine
let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

app.use(cors());
app.use(express.json());

// MongoDB ühendus
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB ühendatud"))
  .catch((err) => console.log(err));

// Test API
app.get("/", (req, res) => {
  res.send("API töötab!");
});

// Failide salvestamine MongoDB-sse GridFS-iga
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: "uploads"
    };
  }
});
const upload = multer({ storage });

// API: Lae pilt üles
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ file: req.file });
});

// API: Too pilt ID järgi
app.get("/image/:id", async (req, res) => {
  try {
    const file = await gfs.files.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
    if (!file) return res.status(404).json({ error: "File not found" });

    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serveri käivitamine
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server töötab pordil ${PORT}`));

import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './utils/db.js';
import servicesRoute from './routes/services.js';
import bookingRoutes from './routes/booking.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();

// Ühenda MongoDB
connectDB();

const conn = mongoose.connection; 

let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

app.use(cors());
app.use(express.json());

// Multeri ja GridFsStorage seadistused
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: 'uploads',
    };
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});

app.get('/image/:id', async (req, res) => {
  try {
    const file = await gfs.files.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
    if (!file) return res.status(404).json({ error: 'File not found' });

    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API routes
app.use('/api/teenused', servicesRoute);
app.use('/api/broneeringud', bookingRoutes);

// Serve static files from the Vue app (frontend/dist)
import { __dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const backendDir = path.dirname(__filename);

// Serve Vue frontend static assets
app.use(express.static(path.join(backendDir, '../frontend/dist')));

// Serve the index.html for any non-API routes (single-page app)
app.get('*', (req, res) => {
  res.sendFile(path.join(backendDir, '../frontend/dist/index.html'));
});

// Porti seadistamine ja serveri käivitamine
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server töötab pordil ${PORT}`));

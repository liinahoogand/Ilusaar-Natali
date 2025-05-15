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
import loginRoutes from './routes/login.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();

connectDB();

const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

app.use(cors({
  origin: 'https://ilusaar.ee',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

// Failide üleslaadimine
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => ({
    filename: file.originalname,
    bucketName: 'uploads',
  }),
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
app.use('/api/login', loginRoutes);

// Serve frontend
const __filename = fileURLToPath(import.meta.url);
const backendDir = path.dirname(__filename);
app.use(express.static(path.join(backendDir, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(backendDir, '../frontend/dist/index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server töötab pordil ${PORT}`));


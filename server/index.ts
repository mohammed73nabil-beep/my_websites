import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './db';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import messageRoutes from './routes/messageRoutes';
import uploadRoutes from './routes/uploadRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/upload', uploadRoutes);

// API route test
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server: 'Node.js/Express' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

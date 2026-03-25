import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'; // أضف هذا السطر
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

// 1. مسارات الـ API (تبقى كما هي)
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server: 'Node.js/Express' });
});

// --- إضافة الأسطر التالية لربط React ---

// 2. تحديد مسار مجلد الـ dist (الذي يحتوي على ملفات React الجاهزة)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'dist')));

// 3. أي طلب لا يبدأ بـ /api، قم بتوجيهه إلى ملف index.html الخاص بـ React
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  }
});

// ---------------------------------------

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

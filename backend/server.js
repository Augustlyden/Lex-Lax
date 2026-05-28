import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import listRoutes from './routes/listRoutes.js';
import avatarRoutes from './routes/avatarRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import statisticRoutes from './routes/statisticRoutes.js';
import { initializeDatabase } from './dbInit.js';
import pool from './config/database.js';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/avatars', avatarRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/statistics', statisticRoutes);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

app.listen(PORT, async () => {
  console.log(`Server is running on PORT:${PORT}`);
  await initializeDatabase(pool);
});
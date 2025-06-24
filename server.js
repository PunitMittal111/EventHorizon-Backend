import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import organizerRoutes from './routes/organizerRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/organizers', organizerRoutes);

app.listen(process.env.PORT || 5000, () => console.log(`Server running`));

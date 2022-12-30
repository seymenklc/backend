import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import express from 'express';
import cookieParser from 'cookie-parser';
// local imports
import connectDB from '@/config/connectDB';
import { corsConfig } from '@/config/cors';
// middleware
import trim from '@/middleware/trim';
// routes
import authRoutes from '@/routes/auth';
import creatorRoutes from '@/routes/creator';
import tagRoutes from '@/routes/tag';

// init 
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev'));
app.use(trim);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/creators', creatorRoutes);

app.listen(PORT, () => {
   try {
      if (process.env.NODE_ENV === 'development') {
         console.log(`Server running at: http://localhost:${PORT}`);
      }
      connectDB();
   } catch (error: any) {
      console.log(error.message);
   }
});

import dotenv from 'dotenv';

dotenv.config();

export const corsConfig = {
   credentials: true,
   origin: process.env.ORIGIN! as string,
   // optionsSuccessStatus: 200
};

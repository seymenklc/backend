import mongoose from 'mongoose';

export default () => {
   try {
      mongoose.set('strictQuery', false);
      mongoose.connect(process.env.MONGO_URI!);

      if (process.env.NODE_ENV === 'development') {
         mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB.');
         });
      }
   } catch (error: any) {
      console.log('Failed to connect MongoDB.');
      console.log(error.message);
      process.exit(1);
   }
};
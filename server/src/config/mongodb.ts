import mongoose from 'mongoose';
import { db_url, db_password } from './env';

const MONGOOSE_URL = db_url?.replace('<PASSWORD>', db_password!);

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGOOSE_URL!, {
      dbName: 'airbnb_reactjs',
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export { connectToMongoDB };

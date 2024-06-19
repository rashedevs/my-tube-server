import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    console.log(
      `\n MongoDB connected !! DB_HOST : ${connectionInstance.connection.host}`
    );
    // process.on('ERROR', (error) => {
    //   throw error;
    // });
  } catch (error) {
    console.log('⚠️  MONGODB connection FAILED: ', error);
    process.exit(1);
    // throw error;
  }
};

export default connectDB;

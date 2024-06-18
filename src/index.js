import dotenv from 'dotenv';
import connectDB from './db/index.js';

dotenv.config();

connectDB();

/*

import express from 'express';
const app = express();
//IIFE's, which is a better approach than normal function...
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on('error', (error) => {
      console.log('ERROR: ', error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`Mytube server is running from ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('ERROR: ', error);
  }
})();

*/

import dotenv from 'dotenv';
import connectDB from './db/index.js';
import app from './app.js';

dotenv.config({ path: './.env' });

connectDB()
  .then(() => {
    app.on('error', (error) => {
      console.log('⚠️  ERROR: ', error);
      throw error;
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `✅  Mytube server is running from port : ${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log('⚠️  MONGODB connection failed !! ', err);
  });

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

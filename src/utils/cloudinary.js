import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
//configuration..

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//uploader function..

const uploadOnCloudinary = async (localFilePath, name) => {
  console.log('🚀 ~ uploadOnCloudinary ~ name:', name);
  try {
    if (!localFilePath) return null;

    //upoload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      public_id: name,
    });

    //file upload successful, so unlink them
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the local server temp file as the upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };

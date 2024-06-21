import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

//configuration..

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//uploader function..

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    //upoload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });

    //file upload successful
    console.log(
      'File is uploaded on cloudinary || response url::',
      response.url
    );
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the local server temp file as the upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };

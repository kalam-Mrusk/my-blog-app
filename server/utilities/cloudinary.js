import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const uploadOnCloudinary = async (localFilePath) => {
//   try {
//     if (!localFilePath) return null;
//     const res = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "image",
//     });
//     console.log("image is uploaded on cloudinary", res.url);
//     fs.unlinkSync(localFilePath);
//     return res;
//   } catch (error) {
//     fs.unlinkSync(localFilePath);
//     return null;
//   }
// };

const uploadOnCloudinary = async (fileBuffer) => {
  try {
    if (!fileBuffer) return null;

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(fileBuffer); // Send the buffer to Cloudinary
    });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};

const deleteFileFromCloudinary = async (fileSecureUrl) => {
  const publicId = fileSecureUrl.split("/").reverse()[0].split(".")[0];
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Delete Response:", result);
    return result;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};
export { uploadOnCloudinary, deleteFileFromCloudinary };

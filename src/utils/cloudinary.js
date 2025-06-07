import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
    
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const uploadOnCloudinary = async (localFilePath)=>{
    console.log(process.env.CLOUDINARY_API_KEY);
    console.log(process.env.CLOUDINARY_CLOUD_NAME);
    console.log(process.env.CLOUDINARY_API_SECRET);



     try {
        console.log("cloudinary local path", localFilePath);
        if(!localFilePath) {
            console.log("path Not available");
            return null
        }
        const  response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        });
        console.log("File is uploaded on cloudinary || url: ", response.url);
        return response;
     } catch (error) {
        fs.unlinkSync(localFilePath); // remove the locally saved file 
        console.log(" somthing wrong while uploading file ", error);
        return null
     }
    }

    export {uploadOnCloudinary};
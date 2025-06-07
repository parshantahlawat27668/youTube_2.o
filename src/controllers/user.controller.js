import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js"

const tokenGenerator=async(userId)=>{
try {
  const user = await User.findById(userId);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken=refreshToken;
  await user.save({validateBeforeSave:false});
  return {accessToken, refreshToken}
} catch (error) {
  throw new ApiError(500,"somthing went wrong while generating tokens");
}
}

const registerUser = asyncHandler(async (req, res)=>{
 const {fullName, email, userName, password}= req.body;

 if([fullName, email, userName, password].some((field)=>field?.trim() === "")){
   throw new ApiError(400,"All Fields are required !");
 }
 const existedUser= await User.find({
   $or:[{userName},{email}]
 });  
 if(existedUser.length>0){
throw new ApiError(409,"User already exists");
 }

 const avatarLocalPath = req.files?.avatar[0]?.path;
 const coverImageLocalPath = req.files?.coverImage[0]?.path


// const avatar =    await uploadOnCloudinary(avatarLocalPath);
// const coverImage = await uploadOnCloudinary(coverImageLocalPath);
// if(!avatar){
// throw new ApiError(400,"Avatar file is required");
// }

 const user = await User.create({
   fullName,
   avatar:"",
   coverImage:"",
   email,
   password,
   userName:userName.toLowerCase()
});
const createdUser = await User.findById(user._id).select("-password -refreshToken");
if(!createdUser){
throw new ApiError(500,"something went wrong while Registering User");
}
return res.status(201).json(new ApiResponse(200, createdUser,"user Register successfully. "))
});

const loginUser = asyncHandler(async (req,res)=>{
const {email, userName, password} = req.body;
if(!email || !userName){
throw new ApiError(400,"user name or password are required");
}
const user = await User.findOne(
  $or[{email},{userName}]
);
if(!user){
throw new ApiError(400,"User doesn't exist");
}
const isPasswordValid  = await user.isPasswordCorrect(password);
if(!isPasswordValid){
throw new ApiError(401,"Password incorrect");
}

const {accessToken, refreshToken} = await tokenGenerator(user._id);

const loggedInUser = User.findById(user._id).select("-passowrd -refreshToken");

const options={
  httpOnly:true,
  secure:true
}

return res
.status(200)
.cookie("accessToken", accessToken, options)
.cookie("refreshToken", refreshToken,options)
.json(
  new ApiResponse(
    200,
    {
      user:loggedInUser,
      accessToken,
      refreshToken
    },
    "user logged in successfully"
  )
)
})

const logoutUser = asyncHandler(async()=>{
await User.findByIdAndUpdate(req.user._id,
  {
    $set:{
      refreshToken:undefined
    }
  },
  {
    new:true
  }
)
const options={
  httpOnly:true,
  secure:true
}
return res
.status(200)
.clearCookie("accessToken",options)
.clearCookie("refreshToken",options)
.json(
  new ApiResponse(200,{},"User logged out ")
)


});


export {registerUser, loginUser, logoutUser};
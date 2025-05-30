import { response } from "express";
import {asyncHandler} from "../utils/asyncHandler.js"

const registerUser = asyncHandler(async (req, res)=>{
 res.status(200).json({
    message:"response from user/register router controller"
 });
});

export {registerUser};
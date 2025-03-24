import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import {ApiError} from "../utils/ApiErrorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const verifyJWT = asyncHandler(async (req, res, next) =>{
    try {
        // get the token inforamtion from cookies or headers
        const token = req.cookies?.accessToken || req.headers["authorization"]?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(401, "Unauthorized request!!")
        }
    
        // if token is fetched, then verify it against your accessToken in db
        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decodedToken) {
            throw new ApiError(403, "Unauthorized thoken")
        }
    
        // if token is okay, fetch the user by it's id
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(404, "Invalid access token")
        }
        // attach this user information in the request for next operation
        req.user = user;
        
        // pass execution to next operation in line
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")  
    }
});



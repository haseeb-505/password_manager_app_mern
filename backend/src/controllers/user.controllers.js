import {User} from "../models/user.models.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiErrorHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";


const generateAccessRefreshToken = async (userId) => {
    try {
        // find the user by id
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError("No user found against this id")
        }
        // generate access and refreshToken
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
        if (!accessToken || !refreshToken) {
            throw new ApiError("AccessToken or RefreshToken is missing")
        }
        // set the user refreshToken with newly generated value
        user.refreshToken = refreshToken;
        // save this user without validation
        await user.save({validateBeforeSave: false});
        // retrun the new access and refresh Tokens
        return [accessToken, refreshToken];
    } catch (error) {
        console.log("Token generation error: ", error);
        throw new ApiError(500, "Token generation failed, server error")
    }
};

// user controllers
// registerUser, loginUser, logoutUser, refreshAccessToken,
// updatePassword, updateAccountDetails, updateUserAvatar, updateCoverImage
// updateAccountDetails

const registerUser = asyncHandler(async (req, res) =>{
    // get user details from frontend
    // validation whether username or email is empty, 
    // or email is in correct format
    // check  if user already exists (unique email and username)
    //Note! these steps are not included in this project
           // check for images
            // check for avatar
            // upload to cloudinary
            // check for avatar on cloudinary
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response

    const [username, email, fullName, password, confirmPassword] = req.body;
    // check if any of these fields is empyt
    if ([username, email, fullName, password, confirmPassword].some( (field) => field?.trim() = "")) {
        throw new ApiError(400, "Please fill out all the fields")
    }
    // check if user already exists
    const existingUser = User.findOne({
        $or: [{username}, {email}]
    });
    if (existingUser) {
        return res.status(400).json({message: "Either email or username already exists!!!"})
    }
    // password check
    if (password!==confirmPassword) {
        return res.status(400).json({message: "confirm password does not match"})
    }
    // create user object now
    const user = await User.create({
        username: username.trim().toLowerCase(),
        email: email.trim().toLowerCase(),
        fullName: fullName.trim(),
        password: password.trim(),

    });
    // check if user is created
    if (!user) {
        throw new ApiError(500, "User couldn't be created successfully")
    }
    // save this user without password and refreshToken
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    // send a response to frontend
    return res.status(202).json({message: `User ${user.username} is created Successfully!!!`})
});

// loginUser
const loginUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    const [username, email, password] = req.body;
    // check if both username and email are empty
    // one of them shall be present
    if (!username && !email ) {
        return res.status(402).json({message: "please fill any of username or email fields"})
    }
    // password check
    if (!password) {
        return res.status(403).json({message: "password is missing"})
    }
    // find the user on the basis of email or username
    const user = await User.findOne({
        $or: [{username}, {email}]
    });
    // if user not found
    if (!user) {
        return res.status(404).json({message: "User doesn't exist!!!"})
    }
    // check if password match
    const isPasswordCorrect = await user.isPasswordSame(password);
    if (!isPasswordCorrect) {
        return res.status(403).json({message: "Incorrect passowrd!"})
    }
    // generate access and refresh tokens
    const [accessToken, refreshToken] = await generateAccessRefreshToken();
    if (!accessToken || !refreshToken) {
        throw new ApiError(500, "token generation failed")
    }
    // remove user's passowrd and refresh token
    const loggedInUser = await user.select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
    };

    // return the response with cookies to hold access and refresh token
    return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(200,
                    {
                        user: loggedInUser, accessToken, refreshToken
                    },
                    "user is loggedIn successfully"
                )
            )
});




export {
    registerUser,
    loginUser,
    
}
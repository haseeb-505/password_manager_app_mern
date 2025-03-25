import {User} from "../models/user.models.js";
import { PasswordRecord } from "../models/password.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiErrorHandler.js";

// Add new password
const addPassword = asyncHandler(async (req, res) => {
    const {site, username, password} = req.body;
    const userId = req.user._id;

    if ([site, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const newPassword = await PasswordRecord.create({
        site: site.trim(),
        username: username.trim(),
        password: password.trim(),
        owner: userId,
    });

    return res
        .status(201)
        .json(
            new ApiResponse(201, newPassword, "Password added successfully")
        );
});

// Get all passwords with pagination
const getAllPasswords = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const userId = req.user._id;

    // Fetch paginated passwords
    const passwords = await PasswordRecord.aggregate([
        { $match: { owner: userId } },
        {
            $project: {
                site: 1,
                username: 1,
                password: 1,
                createdAt: 1,
            }
        },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit }
    ]);

    // Get total count
    const totalPasswords = await PasswordRecord.countDocuments({ owner: userId });
    console.log("Total passwords are: ", totalPasswords)
    return res.status(200).json(
        new ApiResponse(200, {
            passwords,
            page,
            limit,
            totalPages: Math.ceil(totalPasswords / limit),
            totalPasswords,
        }, "Passwords retrieved successfully")
    );
});


// Update password
const updatePassword = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { site, username, password } = req.body;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid password ID");
    }

    if ([site, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const passwordRecord = await PasswordRecord.findById(id);
    if (!passwordRecord) {
        throw new ApiError(404, "Password record not found");
    }

    if (passwordRecord.owner.toString() !== userId.toString()) {
        throw new ApiError(403, "Unauthorized to update this password");
    }

    const updatedPassword = await PasswordRecord.findByIdAndUpdate(
        id,
        {
            $set: {
                site: site.trim(),
                username: username.trim(),
                password: password.trim()
            }
        },
        { new: true }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedPassword, "Password updated successfully")
        );
});

// Delete password
const deletePassword = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid password ID");
    }

    const passwordRecord = await PasswordRecord.findById(id);
    if (!passwordRecord) {
        throw new ApiError(404, "Password record not found");
    }

    if (passwordRecord.owner.toString() !== userId.toString()) {
        throw new ApiError(403, "Unauthorized to delete this password");
    }

    await PasswordRecord.findByIdAndDelete(id);

    return res
        .status(200)
        .json(
            new ApiResponse(200, null, "Password deleted successfully")
        );
});

export {
    addPassword,
    getAllPasswords,
    updatePassword,
    deletePassword
};
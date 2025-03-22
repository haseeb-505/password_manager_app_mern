import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import mongooseAggregatePaginate from "mongoose";

const passwordSchema = new Schema({
    site: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true});

// aggregation paginate
passwordSchema.plugin(mongooseAggregatePaginate);

export const PasswordRecord = mongoose.model("PasswordRecord", passwordSchema);
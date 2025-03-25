import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

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
        ref: "User",
        required: true
    }
}, { timestamps: true });

// Apply aggregation pagination plugin
passwordSchema.plugin(mongooseAggregatePaginate);

export const PasswordRecord = mongoose.model("PasswordRecord", passwordSchema);
import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    refreshToken: {
        type: String,
    },
    // passwordRecords: {
    //     type: Schema.Types.ObjectId,
    //     ref: "PasswordRecord",
    // }
},{timestamps: true});

// password encryption
userSchema.pre("save", async function(next){
    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// methods
// isPasswordSame
userSchema.methods.isPasswordSame = async function(password){
    if (!password) {
        throw new Error("req.body passowrd is missing")
    }
    if (!this.password) {
        throw new Error("db password is missing")
    }
    // password comparison, remember this sequence 
    return await bcrypt.compare(password, this.password);
}

// generateAccessToken
userSchema.methods.generateAccessToken = async function() {
    return jwt.sign({
        // this is payload we want to attach with user
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
};

// generateRefreshToken
userSchema.methods.generateRefreshToken = async function(){
    return jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    });
};

export const User = mongoose.model("User", userSchema);

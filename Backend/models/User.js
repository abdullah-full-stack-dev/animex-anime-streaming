import mongoose from "mongoose";

const userScehma = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String,
        default: null
    },

    resetPasswordExpires: {
        type: Date,
        default: null
    }
    
}, { timestamps: true })

const User = mongoose.model("User", userScehma);
export default User;
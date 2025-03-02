import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    profile: { type: String, required: true }, 
    skills: { type: [String], default: [] }, 
    bio: { type: String, required: true },
    title: { type: String, required: true }
}, { timestamps: true }); 

export const User = mongoose.models.User || mongoose.model("User", userSchema);
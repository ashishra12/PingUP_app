import mongoose, { connections } from "mongoose";


const userSchema = new mongoose.Schema({
    __id:  {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    full_name : {
        type: String,
        required: true,
    },
    username : {
        type: String,
        required: true,
        unique: true,
    },
    bio: {
        type: String,
        default: "Hey There! I am using PingUp.",
    },
    profile_picture: {
        type: String,
        default: "https://res.cloudinary.com/dzcmadjlq/image/upload/v1696343683/default_profile_picture_oqtqv0.png",
    },
    cover_picture: {
        type: String,
        default: "https://res.cloudinary.com/dzcmadjlq/image/upload/v1696343683/default_cover_photo_1_ozgk7h.png",
    },
    location: {
        type: String,
        default: "",
    },
    followers: [{
        type: Number,
        ref: "User",
    }],
    following: [{
        type: Number,
       ref: "User",
    }],
    connections: [{
        type: String,
        ref: "User"
    }],
} , { timestamps: true,minimize: false });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
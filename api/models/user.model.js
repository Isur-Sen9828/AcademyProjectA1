import mongoose from "mongoose";
const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default:"https://wallpapers.com/images/hd/cool-minimalist-profile-pictures-oib9ltzxmonk5hxz.jpg"
    },
},
{timestamps: true});

const User = mongoose.model('User',userShema);

export default User;
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        minLength: 2,
        maxLength: 40,

    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email is required'],
        unique: true,
        minLength: 5,
        maxLength: 40,
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'User Password Is required'],
        minLength: [6, 'The password should be atleast 6 character long.'],
        maxLength: [30, 'The password should not be more than 30 characters']
    },
    role: {
        type: String,
        enum: ['admin', 'moderator', 'staff'],
        required: true,
    },
    shopId: {
        type: Types.objectid,
        ref: 'Shop',
    },

    isActive: {
        type: Boolean,
        default: true,
    },
    createdBy: {
        type: String,
        required: true,
        trim: true,
    },

}, { timestamps: true });

const User = mongoose.model('User', userSchema)

export default User;
import { Schema, model } from "mongoose";

export const UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'adming'],
        default: 'user'
    },
    profile: {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        biography: {
            type: String
        },
        avatarUrl: {
            type: String
        },
        birthdate: {
            type: Date
        }

    }
}, {
    timestamps: true
});

export const UserModel = model("Users", UserSchema);
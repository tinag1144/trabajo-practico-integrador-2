import mongoose, { Schema, model } from "mongoose";

export const ArticleSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    content: {
        type: String,
        unique: true
    },
    excerpt: {
        type: String
    },
    status: {
        type: String,
        enum: ['published', 'archived'],
        default: 'published'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserSchema',
        require: true
    },
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TagSchema'
        }
    ]
}, {
    timestamps: true
});

export const UserModel = model("Users", UserSchema);
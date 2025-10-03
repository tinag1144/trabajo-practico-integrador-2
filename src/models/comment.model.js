import mongoose, { Schema, model } from "mongoose";

export const CommentSchema = new Schema({
    content: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserSchema',
        require: true
    },
    article:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ArticleSchema'
    }
}, {
    timestamps: true
});

export const CommentModel = model("Comments", CommentSchema);
import mongoose, { Schema, model } from "mongoose";

export const TagSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    description: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
});

export const TagModel = model("Tags", UserSchema);
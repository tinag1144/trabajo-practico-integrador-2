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
        enum: ['user', 'admin'],
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
        birthDate: {
            type: Date
        }

    }
}, {
    timestamps: true,
});

UserSchema.virtual("articles", {
    ref: "Articles",
    localField: "_id",
    foreignField: "author"
});

//esto es para qu los virtuals puedan aparecer como JSON u objetos (no te olvides)
UserSchema.set("toObject", { virtuals: true });
UserSchema.set("toJSON", { virtuals: true });

export const UserModel = model("Users", UserSchema);


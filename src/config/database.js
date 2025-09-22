import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Se conectó a la bd");
    } catch (error) {
        console.log("No se pudo conectar a la bd", error);
    }
};

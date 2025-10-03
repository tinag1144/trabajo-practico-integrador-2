import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)

    //borrar bd
    // await mongoose.connection.dropDatabase();
        console.log("Se conectó a la bd");
    } catch (error) {
        console.log("No se pudo conectar a la bd", error);
    }
};

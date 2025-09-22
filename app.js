import express from "express";
import "dotenv/config";
import cors from "cors"
import cookieParser from "cookie-parser";
import { connectDb } from "./src/config/database.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({
    origin: `http://localhost:${PORT}`,
    credentials: true
}));
app.use(cookieParser());


app.get("/", (req, res) => {
    res.send("Server readyyyy");
})
app.listen(PORT, async () => {
    console.log(`servidor corriendo en: http://localhost:${PORT}`)
    await connectDb();
});
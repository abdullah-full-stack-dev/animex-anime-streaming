import express from 'express'
import dotenv from 'dotenv'
import cors from "cors";
import connectDB from './config/db.js';
import router from './routes/authRoutes.js';
dotenv.config();

const app = express();

app.use(cors({
     origin: "https://animex-discovery-platform.vercel.app",
     credentials: true
}));
app.use(express.json());

connectDB();

app.use("/api/auth", router);

app.get("/", (req, res) => {
    res.send("ANIMEX Backend is running");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

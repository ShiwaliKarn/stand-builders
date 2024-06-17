import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import dotenv from 'dotenv';
import helmet from 'helmet';


dotenv.config();


const app = express();
const port = process.env.PORT || 8081;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet()); // Adds basic security headers


// Database connection
connectDB();

// API endpoints
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
    res.send("API working");
});



// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import itemRouter from './routes/itemRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config.js'; // to load environment variables


// Add config
const app = express()
const port = 4000

// Middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();

// api endpoints
app.use('/api/item', itemRouter);    // to check 
app.use("/images",express.static("uploads"))
app.use('/api/user', userRouter);

app.get("/", (req, res) => {
    res.send("API is running...")
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
import express from 'express'
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import userRoute from "./routes/userRoute.js";
import tweetRoute from "./routes/tweetRoute.js";
import cookieParser from 'cookie-parser';
const app = express();

dotenv.config();
connectDB();

app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());
app.use(cookieParser()); 


app.use('/api/user', userRoute)
app.use('/api/tweet', tweetRoute)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
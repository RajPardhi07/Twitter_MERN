import express from 'express'
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import userRoute from "./routes/userRoute.js";
import tweetRoute from "./routes/tweetRoute.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import imageModel from './model/imageModel.js';
const app = express();



dotenv.config();
connectDB();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}
app.use(cors(corsOptions));
app.use(express.static('public'))


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

// app.post('/upload/:id', upload.single('file'), (req, res) => {
//     console.log(req.file)
//     imageModel.create({ image: req.file.filename })
//         .then(result => res.json(result))
//         .catch(err => console.log(err))
// })

app.post('/upload/:id', upload.single('file'), async (req, res) => {
    try {
        const data = await imageModel.create({ image: req.file.filename })
        res.status(200).json({
            success: true,
            message: "Upload Image Successfully",
            data
        })
    } catch (error) {
        console.log(error)
    }
})

app.get('/getImage', (req, res) => {

    imageModel.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
})


app.use('/api/user', userRoute)
app.use('/api/tweet', tweetRoute)



const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
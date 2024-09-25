import express from 'express'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'

import { connectDb } from './database/connectDb.js';
import authRoute from './routes/auth.route.js'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json()) // allows us to parse incoming requests: req.body
app.use(cookieParser()) // allows us to parse incoming cookies

app.use("/api/auth", authRoute)

app.listen(PORT , () => {
    connectDb();  
    console.log("Server is running on port", PORT)
})


import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import employeeRouter from "./routes/employee.js"
import adminAuthRouter from "./routes/auth.js"


const app = express();
dotenv.config();


app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());


app.use('/employee', employeeRouter)
app.use('/auth', adminAuthRouter)


const PORT = process.env.PORT || 5000;
mongoose.set('strictQuery', true);
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`)))
    .catch((error) => console.log(error.message));

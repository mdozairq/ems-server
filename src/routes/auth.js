import express from "express";
import { adminAuthLogin } from "../controller/auth.js";


const router = express.Router();

router.post('/login', adminAuthLogin);

export default router; 
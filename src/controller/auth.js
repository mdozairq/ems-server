import { AdminAuthValidation } from "../validations/admin-auth.js";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
dotenv.config();

export const adminAuthLogin = async (req, res) => {
    try {
        await AdminAuthValidation.validateAsync(req.body);
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

    const { email, password } = req.body;
    const Admin = [{ _id: process.env.ADMIN_ID, email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD }]
    // console.log(email, password);
    // console.log("EP", Admin[0].email, Admin[0].password)
    try {
        const admin = await Admin.find(u => u.email === email);
        console.log("Found: ", admin);
        if (!admin) return res.status(404).json({ message: "Admin doesn't exist" });


        if (password !== admin.password)
            return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: admin.email, id: admin._id }, "SECRET", { expiresIn: "1h" });

        res.status(200).json({ success: true, result: admin, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}
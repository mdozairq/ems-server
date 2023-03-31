import express from "express";
import { createEmployee, deleteEmployee, getAllEmployee, updateEmployeeStatus } from "../controller/employee.js";


const router = express.Router();

router.post('/create', createEmployee);
router.get('/', getAllEmployee);
router.put('/:id', updateEmployeeStatus);
router.delete('/:id', deleteEmployee);

export default router; 
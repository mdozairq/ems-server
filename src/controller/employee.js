import { isValidObjectId } from "mongoose";
import employeeModel from "../model/employee.js";
import { CreateValidation } from "../validations/create-employee.js";
import { PaginationValidation } from "../validations/page-validation.js";
import { ActivityStatusValidation } from "../validations/status.js";

export const createEmployee = async (req, res) => {
    try {
        await CreateValidation.validateAsync(req.body);
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

    const { name, email, phone, role } = req.body;
    console.log(req.body)
    let existingEmployee = null, newEmployee;
    try {
        existingEmployee = await employeeModel.findOne({ email, phone, role, isDeleted: false }).lean();
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal Server Error" })
    }

    if (existingEmployee) {
        return res.status(400).json({ message: "Employee already exists" })
    }

    try {
        newEmployee = await employeeModel.create(req.body);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }

    return res.status(201).json({ data: newEmployee });
}

export const getAllEmployee = async (req, res) => {
    try {
        await PaginationValidation.validateAsync(req.query);
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
    const { page, page_size } = req.query;
    let employeeList = [], totalEmployee, activeEmployee;

    try {
        employeeList = await employeeModel.find({ isDeleted: false }).limit(page_size).skip(page).exec()
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }

    try {
        totalEmployee = await employeeModel.countDocuments({ isDeleted: false });
        activeEmployee = await employeeModel.countDocuments({ isActive: true, isDeleted: false })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }

    return res.status(200).json({ data: { employee_list: employeeList, total_employee: totalEmployee, active_employe: activeEmployee } });
}

export const updateEmployeeStatus = async (req, res) => {
    let updateEmployee = null;
    try {
        await ActivityStatusValidation.validateAsync(req.body);
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid Id of the employee" })
    }
    try {
        updateEmployee = await employeeModel.updateOne({ _id: id, isDeleted: false }, { isActive: req.body.is_active }).exec();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })
    }

    if (!updateEmployee) {
        return res.status(500).json({ message: `Employee with ${id} not found.` })
    }

    return res.status(202).json({ data: `Employee with ${id} is updated` });
}

export const deleteEmployee = async (req, res) => {
    let deletedEmployee = null;
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid Id of the employee" })
    }
    try {
        deletedEmployee = await employeeModel.deleteOne({ _id: id, isDeleted: false }).exec();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }

    if (!deletedEmployee) {
        return res.status(500).json({ message: `Employee with ${id} not found.` })
    }

    return res.status(202).json({ data: `Employee with ${id} is deleted` });
}


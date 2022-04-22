// Require Express
const express = require("express");

// Set up Router
const router = express.Router();

// Requirement for Departments
router.use(require("./departmentRoutes"));

// Requirement for Employees
router.use(require("./employeeRoutes"));

// Requirement for Employee Roles
router.use(require("./roleRoutes"));

// Export Router
module.exports = router;
